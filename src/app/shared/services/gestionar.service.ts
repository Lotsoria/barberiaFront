import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GestionarService {
  constructor(private http: HttpClient) {}

  url: string = environment.clientesApi;

  getClients() {
    const soapEnvelope = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/"
                          xmlns:cli="http://example.com/clientes-service">
      <soapenv:Header/>
      <soapenv:Body>
        <cli:getClientsRequest/>
      </soapenv:Body>
    </soapenv:Envelope>`;

    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/cliente', soapEnvelope, { headers, responseType: 'text' })
      
    ;
  }

  deleteCliente(id: any) {
    return this.http.delete(`${this.url}delete/${id}`);
  }
}


