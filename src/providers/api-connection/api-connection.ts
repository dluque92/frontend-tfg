import { HttpClient, HttpResponse, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
// HttpParams
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiConnectionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConnectionProvider {

  public static readonly API_ENDPOINT = 'http://raspberrylookup.ddns.net:12345/llamada';

  constructor(private http: HttpClient) {
    console.log('Hello ApiConnectionProvider Provider');
  }

  public send(country, values) : Promise <[HttpResponse<any>, RESPONSE_ERROR]>{

    let options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/plain, */*',
      })
    }

    return new Promise((resolve) => {
      this.http.post(ApiConnectionProvider.API_ENDPOINT + '?country=' + country + '&values=' + values, options)
        .subscribe(
          (res: HttpResponse<any>) =>
            resolve([res, null]),
          (error: HttpErrorResponse) =>
            resolve([null, this.mapError(error)])
        )
    });
  }

  private mapError(error: HttpErrorResponse): RESPONSE_ERROR {
    let mappedError: RESPONSE_ERROR = null;
    switch (error.status){
      case 401:
        mappedError = RESPONSE_ERROR.UNAUTHORIZED
        break;
      case 422:
        mappedError = RESPONSE_ERROR.PARAMETER_NOT_VALID
        break;
    }

    return mappedError;
  }

}

export enum RESPONSE_ERROR {
  REQUIRED_PARAMETER_NOT_FILLED,
  UNAUTHORIZED,
  PARAMETER_NOT_VALID
}
