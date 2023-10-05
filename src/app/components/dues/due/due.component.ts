import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Due } from 'src/app/models/due';
import { DuesService } from 'src/app/services/dues.service';

@Component({
  selector: 'app-due',
  templateUrl: './due.component.html',
  styleUrls: ['./due.component.scss']
})
export class DueComponent implements OnInit {

  dues:Due[] = [];
  
  constructor(private dueService:DuesService, private toastrService:ToastrService){ }
  
  ngOnInit() {
   this.getDues();
  }

  getDues(){
    console.log('Calling getDues()'); 
    this.dueService.getDues().subscribe(
      response => {
        this.dues = response.data;
        console.log('Response:', response); 
      }, 
      error => {
        this.toastrService.error(error) 
      }
    );
  }

  updateDue(due:Due){
    this.dueService.update(due).subscribe(response => {
      console.log('Veriler güncellendi', response);
      this.toastrService.success(response.message, 'success')
      due.editMode = false;
      this.getDues();
    }, 
    error =>{
      this.toastrService.error(error)
    })
  }

  deleteDue(due:Due){
    this.dueService.deleteDues(due).subscribe(response =>{
      console.log(response.message)
      this.toastrService.error(response.message)
      this.getDues();
    }, error =>{
      this.toastrService.warning(error)
    })

  }

  editDue(due:Due){
    due.editMode = true;
  }

  cancelEdit(due:Due){
    due.editMode = false;
  }

  
  
}
