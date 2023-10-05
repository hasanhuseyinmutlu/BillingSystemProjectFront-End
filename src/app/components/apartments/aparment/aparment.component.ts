import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Apartment } from 'src/app/models/apartment';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-aparment',
  templateUrl: './aparment.component.html',
  styleUrls: ['./aparment.component.scss']
})
export class AparmentComponent implements OnInit {

  apartments: Apartment[] = [];

  constructor(private apartmentService: ApartmentService,private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.getAllApatment();
  }

  getAllApatment() {
    this.apartmentService.getAllApartment().subscribe(
      response => {
        console.log(response.data);
        this.apartments = response.data;
      }
    );
  }

  editApartment(apartment: Apartment) {
    apartment.editMode = true;
  }

  cancelEdit(apartment: Apartment) {
    apartment.editMode = false;
  }

  updateApartment(apartment: Apartment) {
    this.apartmentService.update(apartment).subscribe(
      response => {
        console.log('Veriler güncellendi', response);
        this.toastrService.success(response.message, "Success")
        apartment.editMode = false;
      },
      error => {
        console.error('Hata oluştu', error);
        this.toastrService.error(error , "Hata")
      }
    );
  }

  deleteApartment(apartment: Apartment) {
    this.apartmentService.delete(apartment).subscribe(
      response => {
        this.toastrService.success(response.message, "Success")
        this.getAllApatment();
      },
      responseError => {
        console.log(responseError);
        this.toastrService.error(responseError, 'Hata')
      }
    );
  }
  
  
}
