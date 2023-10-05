import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DuesService } from 'src/app/services/dues.service';

@Component({
  selector: 'app-due-add',
  templateUrl: './due-add.component.html',
  styleUrls: ['./due-add.component.scss']
})
export class DueAddComponent implements OnInit{
  ngOnInit(): void {
   this.createDueAddForm();
  }

  dueAddForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private dueService:DuesService, private toastrService:ToastrService) {}

  createDueAddForm(){
    this.dueAddForm = this.formBuilder.group({
      id:['', Validators.required],
      apartmentId:['', Validators.required],
      amount:['', Validators.required],
      duesDate:['', Validators.required]

    })
  }

  add() {
    if(this.dueAddForm.valid){
      let dueModel = Object.assign({}, this.dueAddForm.value);

      this.dueService.addDue(dueModel).subscribe(response =>{
        console.log(response);
        console.log('message below');
        console.log(response.message);
        
        this.toastrService.success(response.message)
        
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
