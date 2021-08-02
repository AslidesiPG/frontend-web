import { Directive, Input, TemplateRef } from '@angular/core';
@Directive({
    selector: '[dtTemplate]',
    host: {}
})
export class BodyTemplate {
    @Input()
    type: string;
    @Input('dtTemplate')
    name: string;
    constructor(public template: TemplateRef<any>) { }
    getType(): string {
        return this.name;
    }
}
