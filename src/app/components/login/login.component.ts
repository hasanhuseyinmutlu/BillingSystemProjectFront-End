import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private authService:AuthService, private router:Router, private toastrService:ToastrService ) { }

  ngOnInit(): void { this.createLoginForm(); }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email:['', Validators.required],
      password:['', Validators.required]
    })
  }

  login(){
    if (this.loginForm.valid){

      console.log(this.loginForm.value);

      let loginModel = Object.assign({}, this.loginForm.value)

      this.authService.login(loginModel).subscribe(response =>{
        //show up response message
        console.log(response.message)
        this.toastrService.success(response.message)
        
        localStorage.setItem('token', response.data.token)
       
        this.router.navigate(['/'])

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
