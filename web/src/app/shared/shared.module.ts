import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Components } from './components';
import { Pipes } from './pipes';
import { RouterModule } from '@angular/router';
import { Directives } from './diractive';
import { TranslateModule } from '@ngx-translate/core';
import { Services } from './services';
import { LoadingModule } from './components/loading/loading.module';

const Modules = [
  RouterModule,
  TranslateModule,
  LoadingModule,
];

@NgModule({
  imports: [
    CommonModule,
    ...Modules
  ],
  declarations: [
    ...Components,
    ...Directives,
    ...Pipes,
  ],
  exports: [
    ...Modules,
    ...Components,
    ...Directives,
    ...Pipes,
  ],
  providers: [
    ...Pipes,
  ],
  entryComponents: [
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        ...Services,
        ...Pipes,
      ]
    };
  }
}
