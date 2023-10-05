import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Bill } from 'src/app/models/bill';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})
export class BillComponent implements OnInit {

  bills:Bill[];

  constructor(private billService:BillService, private toastrService:ToastrService) {
    
  }
  ngOnInit() { 
    this.getBills();
  }

  getBills(){
    this.billService.getBills().subscribe(
      response =>{
        this.bills = response.data;

      }
    )
  }

  editBill(bill : Bill){
    bill.editMode = true;
  }

  cancelEdit(bill: Bill){
    bill.editMode = false;
  }

  updateBill(bill: Bill){
    this.billService.updateBills(bill).subscribe(response =>{
      console.log('Veriler güncellendi', response);
      this.toastrService.success(response.message, "success")
      bill.editMode = false;
      this.getBills();
    }, 
    error =>{
      console.log('Hata oluştu', error);
      this.toastrService.error(error.message, "error")
    })
  }

  deleteBill(bill:Bill){
    this.billService.deleteBills(bill).subscribe(response =>{
      console.log( response.message)
      this.toastrService.error(response.message)
      this.getBills();

    }, error =>{
      console.log(error)
      this.toastrService.warning(error.message)
    })
  }
}
