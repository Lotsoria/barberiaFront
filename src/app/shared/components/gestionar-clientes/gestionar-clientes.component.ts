import { Component, OnInit } from '@angular/core';
import { GestionarService } from '../../services/gestionar.service';
import * as convert from 'xml-js';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { UpdateClientesModalComponent } from '../../modals/update-clientes-modal/update-clientes-modal.component';
@Component({
  selector: 'app-gestionar-clientes',
  templateUrl: './gestionar-clientes.component.html',
  styleUrls: ['./css/gestionar-clientes.component.css'],
})
export class GestionarClientesComponent implements OnInit {
  constructor(
    private gestionarService: GestionarService,
    private _matDialog: MatDialog
    ) {}

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
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrarlo',
    }).then((result) => {
      if (result.isConfirmed) {
        const soapRequest = this.deleteSoapRequest(id);
        this.gestionarService.deleteCliente(soapRequest).subscribe({
          next: (data) => {},
          error: (error) => {},
          complete: () => {
            this.showData();
            Swal.fire('¡Borrado!', 'Tu dato ha sido borrado.', 'success');
          },
        });
      }
    });

  }



  openModal(id: any): void {
    const dialogRef = this._matDialog.open(UpdateClientesModalComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showData();
      console.log('result', result);

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
