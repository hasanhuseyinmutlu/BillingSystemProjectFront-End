import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  message:Message[] = []
  ngOnInit(): void {
    this.getAllMessage();
  }

  constructor (private messageService:MessageService) { }

  getAllMessage(){
    this.messageService.getMessage().subscribe(
      response =>{
        console.log(response.data)
        this.message = response.data
      }
    )
  }

}
