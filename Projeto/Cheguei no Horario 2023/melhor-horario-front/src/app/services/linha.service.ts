import { Injectable } from '@angular/core';
import { environment } from 'src/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinhaService {
  private url;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + '/linhas';
  }

  getLinhas(): Observable<any> {
    var result = this.http.get(`${this.url}`);
    return result;
  }
  
  getLinhaPorId(id: string): Observable<any> {
    var result = this.http.get(`${this.url}/${id}`);
    return result;
  }
  
  createLinha(linha: any): Observable<any> {
    return this.http.post(this.url, linha);
  }
  
  deleteLinhaPorId(id: string): Observable<any> {
    var result = this.http.delete(`${this.url}/${id}`);
    return result;
  }

  melhorLinhaHorario(horario: string): Observable<any> {
    var result = this.http.get(`${environment.apiUrl}/horario/${horario}/melhorlinha`);
    return result;
  }

}
