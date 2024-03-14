import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(
    private http: HttpClient
  ) { }

  getCitas() {
    const soapEnvelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                                    xmlns:ser="http://example.com/citas-service">
                                      <soapenv:Header/>
                                      <soapenv:Body>
                                        <ser:getCitasRequest>
                                        </ser:getCitasRequest>
                                      </soapenv:Body>
                                      </soapenv:Envelope>`;

    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/citas', soapEnvelope, { headers, responseType: 'text' }) 
    ;
  }

  createCitas(soapRequest: string) {
    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/citas', soapRequest, { headers, responseType: 'text' });
  }

  updateCitas(soapRequest: string) {
    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/citas', soapRequest, { headers, responseType: 'text' });
  }

}
