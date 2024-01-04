import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { UserCart } from '../models/userCart';
import {UserCartDetail} from '../models/userCartDetail';
import { ResponseModel } from '../models/responseModel';
import { Payment } from '../models/payment';



@Injectable({
  providedIn: 'root'
})
export class UserCartService {

  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }

  getUserCart():Observable<ListResponseModel<UserCart>>{
    let newPath = this.apiUrl + 'UserPayment/getusercard'
    return this.httpClient.get<ListResponseModel<UserCart>>(newPath);
  }

  getCustomerCart(id: number):Observable<ListResponseModel<UserCartDetail>>{
    let newPath = this.apiUrl + 'UserPayment/getcustomercard/'+id
    return this.httpClient.get<ListResponseModel<UserCartDetail>>(newPath);
  }

  addUserCart(cart:UserCart):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'UserPayment/addcart'

    return this.httpClient.post<ResponseModel>(newPath,cart)
  }


  addPayment(payment:Payment):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'UserPayment/payment'

    return this.httpClient.post<ResponseModel>(newPath,payment)
  }
}
