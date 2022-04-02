import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpHeaderService {
  private static _instance: HttpHeaderService = new HttpHeaderService();

  constructor() {
    if (HttpHeaderService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use HttpHeaderService.getInstance() instead of new.'
      );
    }
    HttpHeaderService._instance = this;
  }

  public static getInstance(): HttpHeaderService {
    return HttpHeaderService._instance;
  }

  getRequestHeader(isNeedAuth0: boolean = true): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json; charset=utf-8');
    headers = headers.append('Access-Control-Allow-Origin', '*');

    if (isNeedAuth0) {
      headers = headers.append('Authorization', 'JWT ');
    }

    return headers;
  }
}


