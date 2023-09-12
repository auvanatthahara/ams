import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRouting,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
