import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message-add',
  templateUrl: './message-add.component.html',
  styleUrls: ['./message-add.component.scss']
})
export class MessageAddComponent implements OnInit {
  ngOnInit(): void {
    this.createMessageAddForm()
  }

  messageAddForm: FormGroup;

  constructor(private messageService:MessageService, private formBuilder:FormBuilder, private toastrService:ToastrService) { } 

  createMessageAddForm(){
    this.messageAddForm = this.formBuilder.group({
      senderId:["",Validators.required],
      receiverId:["",Validators.required],
      content:["",Validators.required],
    })
  }

  add(){
    if(this.messageAddForm.valid){
      let messageModel = Object.assign({}, this.messageAddForm.value)

      this.messageService.addMessage(messageModel).subscribe(response =>{
        console.log(response)

        console.log(response.message)
        this.toastrService.success(response.message)
        this.ngOnInit();
      }, responseError =>{
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
