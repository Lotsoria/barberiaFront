import { Component, OnInit } from '@angular/core';
import { GestionarService } from '../../services/gestionar.service';
import * as convert from 'xml-js';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./css/gestionar.component.css']
})
export class GestionarComponent implements OnInit {


  constructor(
    private gestionarService: GestionarService
  ) { } 

    list: any = [];
    listCliente: ClienteInterface[] = [];

  
  ngOnInit(): void {

    this.showData();
    console.log('gestionar fin');
  }

  showData(){
    this.gestionarService.getClients().subscribe((response) => {

      const result = convert.xml2js(response, { compact: true });

      const clientesResponse = (result as any)['soap:Envelope']['soap:Body']['tns:getClientsResponse'];
      console.log('clientesResponse', clientesResponse);
      const clientesList = clientesResponse.clientes;
      console.log('clientesList', clientesList);
      this.listCliente = clientesList.map((cliente: any) => ({
        nombres: cliente.nombres._text,
        apellidos: cliente.apellidos._text,
        telefono: cliente.telefono._text,
        correo: cliente.correo._text,
        createdAt: cliente.createdAt._text,
      }));
      console.log('listCliente', this.listCliente);

    });
  }

  deleteUser(id: any){
    this.gestionarService.deleteCliente(id).subscribe({
      next: (data) => {

      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('complete');
        this.showData();
      }
    });
  }

  updateClient(){
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500
    });
  }
}
