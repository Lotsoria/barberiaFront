import { Component, Inject, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { GestionarService } from '../../services/gestionar.service';

@Component({
  selector: 'app-update-clientes-modal',
  templateUrl: './update-clientes-modal.component.html',
  styleUrls: ['./css/update-clientes-modal.component.css']
})
export class UpdateClientesModalComponent implements OnInit {
  updateClient = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });
  constructor(
    public gestionarService: GestionarService,
    public matDialogRef: MatDialogRef<UpdateClientesModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}
  ngOnInit(): void {}
      

    onClose(): void {
      this.matDialogRef.close();
    }
  

    onSave(): void {
      const formData = this.updateClient.value;
      const servicioData: any = {
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        correo: formData.correo,
        telefono: formData.telefono,

      };
      const soapRequest = this.updateSoapRequest(servicioData);
      if (this.updateClient.invalid) {
        Swal.fire({
          icon: 'warning',
          title: 'complete todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.gestionarService.updateCliente(soapRequest).subscribe({
          next: (data) => {

          },
          error: (error) => {

          },
          complete: () => {
            this.updateClient.reset();
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
              xmlns:cli="http://example.com/clientes-service">
              <soapenv:Header/>
              <soapenv:Body>
              <cli:updateClientRequest>
                <cli:id>${this.id.id}</cli:id>
                <cli:nombres>${data.nombres}</cli:nombres>
                <cli:apellidos>${data.apellidos}</cli:apellidos>
                <cli:correo>${data.correo}</cli:correo>
                <cli:telefono>${data.telefono}</cli:telefono>
              </cli:updateClientRequest>
              </soapenv:Body>
          </soapenv:Envelope>`;
      return soapEnvelope;
    }

  
}
