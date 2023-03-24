import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class SemestreService {
  private url;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + '/semestres';
  }

  getSemestres(): Observable<any> {
    var result = this.http.get(`${this.url}`);
    return result;
  }
  
  getSemestrePorId(id: string): Observable<any> {
    var result = this.http.get(`${this.url}/${id}`);
    return result;
  }
  
  createSemestre(semestre: any): Observable<any> {
    return this.http.post(this.url, semestre);
  }
  
  deleteSemestrePorId(id: string): Observable<any> {
    var result = this.http.delete(`${this.url}/${id}`);
    return result;
  }
}
