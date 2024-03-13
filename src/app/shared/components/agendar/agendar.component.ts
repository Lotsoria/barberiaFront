import { Component, OnInit } from '@angular/core';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import { GestionarService } from '../../services/gestionar.service';
import * as convert from 'xml-js';
import { ServiciosService } from '../../services/servicios.service';
import { ServiciosInterface } from 'src/app/core/interface/servicios-interface';
@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.component.html',
  styleUrls: ['./css/agendar.component.css'],
})
export class AgendarComponent implements OnInit {
  listCliente: ClienteInterface[] = [];
  listServicios: ServiciosInterface[] = [];
  constructor(
    private gestionarService: GestionarService,
    private serviciosService: ServiciosService
  ) {}

  ngOnInit(): void {
    this.obtenerClientes();
    // this.getServicios();
  }

  obtenerClientes() {
    this.gestionarService.getClients().subscribe((response) => {
      const result = convert.xml2js(response, { compact: true });
      const clientesResponse = (result as any)['soap:Envelope']['soap:Body'][
        'tns:getClientsResponse'
      ];
      const clientesList = clientesResponse.clientes;
      this.listCliente = clientesList.map((cliente: any) => ({
        nombres: cliente.nombres._text,
        apellidos: cliente.apellidos._text,
        telefono: cliente.telefono._text,
        correo: cliente.correo._text,
        createdAt: cliente.createdAt._text,
      }));
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
        descripcion: servicio.descripcion._text,
        precio: servicio.precio._text,
        createdAt: servicio.createdAt._text,
      }));
    });
  }
}
