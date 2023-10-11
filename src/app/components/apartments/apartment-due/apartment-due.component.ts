import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { ApartmentDue } from 'src/app/models/apartmentDue';
import { ApartmentDueDetail } from 'src/app/models/apartmentDueDetail';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-apartment-due',
  templateUrl: './apartment-due.component.html',
  styleUrls: ['./apartment-due.component.scss']
})
export class ApartmentDueComponent implements OnInit {

  apartmentDue:ApartmentDue[] = []
  dueDetail:ApartmentDueDetail[] = [];
  
  ngOnInit(): void {
    this.getApartmentDue();

    const token = localStorage.getItem('token')
    if (token){
     const decodedToken: any = jwtDecode(token);
     if (decodedToken && typeof decodedToken === 'object' && '1' in decodedToken) {
       const userId = +decodedToken[1]; 
       this.getApartmentDueDetail(userId);
     }
    }
  }

  constructor (private apartmentService:ApartmentService ) { }

  getApartmentDue(){
    this.apartmentService.getApartmentDue().subscribe(response =>{

     this.apartmentDue =  response.data
    })
  }

  getApartmentDueDetail(userId : number){
    this.apartmentService.getApartmentDueById(userId).subscribe(
      response =>{
        this.dueDetail = response.data
      }, responseError =>{
        console.log (responseError);
      }
    )
  }
}
