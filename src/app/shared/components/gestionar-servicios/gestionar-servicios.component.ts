import { Component } from '@angular/core';
import { ServiciosService } from '../../services/servicios.service';
import * as convert from 'xml-js';
import { ServiciosInterface } from 'src/app/core/interface/servicios-interface';
@Component({
  selector: 'app-gestionar-servicios',
  templateUrl: './gestionar-servicios.component.html',
  styleUrls: ['./css/gestionar-servicios.component.css']
})
export class GestionarServiciosComponent {
  listServicios: ServiciosInterface[] = [];
  constructor(
    private serviciosService: ServiciosService
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
        descripcion: servicio.descripcion._text,
        precio: servicio.precio._text,
        createdAt: servicio.createdAt._text,
      }));
    });
  }
}
