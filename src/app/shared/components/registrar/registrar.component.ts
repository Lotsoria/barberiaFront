import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegistrarService } from '../../services/registrar.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./css/registrar.component.css'],
})
export class RegistrarComponent implements OnInit {
  mensajeGuardado: string = '';
  mostrarMensaje: boolean = false;
  createNewUser = new FormGroup({
    nombres: new FormControl('', Validators.required),
    apellidos: new FormControl('', Validators.required),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required]),
  });

  constructor(private registrarService: RegistrarService) {}

  ngOnInit(): void {}

  createClient() {
    const formData = this.createNewUser.value;
    const clientData: any = {
      nombres: formData.nombres,
      apellidos: formData.apellidos,
      correo: formData.correo,
      telefono: formData.telefono,
    };
    console.log('clientData', clientData);
    const soapRequest = this.createSoapRequest(clientData);

    if (this.createNewUser.invalid) {
      Swal.fire({
        icon: 'warning',
        title: 'complete todos los campos',
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      this.registrarService.createClient(soapRequest).subscribe({
        next: (data) => {
          console.log('next', data);
        },
        error: (error) => {
          console.log('error', error);
        },
        complete: () => {
          console.log('complete');
          this.createNewUser.reset();
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
  }

  createSoapRequest(data: any): string {
    // Convierte los datos del formulario a una solicitud SOAP XML
    const soapEnvelope = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                        xmlns:cli="http://example.com/clientes-service">
        <soapenv:Header/>
        <soapenv:Body>
          <cli:createClientRequest>
            <cli:nombres>${data.nombres}</cli:nombres>
            <cli:apellidos>${data.apellidos}</cli:apellidos>
            <cli:telefono>${data.telefono}</cli:telefono>
            <cli:correo>${data.correo}</cli:correo>
          </cli:createClientRequest>
        </soapenv:Body>
      </soapenv:Envelope>`;
    return soapEnvelope;
  }
}
