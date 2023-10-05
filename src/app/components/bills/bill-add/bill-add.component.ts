import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-add',
  templateUrl: './bill-add.component.html',
  styleUrls: ['./bill-add.component.scss']
})
export class BillAddComponent implements OnInit {

  billAddForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private billService: BillService, private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBillAddForm();
  }

  createBillAddForm() {
    this.billAddForm = this.formBuilder.group({
      apartmentId: ['', Validators.required],
      amount: ['', Validators.required],
      billDate: ['', Validators.required],
      type:['', Validators.required],
      id:['', Validators.required]
    });
  }

  add() {
    if (this.billAddForm.valid) {
      let billModel = Object.assign({}, this.billAddForm.value);

      this.billService.addBills(billModel).subscribe(response => {
        console.log(response);
        console.log('message below');
        console.log(response.message);
        this.toastrService.success(response.message , 'success')
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
