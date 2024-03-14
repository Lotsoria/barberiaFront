import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  constructor(private http: HttpClient) {}

  getServicios() {
    const soapEnvelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                      xmlns:ser="http://example.com/servicios-service">
                            <soapenv:Header/>
                            <soapenv:Body>
                            <ser:getServiciosRequest>
                            </ser:getServiciosRequest>
                            </soapenv:Body>
                            </soapenv:Envelope>`;

    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/servicios', soapEnvelope, {
      headers,
      responseType: 'text',
    });
  }

  updateServicios(soapRequest: string) {
    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/servicios', soapRequest, {
      headers,
      responseType: 'text',
    });
  }
}
