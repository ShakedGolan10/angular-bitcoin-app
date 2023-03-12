import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { FormsModule } from '@angular/forms';
import { HomePageComponent } from './views/home-page/home-page.component';
import { ContactIndexComponent } from './views/contact-index/contact-index.component';
import { ContactListComponent } from './cmps/contact-list/contact-list.component';
import { ContactPreviewComponent } from './cmps/contact-preview/contact-preview.component';
import { ContactDetailsComponent } from './views/contact-details/contact-details.component';
import { ContactEditComponent } from './cmps/contact-edit/contact-edit.component';
import { ContactFilterComponent } from './cmps/contact-filter/contact-filter.component';
import { LoginSignupComponent } from './cmps/login-signup/login-signup.component';
import { UserMsgComponent } from './cmps/user-msg/user-msg.component';
import { TransferFundComponent } from './cmps/transfer-fund/transfer-fund.component';
import { TransferListComponent } from './cmps/transfer-list/transfer-list.component';
import { TransferPreviewComponent } from './cmps/transfer-preview/transfer-preview.component';
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { StatsComponent } from './cmps/stats/stats.component';
import { AvgMonthsChartComponent } from './cmps/avg-months-chart/avg-months-chart.component';
import { MarketPriceChartComponent } from './cmps/market-price-chart/market-price-chart.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    ContactIndexComponent,
    ContactListComponent,
    ContactPreviewComponent,
    ContactDetailsComponent,
    ContactEditComponent,
    ContactFilterComponent,
    LoginSignupComponent,
    UserMsgComponent,
    TransferFundComponent,
    TransferListComponent,
    TransferPreviewComponent,
    AppHeaderComponent,
    StatsComponent,
    AvgMonthsChartComponent,
    MarketPriceChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
