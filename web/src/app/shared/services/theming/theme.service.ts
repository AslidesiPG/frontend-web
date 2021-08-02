import { CssHrefSwitcher } from './style-manager.service';
import { Injectable } from '@angular/core';
import { themeOptions } from './theme.options';
import { ThemeOption } from 'src/app/models/theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  public themeOptions: ThemeOption[] = themeOptions;

  constructor(
    private styleManager: CssHrefSwitcher
  ) { }

  setTheme(themeName: string) {
    this.styleManager.setStyle(
      'theme', `assets/themes/${themeName}.css`
    );
  }
}
