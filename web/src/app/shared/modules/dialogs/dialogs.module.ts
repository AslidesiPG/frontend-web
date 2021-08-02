import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { PromptComponent } from './prompt/prompt.component';
import { CustomComponent } from './custom/custom.component';
import { DialogService } from './dialog.service';
import { AlertDirective } from './directive/alert.directive';
import { ConfirmDirective } from './directive/confirm.directive';
import { PromptDirective } from './directive/prompt.directive';
import { CustomDirective } from './directive/custom.directive';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

const directives = [
  AlertDirective,
  ConfirmDirective,
  PromptDirective,
  CustomDirective
];

const components = [
  AlertComponent,
  ConfirmComponent,
  PromptComponent,
  CustomComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatRadioModule,
    MatListModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
  declarations: [
    ...components,
    ...directives
  ],
  exports: [
    ...directives
  ],
  entryComponents: [
    ...components
  ],
  providers: []
})
export class DialogsModule {

}
