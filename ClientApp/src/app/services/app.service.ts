import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Inject, Injectable } from '@angular/core';
import { AuthenticateRequest, AuthenticateResponse, CalculationRequest } from '../interfaces/app.interface';

@Injectable()
export class AppService {

  constructor(private http: HttpClient, @Inject('BASE_URL') public baseUrl: string){

  }

  login(userName: string, password: string){
    const authenticateRequest: AuthenticateRequest = {
      userName: userName,
      password: password
    };
    return this.http
    .post<AuthenticateResponse>(
      this.baseUrl + 'api/authenticate',
      // 'http://localhost:5000/api/authenticate',
      authenticateRequest
    );
  }

  calculate(first: number, second: number, op: string, token: string) {
    if (! token) {
      return;
    }
    const calculationRequest: CalculationRequest = {
      firstNumber: first,
      secondNumber: second,
      operation: op
    };
    return this.http.post<number>(
      this.baseUrl + 'api/calculation',
      // 'http://localhost:5000/api/calculation',
      calculationRequest,
      {headers: this.createHeaders(token)}
    );
  }

  private createHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
  }

}
