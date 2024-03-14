import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CitasService } from '../../services/citas.service';
import * as convert from 'xml-js';
import { CitasInterface } from 'src/app/core/interface/citas.interface';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCitasModalComponent } from '../../modals/update-citas-modal/update-citas-modal.component';

@Component({
  selector: 'app-gestionar-citas',
  templateUrl: './gestionar-citas.component.html',
  styleUrls: ['./css/gestionar-citas.component.css'],
})
export class GestionarCitasComponent implements OnInit {
  listCitas: CitasInterface[] = [];
  constructor(
    public citasService: CitasService,
    private _matDialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.showData();
  }

  showData() {
    this.citasService.getCitas().subscribe((response) => {
      const result = convert.xml2js(response, { compact: true });
      console.log('result', result);

      const citasResponse = (result as any)['soap:Envelope']['soap:Body'][
        'tns:getCitasResponse'
      ];
      const citasList = citasResponse.citas;
      this.listCitas = citasList.map((citas: any) => ({
        id: citas.id._text,
        fechaReservacion: citas.fechaReservacion[0]._text,
        horaReservacion: citas.horaReservacion._text,
        estado: citas.estado._text,
        cliente_id: citas.cliente_id._text,
        cliente: citas.cliente._text,
        servicio_id: citas.servicio_id._text,
        descripcion: citas.descripcion._text,
        precio: citas.precio._text,
      }));
      console.log('citas', this.listCitas);
    });
  }

  openModal(id: any): void {
    const dialogRef = this._matDialog.open(UpdateCitasModalComponent, {
      width: '500px',
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.showData();
      console.log('result', result);
    });
  }
}
