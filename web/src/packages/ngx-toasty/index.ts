// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/cadulis/ngx-toasty

import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';

export * from './toasty.service';
export * from './toasty.component';
export * from './toast.component';
export * from './shared';

import { ToastyComponent } from './toasty.component';
import { ToastComponent } from './toast.component';
import { SafeHtmlPipe } from './shared';
import { ToastyService, ToastyConfig, toastyServiceFactory } from './toasty.service';

export let providers = [
    ToastyConfig,
    { provide: ToastyService, useFactory: toastyServiceFactory, deps: [ToastyConfig] }
];

@NgModule({
    imports: [CommonModule],
    declarations: [ToastComponent, ToastyComponent, SafeHtmlPipe],
    exports: [ToastComponent, ToastyComponent],
    providers
})
export class ToastyModule {
    static forRoot(): ModuleWithProviders<ToastyModule> {
        return {
            ngModule: ToastyModule,
            providers
        };
    }
}
