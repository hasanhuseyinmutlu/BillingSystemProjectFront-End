import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApartmentBill } from 'src/app/models/apartmentBill';
import { ListResponseModel } from 'src/app/models/listResponseModel';
import { Payment } from 'src/app/models/payment';
import { ApartmentService } from 'src/app/services/apartment.service';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
  selector: 'app-payment-modal',
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.scss']
})

export class PaymentModalComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private cartService: UserCartService, private toastrService: ToastrService) {}

  ngOnInit(): void {
    this.createPaymentForm();

  }

  payments: Payment[] = [];
  paymentForm: FormGroup;

  createPaymentForm(){
    this.paymentForm = this.formBuilder.group({
      id:[],
      customerId:[],
      amount:[],
      paymentDate:[new Date()]
    })
  }

  addPayment(){
    if(this.paymentForm.valid){
      let payModel = Object.assign({},this.paymentForm.value);

      this.cartService.addPayment(payModel).subscribe(response =>{
        this.toastrService.success(response.message);
      },responseError =>{
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Error[i].ErrorMessage,'Doğrulama hatası')
            console.log(responseError.error);
          }
        }
      })
    } else{
      this.toastrService.error("Form Eksik","Dikkat")
    }
  }

}
