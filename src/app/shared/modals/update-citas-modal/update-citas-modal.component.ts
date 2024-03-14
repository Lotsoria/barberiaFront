import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import * as convert from 'xml-js';

import { GestionarService } from '../../services/gestionar.service';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import { ServiciosInterface } from 'src/app/core/interface/servicios-interface';
import { ServiciosService } from '../../services/servicios.service';
import { CitasService } from '../../services/citas.service';
@Component({
  selector: 'app-update-citas-modal',
  templateUrl: './update-citas-modal.component.html',
  styleUrls: ['./css/update-citas-modal.component.css'],
})
export class UpdateCitasModalComponent implements OnInit {
  updateDataCita = new FormGroup({
    idCliente: new FormControl('', Validators.required),
    idServicio: new FormControl('', Validators.required),
    fecha: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
  });

  listCliente: ClienteInterface[] = [];
  listServicio: ServiciosInterface[] = [];
  constructor(
    public citasService: CitasService,
    public serviciosService: ServiciosService,
    public gestionarService: GestionarService,
    public matDialogRef: MatDialogRef<UpdateCitasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}
  ngOnInit(): void {
    this.obtenerClientes();
    this.obtenerServicios();
  }

  onClose(): void {
    this.matDialogRef.close();
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
      this.listServicio = serviciosList.map((servicio: any) => ({
        id: servicio.id._text,
        descripcion: servicio.descripcion._text,
        precio: servicio.precio._text,
        createdAt: servicio.createdAt._text,
      }));
    });
  }

  onSave(): void {
    console.log('updateDataCita --> ', this.updateDataCita.value);
    const formData = this.updateDataCita.value;
    const citasData: any = {
      idCliente: formData.idCliente,
      idServicio: formData.idServicio,
      fecha: formData.fecha,
      hora: formData.hora,

    };
    console.log(  'citasData --> ', citasData)
    const soapRequest = this.updateSoapRequest(citasData);
    console.log('soapRequest --> ', soapRequest);
    if (this.updateDataCita.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'complete todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.citasService.updateCitas(soapRequest).subscribe({
        next: (data) => {

        },
        error: (error) => {

        },
        complete: () => {
          this.updateDataCita.reset();
          Swal.fire({
            position: "top",
            icon: "success",
            title: "Usuario registrado con exito",
            showConfirmButton: false,
            timer: 2500
          });
        },
      });
    }

    this.matDialogRef.close();
  }

  updateSoapRequest(data: any): string {
    // Convierte los datos del formulario a una solicitud SOAP XML
    const soapEnvelope = ` 
   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                  xmlns:cli="http://example.com/citas-service">
                  <soapenv:Header/>
                  <soapenv:Body>
                      <cli:updateCitasRequest>
                          <cli:id>${this.id.id}</cli:id>
                          <cli:fechaReservacion>${data.fecha}</cli:fechaReservacion>
                          <cli:horaReservacion>${data.hora}</cli:horaReservacion>
                          <cli:cliente_id>${data.idCliente}</cli:cliente_id>
                          <cli:servicio_id>${data.idServicio}</cli:servicio_id>
                      </cli:updateCitasRequest>
                  </soapenv:Body>
                  </soapenv:Envelope>`;
    return soapEnvelope;
  }
}
