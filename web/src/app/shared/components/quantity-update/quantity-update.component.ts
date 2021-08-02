import { Component, EventEmitter, forwardRef, OnDestroy, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const noop = () => { };
@Component({
  selector: 'app-quantity-update',
  templateUrl: './quantity-update.component.html',
  styleUrls: ['./quantity-update.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => QuantityUpdateComponent),
      multi: true
    }
  ]
})
export class QuantityUpdateComponent implements OnInit, OnDestroy, ControlValueAccessor {
  isLogin: unknown;
  disabled: boolean;

  private _quantity: number = 0;
  public get quantity(): number {
    return this._quantity;
  }
  public set quantity(value: number) {
    this._quantity = value;
    this.onChange(value);
    this.quantityChange.emit(value);
  }

  @Output() quantityChange: EventEmitter<number> = new EventEmitter<number>();

  onTouched: () => void = noop;
  onChange: (_: any) => void = noop;


  constructor() { }

  ngOnInit(): void {
  }

  minus() {
    if (this.quantity >= 1) {
      this.quantity--;
    }
  }
  plus() {
    this.quantity++;
  }

  writeValue(value: any): void {
    this._quantity = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnDestroy(): void {
  }
}
