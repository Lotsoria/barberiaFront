import { Component, OnInit } from '@angular/core';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import { GestionarService } from '../../services/gestionar.service';
import * as convert from 'xml-js';
import { ServiciosService } from '../../services/servicios.service';
import { ServiciosInterface } from 'src/app/core/interface/servicios-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./css/agendar.component.css'],
})
export class AgendarComponent implements OnInit {
  createFormCita = new FormGroup({
    idCliente: new FormControl('', Validators.required),
    idServicio: new FormControl('', Validators.required),
    fecha: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
  });
  listCliente: ClienteInterface[] = [];
  listServicios: ServiciosInterface[] = [];
  constructor(
    private gestionarService: GestionarService,
    private serviciosService: ServiciosService,
    private citasService: CitasService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    // this.getServicios();
  }
  showDataTmp() {
    console.log(
      'data que viene en el form de citas ->',
      this.createFormCita.value
    );
  }
  obtenerClientes() {
    this.gestionarService.getClients().subscribe((response) => {
      const result = convert.xml2js(response, { compact: true });
      const clientesResponse = (result as any)['soap:Envelope']['soap:Body'][
        'tns:getClientsResponse'
      ];
      const clientesList = clientesResponse.clientes;
      this.listCliente = clientesList.map((cliente: any) => ({
        id: cliente.id._text,
        nombres: cliente.nombres._text,
        apellidos: cliente.apellidos._text,
        telefono: cliente.telefono._text,
        correo: cliente.correo._text,
        createdAt: cliente.createdAt._text,
      }));
      console.log('clientes', this.listCliente);
    });
  }

  obtenerServicios() {
    this.serviciosService.getServicios().subscribe((response) => {
      const result = convert.xml2js(response, { compact: true });
      const serviciosResponse = (result as any)['soap:Envelope']['soap:Body'][
        'tns:getServiciosResponse'
      ];
      const serviciosList = serviciosResponse.servicios;
      this.listServicios = serviciosList.map((servicio: any) => ({
        id: servicio.id._text,
        descripcion: servicio.descripcion._text,
        precio: servicio.precio._text,
        createdAt: servicio.createdAt._text,
      }));
    });
  }

  createCita() {
    const formData = this.createFormCita.value;
    const clientData: any = {
      idCliente: formData.idCliente,
      idServicio: formData.idServicio,
      fecha: formData.fecha,
      hora: formData.hora,
    };
    console.log('clientData', clientData);
    const soapRequest = this.createSoapRequest(clientData);
    console.log('soapRequest', soapRequest);
    if (this.createFormCita.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'complete todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.citasService.createCitas(soapRequest).subscribe({
        next: (data) => {
          console.log('next', data);
        },
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          console.log('complete');
          this.createFormCita.reset();
          Swal.fire({
            position: 'top',
            icon: 'success',
            title: 'Cita agendada correctamente!',
            showConfirmButton: false,
            timer: 2500,
          });
        },
      });
    }
  }

  createSoapRequest(data: any): string {
    // Convierte los datos del formulario a una solicitud SOAP XML
    const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
            xmlns:cli="http://example.com/citas-service">
              <soapenv:Header/>
              <soapenv:Body>
                <cli:createCitasRequest>
                <cli:fechaReservacion>${data.fecha}</cli:fechaReservacion>
                <cli:horaReservacion>${data.hora}</cli:horaReservacion>
                <cli:cliente_id>${data.idCliente}</cli:cliente_id>
                <cli:servicio_id>${data.idServicio}</cli:servicio_id>
              </cli:createCitasRequest>
              </soapenv:Body>
            </soapenv:Envelope>`;
    return soapEnvelope;
  }
}
