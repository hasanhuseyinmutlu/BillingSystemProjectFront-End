import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Bill } from '../models/bill';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient:HttpClient) { }

  getBills():Observable<ListResponseModel<Bill>>{
    let newPath = this.apiUrl + "Bill/getall"
    return this.httpClient.get<ListResponseModel<Bill>>(newPath);
  }

  addBills(bill:Bill):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Bill/add"
    return this.httpClient.post<ResponseModel>(newPath,bill);
  }

  updateBills(bill:Bill):Observable<ResponseModel>{
    let newPath = this.apiUrl +'Bill/update'
    return this.httpClient.put<ResponseModel>(newPath, bill)
  }

  deleteBills(bill:Bill):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}Bill/delete`,{body: bill})
  }
}
