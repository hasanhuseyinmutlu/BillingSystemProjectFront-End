import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss']
})
export class NaviComponent implements OnInit {

  isLoggedIn : boolean;

  constructor(private toastr:ToastrService, private router: Router, private authService: AuthService) {
    
  }
  ngOnInit(): void {
    this.isLoggedIn =  this.authService.isAuthenticated();

    
  }


  logOut() {
    localStorage.removeItem('token');
    this.isLoggedIn = false; 
    this.toastr.success('Logged Out', 'success');
  }
}
