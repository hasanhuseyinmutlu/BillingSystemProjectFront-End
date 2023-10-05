import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Customer } from '../models/customer';
import { ResponseModel } from '../models/responseModel';
import { CustomerInfo } from '../models/customerInfo';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }

  apiUrl = 'https://localhost:44326/api/';

  getCustomer():Observable<ListResponseModel<Customer>>{
    let newPath = this.apiUrl + 'Customer/getall'
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getUserInfo(userId: number):Observable<ListResponseModel<CustomerInfo>>{
    let newPath = this.apiUrl + 'Customer/getuserbyid/'+userId
    return this.httpClient.get<ListResponseModel<CustomerInfo>>(newPath);
  }
  addCustomer(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Customer/add'
    return this.httpClient.post<ResponseModel>(newPath,customer)
  }
  deleteCustomer(customer:Customer):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}Customer/delete`,{body:customer})
  }

  updateCustomer(customer:Customer):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Customer/update'
    return this.httpClient.put<ResponseModel>(newPath,customer)
  }
}
