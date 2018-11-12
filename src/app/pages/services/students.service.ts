import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

const API_ENDPOINT = 'http://localhost:3000';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  }),

};
@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  constructor(
    private _http: HttpClient
  ) { }

  getAllStudent() {
    return this._http.post(`${API_ENDPOINT}/studentList`, null)
  }

  addStudent(body : any){
    return this._http.post(`${API_ENDPOINT}/addStudent`,body).pipe(map((data: any) => data))
  }

  editStudent(body : any){
    return this._http.post(`${API_ENDPOINT}/editStudent`,body).pipe(map((data: any) => data))
  }
  
  deleteStudent(body : any){
    return this._http.post(`${API_ENDPOINT}/deleteStudent`,body).pipe(map((data: any) => data))
  }
}
