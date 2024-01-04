import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jwtDecode from 'jwt-decode';
import { UserCartDetail } from 'src/app/models/userCartDetail';
import { UserCartService } from 'src/app/services/user-cart.service';

@Component({
  selector: 'app-card-show-modal',
  templateUrl: './card-show-modal.component.html',
  styleUrls: ['./card-show-modal.component.scss']
})
export class CardShowModalComponent implements OnInit {

  constructor(private modalService:NgbModal,private cartService:UserCartService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token')
   if (token){
    const decodedToken: any = jwtDecode(token);
    if (decodedToken && typeof decodedToken === 'object' && '1' in decodedToken) {
      const id = +decodedToken[1]; 
      this.getCustomerCards(id)
    }
   }
  }

  customerCard:UserCartDetail[] =[];

  getCustomerCards(id: number){
    this.cartService.getCustomerCart(id).subscribe(
      response =>{
        this.customerCard = response.data;
      }
    )
  }

  openModal(){
    this.modalService.open('cardShowModal',{centered: true})
  }

}
