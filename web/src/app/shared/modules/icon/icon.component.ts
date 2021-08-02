import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
 
  @Input() name: string;
  @Input() size: 'md' | 'sm' | 'xs' | 'lg' | 'xl';

  constructor() { }

  ngOnInit(): void {
  }

}
