import { Component, OnInit } from '@angular/core';
import { ApartmentDue } from 'src/app/models/apartmentDue';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-apartment-due',
  templateUrl: './apartment-due.component.html',
  styleUrls: ['./apartment-due.component.scss']
})
export class ApartmentDueComponent implements OnInit {

  apartmentDue:ApartmentDue[] = []
  
  ngOnInit(): void {
    this.getApartmentDue();
  }

  constructor (private apartmentService:ApartmentService ) { }

  getApartmentDue(){
    this.apartmentService.getApartmentDue().subscribe(response =>{

     this.apartmentDue =  response.data
    })
  }
}
