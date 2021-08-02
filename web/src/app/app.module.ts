import { BrowserModule, BrowserTransferStateModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastyModule } from 'src/packages/ngx-toasty';
import { SeoService } from './shared/services/seo.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,
    AppRoutingModule,
    HttpClientModule,
    ToastyModule.forRoot(),
    SharedModule.forRoot(),
  ],
  providers: [
    SeoService,
    Meta,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
