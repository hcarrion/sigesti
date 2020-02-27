import { Injectable } from '@angular/core';
import { HttpRequest, HttpHeaders, HttpClient, HttpEvent } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { StatusReportFire } from '../models/status-report-fire';
import { MethodUtil } from '../util/method-util';
import { EmailSend } from '../models/email-send';

@Injectable({
  providedIn: 'root'
})
export class EmailFireService {

  protocoloMain: string = 'http://';
  hostMain: string = 'localhost';
  portMain: string = ':8061';
  contextMain: string = '/sendEmailGestor';
  urlMain: string = this.protocoloMain+this.hostMain+this.portMain+this.contextMain;
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  sendEmailStatusReport3(statusReportFire: StatusReportFire) {
    let email = new EmailSend;
    email.to = 'mixel.cs@gmail.com';
    email.from = 'frommixel.cs@gmail.com';
    let serviceMain = '/sendMail';
    let url = this.urlMain+serviceMain;
    let id = statusReportFire.idIniciativa+'';
    const req = new HttpRequest(MethodUtil.METHOD_HTTP.POST, url, JSON.stringify(email), {
      reportProgress: true,
      responseType: 'json',
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    return this.http.request(req);
    //return this.http.post<any>(url, {id:'micjsje123456789'}, this.httpOptions)
  }

  sendEmailStatusReport4(statusReportFire: StatusReportFire){
    let serviceMain = '/sendMail';
    let url = this.urlMain+serviceMain;

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const formData = new FormData();
    formData.set('to', 'mixel.cs@gmail.com');
    formData.set('from', 'frommixel.cs@gmail.com');

    return this.http.post<any>(url, formData);
  }

  sendEmailStatusReport2(statusReportFire: StatusReportFire) {
    debugger;
    let serviceMain = '/sendMailGet';
    let url = this.urlMain+serviceMain;
    let id = statusReportFire.idIniciativa+'';
    return this.http.get('http://localhost:8061/sendEmailGestor/sendMailGet')
  }

  sendEmailStatusReport(statusReportFire: StatusReportFire) : Observable<HttpEvent<{}>>{
    let serviceMain = '/sendMail';
    let url = this.urlMain+serviceMain;
    let email = new EmailSend;
    email.to = 'mixel.cs@gmail.com';
    email.from = 'frommixel.cs@gmail.com';
    debugger;

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      Authorization: 'Basic ' + btoa('demo' + ':' + 'secret_demo')  
    });
    this.http.post<any>('https://jsonplaceholder.typicode.com/posts', JSON.stringify(''), {headers:httpHeaders}).subscribe(data => {
      debugger;
    });

    return this.http.post<any>('https://jsonplaceholder.typicode.com/posts', JSON.stringify(''));
  }

  errorHandl(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
 }
}
