import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Message } from '../models/message';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  apiUrl = 'https://localhost:44326/api/';

  constructor(private httpClient:HttpClient) { }

  getMessage():Observable<ListResponseModel<Message>>{
    let newPath = this.apiUrl + "Message/getall"
    return this.httpClient.get<ListResponseModel<Message>>(newPath);
  }

  addMessage(message:Message):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Message/add"
    return this.httpClient.post<ResponseModel>(newPath,message)
  }

  updateMessage(message:Message):Observable<ResponseModel>{
    let newPath = this.apiUrl + "Message/update"
    return this.httpClient.put<ResponseModel>(newPath,message)
  }

  deleteMessage(message:Message):Observable<ResponseModel>{
    return this.httpClient.delete<ResponseModel>(`${this.apiUrl}Message/delete`,{body: message})
  }
}
