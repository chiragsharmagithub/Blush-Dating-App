import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { TestErrorsComponent } from '../Errors/test-errors/test-errors.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { errorInterceptor } from '../_interceptors/error.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    TestErrorsComponent
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true}
  ],
  exports: [
    NavbarComponent,
    TestErrorsComponent
  ]
})
export class SharedModule { }
