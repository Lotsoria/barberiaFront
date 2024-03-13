import { Component, OnInit } from '@angular/core';
import { GestionarService } from '../../services/gestionar.service';
import * as convert from 'xml-js';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./css/gestionar-clientes.component.css'],
})
export class GestionarClientesComponent implements OnInit {
  constructor(private gestionarService: GestionarService) {}

  list: any = [];
  listCliente: ClienteInterface[] = [];

  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.gestionarService.getClients().subscribe((response) => {
      const result = convert.xml2js(response, { compact: true });
      const clientesResponse = (result as any)['soap:Envelope']['soap:Body'][
        'tns:getClientsResponse'
      ];
      console.log('clientesResponse', clientesResponse);
      const clientesList = clientesResponse.clientes;
      this.listCliente = clientesList.map((cliente: any) => ({
        id: cliente.id._text,
        nombres: cliente.nombres._text,
        apellidos: cliente.apellidos._text,
        telefono: cliente.telefono._text,
        correo: cliente.correo._text,
        createdAt: cliente.createdAt._text,
      }));
    });
  }

  deleteUser(id: any) {
    console.log("deleteUser", id);  
    const soapRequest = this.deleteSoapRequest(id);
    console.log("soapRequest", soapRequest);
    this.gestionarService.deleteCliente(soapRequest).subscribe({
      next: (data) => {},
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        this.showData();
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: 'Usuario eliminado con exito',
          showConfirmButton: false,
          timer: 2500,
        });
      },
    });
  }

  updateClient() {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your work has been saved',
      showConfirmButton: false,
      timer: 1500,
    });
  }
  deleteSoapRequest(id: any): string {
    // Convierte los datos del formulario a una solicitud SOAP XML
    const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:cli="http://example.com/clientes-service">
            <soapenv:Header/>
            <soapenv:Body>
            <cli:deleteRequest>
            <cli:id>${id}</cli:id>
            </cli:deleteRequest>
            </soapenv:Body>
    </soapenv:Envelope>`;
    return soapEnvelope;
  }
}
