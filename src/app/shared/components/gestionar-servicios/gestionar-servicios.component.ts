import { Component } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import * as convert from 'xml-js';
import { ServiciosInterface } from 'src/app/core/interface/servicios-interface';
import { UpdateServiciosModalComponent } from '../../modals/update-servicios-modal/update-servicios-modal.component';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  styleUrls: ['./css/gestionar-servicios.component.css'],
})
export class GestionarServiciosComponent {
  listServicios: ServiciosInterface[] = [];
  constructor(
    private serviciosService: ServiciosService,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getServicios();
  }
  getServicios() {
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
      console.log('this.listServicios', this.listServicios);
    });
  }

  deleteService(id: any) {
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
        console.log('soapRequest', soapRequest);
        this.serviciosService.deleteServicios(soapRequest).subscribe({
          next: (data) => {},
          error: (error) => {},
          complete: () => {
            this.getServicios();
            Swal.fire('¡Borrado!', 'Tu dato ha sido borrado.', 'success');
          },
        });
      }
    });
  }
  deleteSoapRequest(id: any): string {
    const soapEnvelope = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:ser="http://example.com/servicios-service">
            <soapenv:Header/>
            <soapenv:Body>
            <ser:deleteServiciosRequest>
                <ser:id>${id}</ser:id>
            </ser:deleteServiciosRequest>
            </soapenv:Body>
    </soapenv:Envelope>`;
    return soapEnvelope;
  }

  openModal(id: any): void {
    const dialogRef = this._matDialog.open(UpdateServiciosModalComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('result', result);
      this.getServicios();
    });
  }
}
