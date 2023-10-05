import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Due } from '../models/due';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class DuesService {

  apiUrl = 'https://localhost:44326/api/';



  constructor(private httpClient:HttpClient) { }

  getDues():Observable<ListResponseModel<Due>>{
    let newPath = this.apiUrl + "Dues/getall"
    return this.httpClient.get<ListResponseModel<Due>>(newPath);
  }
  addDue(due:Due):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Dues/add'
    return this.httpClient.post<ResponseModel>(newPath, due)
  }
  update(due:Due):Observable<ResponseModel>{
    let newPath = this.apiUrl + 'Dues/update'
    return this.httpClient.put<ResponseModel>(newPath, due)
  }
  deleteDues(due:Due):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}Dues/delete`,{body: due})
  }
}
