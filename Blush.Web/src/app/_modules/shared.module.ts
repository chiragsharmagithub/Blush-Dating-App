import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { TestErrorsComponent } from '../Errors/test-errors/test-errors.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { errorInterceptor } from '../_interceptors/error.interceptor';
import { JwtInterceptor } from '../_interceptors/jwt.interceptor';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarComponent,
    TestErrorsComponent,
    TabsModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: errorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}
  ],
  exports: [
    NavbarComponent,
    TestErrorsComponent,
    TabsModule
  ]
})
export class SharedModule { }
