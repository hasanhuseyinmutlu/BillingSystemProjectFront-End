import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree,  } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";
import { ToastrService } from 'ngx-toastr';
import { Injectable } from "@angular/core";

@Injectable()
export class LoginGuard implements CanActivate {
  
  constructor(private authService:AuthService,
  private toastrService:ToastrService,
   private router:Router){

}

canActivate(
 route: ActivatedRouteSnapshot,
 state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
 
   if(this.authService.isAuthenticated()){
     return true;
   }else{
     this.router.navigate(["login"])
     this.toastrService.warning("Sisteme giriş yapmalısınız")
     return false;
   }


}}