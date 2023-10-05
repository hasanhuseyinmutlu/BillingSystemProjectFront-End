import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApartmentBill } from 'src/app/models/apartmentBill';
import { Payment } from 'src/app/models/payment';
import { UserCart } from 'src/app/models/userCart';
import { UserCartService } from 'src/app/services/user-cart.service';
import { PaymentModalComponent } from '../Modals/payment-modal/payment-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { CustomerInfo } from 'src/app/models/customerInfo';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


export class ProfileComponent implements OnInit {
  userCart:UserCart[] = [];

  showDropdown: boolean = false;

  toggleDropdown(){
    this.showDropdown = !this.showDropdown;
  }

  ngOnInit(): void {
    this.getCarts();
    this.createCartAddform();
  
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: any = jwt_decode(token); 
      if (decodedToken && typeof decodedToken === 'object' && '1' in decodedToken) {
        const userId = +decodedToken[1]; 
        this.getCustomerInfo(userId);
      }
    }
  }
  

  constructor (private cartService:UserCartService, private fromBuilder:FormBuilder, private customerService: CustomerService, private toastrService: ToastrService) { }
  
  
  getCarts(){
    this.cartService.getUserCart().subscribe(
      response =>{

        this.userCart = response.data;
      }
    )
  }

  cartAddForm: FormGroup
  
  createCartAddform(){
    this.cartAddForm = this.fromBuilder.group({

      id:["", Validators.required],
      userId:["", Validators.required],
      cardNumber:["", Validators.required],
      cardHolder:["", Validators.required],
      expirationDate:["", Validators.required],
      cvv:["", Validators.required],
    })

  }
  addCart(){
    if (this.cartAddForm.valid) {
      let cartModel = Object.assign({}, this.cartAddForm.value)

     this.cartService.addUserCart(cartModel).subscribe(response =>{
     
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
  customerInfo: CustomerInfo;
  
  getCustomerInfo(userId: number) {
    this.customerService.getUserInfo(userId).subscribe(
      response => {
        this.customerInfo = response.data[0];
      },responseError =>{
        if(responseError.error.Errors.length > 0){
          for (let i = 0; i<responseError.error.Errors.length; i++){
            this.toastrService.error(responseError.error.Error[i].ErrorMessage,'Doğrulama hatası')
            console.log(responseError.error);
          }
        }
      }
    );
  }
  
  
}