import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Apartment } from '../models/apartment';
import { ApartmentDue } from '../models/apartmentDue';
import { ApartmentBill } from '../models/apartmentBill';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ApartmentService {

  apiUrl = 'https://localhost:44326/api/';
  constructor(private httpClient:HttpClient) { }

  
  getAllApartment():Observable<ListResponseModel<Apartment>>{
    let newPath = this.apiUrl + 'Apartment/getall'
    return this.httpClient.get<ListResponseModel<Apartment>>(newPath);
  }

  getApartmentDue():Observable<ListResponseModel<ApartmentDue>>{
    let newPath = this.apiUrl + 'Apartment/getApartmentDue'; 
    return this.httpClient.get<ListResponseModel<ApartmentDue>>(newPath);
  }

  getApartmentBill():Observable<ListResponseModel<ApartmentBill>>{
    let newPath = this.apiUrl + 'Apartment/getAparmentBill';
    
    return this.httpClient.get<ListResponseModel<ApartmentBill>>(newPath);
  }

  add(apartment:Apartment):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+'Apartment/add',apartment);
  }

  update(apartment:Apartment):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Apartment/update';
    return this.httpClient.put<ResponseModel>(newPath,apartment);
  }

  delete(apartment:Apartment):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}Apartment/delete`,{body: apartment})
  }
  
}