import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestionar-citas',
  templateUrl: './gestionar-citas.component.html',
  styleUrls: ['./css/gestionar-citas.component.css'],
})
export class GestionarCitasComponent {
  updateCitas() {
    Swal.fire({
      title: 'Actualizar cliente',
      input: 'text',
      inputValue: 'Nuevo valor',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (newValue) => {
        // Aquí puedes enviar el nuevo valor al servidor para realizar la actualización
        return fetch('tu_url_de_actualizacion', {
          method: 'POST',
          body: JSON.stringify({ newValue }),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Error: ${error}`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Actualizado',
          'El cliente ha sido actualizado correctamente',
          'success'
        );
      }
    });
  }
}
