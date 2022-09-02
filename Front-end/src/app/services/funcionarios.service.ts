import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/Funcionario';

@Injectable()
export class FuncionarioService {
  elementApiUrl =
    'https://us-central1-crudexpressangularfirebase.cloudfunctions.net/app/api/funcionario';
  constructor(private http: HttpClient) {}

  getFuncionarios(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(this.elementApiUrl + 's');
  }

  createFuncionario(element: Funcionario): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.elementApiUrl, element);
  }
  editFuncionario(element: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(
      `${this.elementApiUrl}/${element.id}`,
      element
    );
  }

  deleteFuncionario(id: any): Observable<any> {
    return this.http.delete<any>(`${this.elementApiUrl}/${id}`);
  }
}
