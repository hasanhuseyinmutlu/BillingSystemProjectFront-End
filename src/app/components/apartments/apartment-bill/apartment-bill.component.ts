import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApartmentBill } from 'src/app/models/apartmentBill';

import { ApartmentService } from 'src/app/services/apartment.service';


@Component({
  selector: 'app-apartment-bill',
  templateUrl: './apartment-bill.component.html',
  styleUrls: ['./apartment-bill.component.scss']
})
export class ApartmentBillComponent implements OnInit{
  apartmentBill:ApartmentBill[] = [];

  ngOnInit(): void {
   this.getApartmentBill();
  }

  constructor (private apartmentService:ApartmentService, private modalService: NgbModal ) {}

  getApartmentBill(){
    this.apartmentService.getApartmentBill().subscribe(response =>{

      this.apartmentBill = response.data;
      
    })

  }

 
  
}