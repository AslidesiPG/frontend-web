import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.scss']
})
export class AttributesComponent implements OnInit {

  constructor() { }

  @Input() attributes:any;
  ngOnInit(): void {
  }

}
