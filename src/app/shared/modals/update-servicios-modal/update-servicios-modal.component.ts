import { Component, Inject, OnInit  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ServiciosService } from '../../services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-servicios-modal',
  templateUrl: './update-servicios-modal.component.html',
  styleUrls: ['./css/update-servicios-modal.component.css']
})
export class UpdateServiciosModalComponent implements OnInit{


  updateServicio = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    precio: new FormControl('', Validators.required)
  });
  constructor(
    public serviciosService: ServiciosService,
    public matDialogRef: MatDialogRef<UpdateServiciosModalComponent>,
    @Inject(MAT_DIALOG_DATA) public id: any
  ) {}
    
  ngOnInit(): void {  
    console.log('id', this.id);
  }



  // Método para cerrar el modal

    onClose(): void {
      this.matDialogRef.close();
    }
  

    // Método para guardar los datos y cerrar el modal
    onSave(): void {
      const formData = this.updateServicio.value;
      const servicioData: any = {
        descripcion: formData.descripcion,
        precio: formData.precio,

      };
      const soapRequest = this.updateSoapRequest(servicioData);
      if (this.updateServicio.invalid) {
        Swal.fire({
          icon: 'warning',
          title: 'complete todos los campos',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        this.serviciosService.updateServicios(soapRequest).subscribe({
          next: (data) => {

          },
          error: (error) => {

          },
          complete: () => {
            this.updateServicio.reset();
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
                xmlns:ser="http://example.com/servicios-service">
                <soapenv:Header/>
                <soapenv:Body>
                <ser:updateServiciosRequest>
                <ser:id>${this.id.id}</ser:id>
                <ser:precio>${data.precio}</ser:precio>
                <ser:descripcion>${data.descripcion}</ser:descripcion>
                </ser:updateServiciosRequest>
                </soapenv:Body>
        </soapenv:Envelope>`;
      return soapEnvelope;
    }

}
