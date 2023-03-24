import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private url;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + '/horarios-partida';
  }

  getHorarios(): Observable<any> {
    var result = this.http.get(`${this.url}`);
    return result;
  }
  
  getHorarioPorId(id: string): Observable<any> {
    var result = this.http.get(`${this.url}/${id}`);
    return result;
  }

  createHorario(horario: any): Observable<any> {
    return this.http.post(this.url, horario);
  }
  
  deleteHorarioPorId(id: string): Observable<any> {
    var result = this.http.delete(`${this.url}/${id}`);
    return result;
  }
  
  getHorariosPorLinha(idLinha: string): Observable<any> {
    var result = this.http.get(`${environment.apiUrl}/linhas/${idLinha}/horarios-partida`);
    return result;
  }
  
}