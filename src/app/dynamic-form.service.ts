import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class DynamicFormService {

  dynamicUrl = 'http://localhost:3000/dynamic';
  fieldUrl = 'http://localhost:3000/regConfig';

  constructor(private http: HttpClient) { }

  getDynamic(): Observable<any> {
    return this.http.get<any>(this.dynamicUrl);
  }

  getField(): Observable<any> {
    return this.http.get<any>(this.fieldUrl);
  }

  addDynamic(dynamic: any): Observable<any> {
    return this.http.post(this.dynamicUrl, dynamic, httpOptions);
  }
}
