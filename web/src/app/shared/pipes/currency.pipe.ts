import { CurrencyPipe as NgCurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Injectable, OnDestroy, Pipe, PipeTransform, } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SettingsService } from '../services/settings.service';

@Pipe({
  name: 'currency',
  pure: false,
})
export class CurrencyPipe extends NgCurrencyPipe implements PipeTransform, OnDestroy {
  currency: string;
  rate: number = 1;
  constructor(
    private settingsService: SettingsService,
    private cd: ChangeDetectorRef,
  ){
    super('en-IN');
    
    this.settingsService.$currency.pipe(untilDestroyed(this)).subscribe((currency)=>{
      this.currency = currency;
      cd.markForCheck();
    });
    this.settingsService.$rate.pipe(untilDestroyed(this)).subscribe((rate)=>{
      this.rate = rate;
      cd.markForCheck();
    });
  }
  transform(value: any): string {
    if (this.currency == 'usd'){
      return super.transform(value * this.rate, 'USD', '$', null, 'en-US');
    }else{
      return super.transform(value, 'INR', '₹', '1.0-2', 'en-IN');
    }
  }

  ngOnDestroy(): void {
  }

}
