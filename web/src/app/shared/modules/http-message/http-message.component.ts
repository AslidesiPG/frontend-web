import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'http-message',
  templateUrl: './http-message.component.html',
  styleUrls: ['./http-message.component.scss']
})
export class HttpMessageComponent implements OnInit {

  errorMessage: any = [];
  showMessage = false;
  private _type: any;

  @Input('type')
  get type(): any {
    return this._type;
  }

  set type(value: any) {
    if (value === 'error') {
      this._type = 'danger';
    } else {
      this._type = value;
    }
  }

  @Input('data') set data(response: any) {
    this.errorMessage = [];
    /* console.log(response); */
    if (response) {
      this.showMessage = true;
      if (typeof response === 'string') {
        this.errorMessage.push(response);
      } else {
        if (this.type === undefined) {
          if (response.ok) {
            this.type = 'success';
          } else {
            this.type = 'error';
          }
        }
        let messages: any[] = [];
        if (response.error && response.error.messages) {
          Object.keys(response.error.messages).forEach((key) => {
            for (const er of response.error.messages[key]) {
              messages.push(er);
            }
          });
        } else if (response.error && response.error.errors) {
          Object.keys(response.error.errors).forEach((key) => {
            for (const er of response.error.errors[key]) {
              messages.push(er);
            }
          });
        } else if (response.error && response.error.message) {
          messages = [response.error.message];
        }  else if (response.message) {
          messages = [response.message];
        }
        this.errorMessage = messages;
      }
    } else {
      this.showMessage = false;
      this.errorMessage = [];
    }
  }

  constructor(

  ) {

  }
  ngOnInit(): void {
  }

  closeMessage() {
    this.showMessage = false;
    setTimeout(() => {
      this.errorMessage = [];
    }, 500);
  }

}
