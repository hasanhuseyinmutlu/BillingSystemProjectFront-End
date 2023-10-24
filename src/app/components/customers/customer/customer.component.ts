import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit{

  customers:Customer[] = [];

  ngOnInit(): void {
   this.getAllCustomer();
  }
  
  constructor(private customerService:CustomerService, private toastrService:ToastrService ) { }

  getAllCustomer(){
    this.customerService.getCustomer().subscribe(
      response =>{
        console.log(response.data)
        this.customers = response.data
      }
    )
  }

  updateCustomer(customer:Customer){
    this.customerService.updateCustomer(customer).subscribe(
      response => {
        console.log('Veriler güncellendi', response);
        customer.editMode= false;
      },
      error => {
        this.toastrService.error(error,'error')
      }
    );
  }

  deleteCustomer(customer:Customer){
    this.customerService.deleteCustomer(customer).subscribe(
      response =>{
        this.toastrService.error(response.message)
        this.getAllCustomer();
      },
      responseError =>{
        this.toastrService.error(responseError, 'Error')
      }
    )
  }

  editCustomer(customer:Customer){
    customer.editMode = true;
  }
  cancelEdit(customer:Customer){
    customer.editMode =false;
  }

}
