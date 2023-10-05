import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {
  ngOnInit(): void {
    this.createCustomerAddForm();
  }

  customerAddForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private customerService:CustomerService, private toastrService:ToastrService){}

  createCustomerAddForm(){
    this.customerAddForm = this.formBuilder.group({
      id:["", Validators.required],
      firstName:["", Validators.required],
      lastName:["", Validators.required],
      identityNumber:["", Validators.required],
      mailAddress:["", Validators.required],
      telephoneNumber:["", Validators.required],
      plateNumber:["", Validators.required]
    })
  }
  
  add(){
    if(this.customerAddForm.valid){
      let customerModel = Object.assign({}, this.customerAddForm.value); 

      this.customerService.addCustomer(customerModel).subscribe(response =>{
        this.toastrService.success(response.message)
      }, responseError =>{
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Error[i].ErrorMessage,'Doğrulama hatası')
            
          }
        }
      })
    } else{
      this.toastrService.warning("Form Eksik","Dikkat")
    }
  }

}