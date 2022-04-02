import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private httpClient: HttpClient) {}

  private getHeader(myParams?: undefined, isNeedAuth0 = true) {
    return {
      headers: HttpHeaderService.getInstance().getRequestHeader(isNeedAuth0),
      params: myParams,
    };
  }

  private requestAPI(api: string) {
    return environment.apiUrl + api + '/';
  }

  private get<T>(
    api: string,
    myParams?: undefined,
    isNeedAuth0 = true
  ): Observable<IDataResponse<T>> {
    return this.httpClient.get<IDataResponse<T>>(
      this.requestAPI(api),
      this.getHeader(myParams, isNeedAuth0)
    );
  }

  private post<T>(
    api: string,
    body: any,
    myParams?: undefined,
    isNeedAuth0 = true
  ): Observable<IDataResponse<T>> {
    return this.httpClient.post<IDataResponse<T>>(
      this.requestAPI(api),
      body,
      this.getHeader(myParams, isNeedAuth0)
    );
  }

  private put<T>(
    api: string,
    body: any,
    myParams?: undefined,
    isNeedAuth0 = true
  ): Observable<IDataResponse<T>> {
    return this.httpClient.put<IDataResponse<T>>(
      this.requestAPI(api),
      body,
      this.getHeader(myParams, isNeedAuth0)
    );
  }

  private delete<T>(
    api: string,
    myParams?: undefined,
    isNeedAuth0 = true
  ): Observable<IDataResponse<T>> {
    return this.httpClient.delete<IDataResponse<T>>(
      this.requestAPI(api),
      this.getHeader(myParams, isNeedAuth0)
    );
  }

  public getAllBrand = <T>(): Observable<IDataResponse<T>> =>
    this.get('branch');

  public deleteBrand = <T>(id: string): Observable<IDataResponse<T>> =>
    this.delete(`branch/${id}`);
}

interface IDataResponse<T> {
  code: number;
  data: T;
  message: string;
}
