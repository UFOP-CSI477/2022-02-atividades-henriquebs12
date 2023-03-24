import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/enviroment';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private url;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + '/alunos';
  }

  getAlunos(): Observable<any> {
    var result = this.http.get(`${this.url}`);
    return result;
  }
  
  getAlunoPorId(id: string): Observable<any> {
    var result = this.http.get(`${this.url}/${id}`);
    return result;
  }

  createAluno(aluno: any): Observable<any> {
    return this.http.post(this.url, aluno);
  }
  
  deleteAlunoPorId(id: string): Observable<any> {
    var result = this.http.delete(`${this.url}/${id}`);
    return result;
  }
}
