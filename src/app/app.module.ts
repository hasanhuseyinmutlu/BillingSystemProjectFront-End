import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { LandingComponent } from './components/landing/landing.component';
import { BillComponent } from './components/bills/bill/bill.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './components/profile/profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AparmentComponent } from './components/apartments/aparment/aparment.component';
import { ApartmentDueComponent } from './components/apartments/apartment-due/apartment-due.component';
import { ApartmentBillComponent } from './components/apartments/apartment-bill/apartment-bill.component';
import { ApartmentAddComponent } from './components/apartments/apartment-add/apartment-add.component';
import { BillAddComponent } from './components/bills/bill-add/bill-add.component';
import { DueComponent } from './components/dues/due/due.component';
import { DueAddComponent } from './components/dues/due-add/due-add.component';
import { CustomerAddComponent } from './components/customers/customer-add/customer-add.component';
import { CustomerComponent } from './components/customers/customer/customer.component';
import { MessageAddComponent } from './components/messages/message-add/message-add.component';
import { MessageComponent } from './components/messages/message/message.component';
import { CardAddModalComponent } from './components/Modals/card-add-modal/card-add-modal.component';
import { AdminComponent } from './components/admin/admin.component';

import { RouterModule, Routes } from '@angular/router';
import { AuthInterceptor } from './interceptors.ts/auth.interceptor';
import { LoadInterceptor } from './interceptors.ts/load.interceptor';
import { LoginGuard } from './guards/login.guard';
import { PaymentModalComponent } from './components/Modals/payment-modal/payment-modal.component';
import { CardShowModalComponent } from './components/Modals/card-show-modal/card-show-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    LandingComponent,
    BillComponent,
    LoginComponent,
    ProfileComponent,
    AparmentComponent,
    ApartmentDueComponent,
    ApartmentBillComponent,
    ApartmentAddComponent,
    BillAddComponent,
    DueComponent,
    DueAddComponent,
    CustomerAddComponent,
    CustomerComponent,
    MessageAddComponent,
    MessageComponent,
    CardAddModalComponent,
    AdminComponent,
    PaymentModalComponent,
    CardShowModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    ModalModule,
    NgbModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-center',
      timeOut: 5000,
      closeButton: true

    }),
    
  ],
  providers: [
    LoginGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi:true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadInterceptor, multi:true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
