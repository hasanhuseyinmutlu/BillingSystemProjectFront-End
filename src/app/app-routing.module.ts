import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { BillComponent } from './components/bills/bill/bill.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AparmentComponent } from './components/apartments/aparment/aparment.component';
import { ApartmentDueComponent } from './components/apartments/apartment-due/apartment-due.component';
import { ApartmentAddComponent } from './components/apartments/apartment-add/apartment-add.component';
import { BillAddComponent } from './components/bills/bill-add/bill-add.component';
import { ApartmentBillComponent } from './components/apartments/apartment-bill/apartment-bill.component';
import { DueComponent } from './components/dues/due/due.component';
import { DueAddComponent } from './components/dues/due-add/due-add.component';
import { CustomerAddComponent } from './components/customers/customer-add/customer-add.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { MessageComponent } from './components/messages/message/message.component';
import { MessageAddComponent } from './components/messages/message-add/message-add.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginGuard } from './guards/login.guard';


const routes: Routes = [
  {path:'', pathMatch:'full',  component:LandingComponent},
  
  {path:'bills',  component:BillComponent},
  {path:'billAdd', component:BillAddComponent , canActivate: [LoginGuard]},
  {path:'login', component:LoginComponent},
  {path:'profile',  component:ProfileComponent, canActivate: [LoginGuard]},
  {path:'apartment', component:AparmentComponent},
  {path:'dues', component:ApartmentDueComponent},
  {path:'apartmentAdd', component:ApartmentAddComponent},
  {path:'apartBil', component:ApartmentBillComponent},
  {path:'due', component:DueComponent},
  {path:'dueAdd', component:DueAddComponent},
  {path:'customerAdd', component:CustomerAddComponent},
  {path:'customer', component:CustomerComponent},
  {path:'message', component:MessageComponent},
  {path:'messageAdd', component:MessageAddComponent},
  {path:'admin', component:AdminComponent, canActivate: [LoginGuard] }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
