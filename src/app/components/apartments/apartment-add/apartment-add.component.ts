import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApartmentService } from 'src/app/services/apartment.service';

@Component({
  selector: 'app-apartment-add',
  templateUrl: './apartment-add.component.html',
  styleUrls: ['./apartment-add.component.scss']
})

export class ApartmentAddComponent implements OnInit{

  apartmentAddForm: FormGroup;

  ngOnInit(): void {
    this.createApartmentAddForm();
  }

  constructor(private formBuilder:FormBuilder, private apartmentService:ApartmentService, private toastrService:ToastrService) { }

  createApartmentAddForm(){
    this.apartmentAddForm = this.formBuilder.group({
      block:["",Validators.required],
      type:["",Validators.required],
      isOccupied:[""],
      floor:['', Validators.required],
      apartmentNumber:["",Validators.required],
      ownerOrTenant:["",Validators.required],
      customerId:["",Validators.required],
    })
  }

  add(){
    if(this.apartmentAddForm.valid){

      let apartmentModel = Object.assign({},this.apartmentAddForm.value)
      
      this.apartmentService.add(apartmentModel).subscribe(response =>{

        this.toastrService.success(response.message,"Başarılı")
      }, responseError =>{
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Error[i].ErrorMessage,'Doğrulama hatası')
            console.log(responseError.error);
          }
        }
      })
    } else{
      this.toastrService.warning("Form Eksik","Dikkat")
    }
  }

}
