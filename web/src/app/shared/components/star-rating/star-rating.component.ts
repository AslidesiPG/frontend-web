import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StarRatingComponent),
      multi: true
    }
  ],
  encapsulation: ViewEncapsulation.Emulated
})
export class StarRatingComponent implements OnInit {

  constructor() {
  }

  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this._value = value;
    this.rating = value;
    this.onChange(value);
    this.onTouched(value);
  }
  private _value: number = null;

  @Input() fullStar = false;
  @Input() readonly = true;
  @Input() count = 0;
  @Input() number = true;
  @Input() rating = 0;
  @Input() starCount = 5;
  @Input() color = 'primary';
  @Output() change: EventEmitter<number> = new EventEmitter();

  snackBarDuration = 2000;
  ratingArr = [];
  disabled: boolean;

  onChange: any = () => { };
  onTouched: any = () => { };

  ngOnInit() {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  }
  onClick(rating: number) {
    if (this.readonly) {
      return;
    }
    this.value = rating;
    this.change.emit(rating);
    return false;
  }

  showFillIcon(index: number) {
    return (this.rating >= index + 1);
  }

  writeValue(value: any) {
    this.rating = value;
    this._value = value;
  }
  registerOnChange(fn: (rating: number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
export enum StarRatingColor {
  primary = 'primary',
  accent = 'accent',
  warn = 'warn'
}
