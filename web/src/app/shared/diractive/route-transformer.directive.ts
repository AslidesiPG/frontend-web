import { Directive, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Directive({
  selector: '[routeTransformer]'
})
export class RouteTransformerDirective {

  constructor(private el: ElementRef, private router: Router) { }

  @HostListener('click', ['$event'])
  public onClick(event) {
    if (event.target.tagName === 'A' || event.target.tagName === 'a') {
      const href: string = event.target.getAttribute('href');
      if (href.indexOf('http') === 0){
        window.open(href, '_blank');
      }else{
        this.router.navigate([href]);
      }
      event.preventDefault();
    } else {
      return;
    }
  }

}
