import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserCartService } from 'src/app/services/user-cart.service';


@Component({
  selector: 'app-card-add-modal',
  templateUrl: './card-add-modal.component.html',
  styleUrls: ['./card-add-modal.component.scss']
})
export class CardAddModalComponent implements OnInit {
  cartAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder,private cartService:UserCartService,private modalService: NgbModal, private toastrService:ToastrService) {}

  ngOnInit(): void {
    this.createCartAddform();
  }

  openModal() {
    this.modalService.open('cardAddModal', { centered: true });
  }

  createCartAddform() {
    this.cartAddForm = this.formBuilder.group({
      id: ["", Validators.required],
      userId: ["", Validators.required],
      cardNumber: ["", Validators.required],
      cardHolder: ["", Validators.required],
      expirationDate: ["", Validators.required],
      cvv: ["", Validators.required],
    });
  }

  addCart() {
    if (this.cartAddForm.valid) {
      let cartModel = Object.assign({}, this.cartAddForm.value);

      this.cartService.addUserCart(cartModel).subscribe(response => {
        console.log(response);
        console.log(response.message);
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
