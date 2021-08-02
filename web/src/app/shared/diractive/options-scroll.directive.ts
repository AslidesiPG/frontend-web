import { Directive, EventEmitter, Input, Output, OnDestroy, AfterViewInit } from '@angular/core';
import { MatAutocomplete } from '@angular/material/autocomplete';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

export interface IAutoCompleteScrollEvent {
  autoComplete: MatAutocomplete;
  scrollEvent: Event;
}

@Directive({
  selector: 'mat-autocomplete[optionsScroll]'
})
export class OptionsScrollDirective implements OnDestroy, AfterViewInit {

  @Input() threshold = 50;
  @Output('optionsScroll') scroll = new EventEmitter<OptionsScrollDirective>();

  _onDestroy = new Subject();
  loading: boolean;
  stop: boolean;

  constructor(public autoComplete: MatAutocomplete) {
  }


  private removeScrollEventListener() {
    if (this.autoComplete.panel) {
      this.autoComplete.panel.nativeElement
        .removeEventListener('scroll', this.onScroll);
    }
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();

    this.removeScrollEventListener();
  }

  ngAfterViewInit(): void {
    this.autoComplete.opened.pipe(
      tap(() => {
        setTimeout(() => {
          this.removeScrollEventListener();
          if (this.autoComplete.panel) {
            this.autoComplete.panel.nativeElement
              .addEventListener('scroll', this.onScroll.bind(this));
          }
        });
      }),
      takeUntil(this._onDestroy)).subscribe();

    this.autoComplete.closed.pipe(
      tap(() => this.removeScrollEventListener()),
      takeUntil(this._onDestroy)).subscribe();
  }

  complete() {
    this.loading = false;
  }

  disabled() {
    this.stop = true;
  }

  onScroll(event: any) {
    if (this.loading === true || this.stop === true) {
      return;
    }
    if (this.threshold === undefined) {
      this.scroll.next(this);
      this.loading = true;
    } else {
      const current = event.target.scrollTop + event.target.clientHeight;
      if (current > event.target.scrollHeight - this.threshold) {
        this.scroll.next(this);
        this.loading = true;
      }
    }
  }
}
