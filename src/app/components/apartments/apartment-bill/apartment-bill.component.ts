import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import { ApartmentBill } from 'src/app/models/apartmentBill';
import { ApartmentBillDetail } from 'src/app/models/apartmentBillDetail';

import { ApartmentService } from 'src/app/services/apartment.service';


@Component({
  selector: 'app-apartment-bill',
  templateUrl: './apartment-bill.component.html',
  styleUrls: ['./apartment-bill.component.scss']
})
export class ApartmentBillComponent implements OnInit{
  apartmentBill:ApartmentBill[] = [];

  billDetail:ApartmentBillDetail[] = [];

  ngOnInit(): void {
   this.getApartmentBill();
   
   const token = localStorage.getItem('token')
   if (token){
    const decodedToken: any = jwtDecode(token);
    if (decodedToken && typeof decodedToken === 'object' && '1' in decodedToken) {
      const userId = +decodedToken[1]; 
      this.getApartmentBillDetail(userId);
    }
   }
  }

  constructor (private apartmentService:ApartmentService,  ) {}

  getApartmentBill(){
    this.apartmentService.getApartmentBill().subscribe(response =>{

      this.apartmentBill = response.data;
      
    })

  }

  getApartmentBillDetail(userId: number){
    this.apartmentService.getApartmentBillById(userId).subscribe(
      response =>{
        this.billDetail = response.data;
      }, responseError =>{
        console.log(responseError);
      }
    )
  }
 
  
}