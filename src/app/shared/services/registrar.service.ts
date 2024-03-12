import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteInterface } from 'src/app/core/interface/cliente.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'  
})
export class RegistrarService {

  constructor(
    private http: HttpClient
  ) { }
 
  url: string = environment.clientesApi;
  createClient(soapRequest: string) {
    const headers = { 'Content-Type': 'text/xml' };
    return this.http.post('http://localhost:3000/cliente', soapRequest, { headers, responseType: 'text' });
  }

  // crearUsuario(form: ClienteInterface) {
  //   return this.http.post<ClienteInterface>(`${this.url}create`, form);
  // }
}
