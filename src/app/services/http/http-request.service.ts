import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBrandCreate } from 'src/app/car-brand/models/Brand';
import { environment } from 'src/environments/environment';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root',
})
export class HttpRequestService {
  constructor(private httpClient: HttpClient) {}

  private getHeader(myParams?: any, isNeedAuth0 = true) {
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
    myParams?: any,
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
    myParams?: any,
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
    myParams?: any,
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
    myParams?: any,
    isNeedAuth0 = true
  ): Observable<IDataResponse<T>> {
    return this.httpClient.delete<IDataResponse<T>>(
      this.requestAPI(api),
      this.getHeader(myParams, isNeedAuth0)
    );
  }

  public getAllBrand = <T>(params: any): Observable<IDataResponse<T>> =>
    this.get('branch', params);

  public deleteBrand = <T>(id: string): Observable<IDataResponse<T>> =>
    this.delete(`branch/${id}`);

  public createBrand = <T>(body: IBrandCreate): Observable<IDataResponse<T>> =>
    this.post('branch', body);

  public getBrandById = <T>(id: string): Observable<IDataResponse<T>> =>
    this.get(`branch/${id}`);

  public updateBrand = <T>(
    id: string,
    body: IBrandCreate
  ): Observable<IDataResponse<T>> => this.put(`branch/${id}`, body);

  public uploadImage = <T>(
    id: string,
    body: FormData
  ): Observable<IDataResponse<T>> =>
    this.httpClient.post<IDataResponse<T>>(
      this.requestAPI(`branch/${id}/logo`),
      body
    );
}

interface IDataResponse<T> {
  code: number;
  data: T;
  message: string;
}
