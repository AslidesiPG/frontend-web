import { Injectable } from '@angular/core';

/**
 * Based on https://github.com/angular/material.angular.io/blob/master/src/app/shared/style-manager/style-manager.ts
 */
@Injectable({
  providedIn: 'root'
})
export class CssHrefSwitcher {
  constructor() { }

  /**
   * Set the stylesheet with the specified key.
   */
  public setStyle(key: string, href: string) {
    const el = this.getLinkElementForKey(key);
    el.setAttribute('type', 'text/css');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', href);
  }

  /**
   * Remove the stylesheet with the specified key.
   */
  public removeStyle(key: string) {
    const existingLinkElement = this.getExistingLinkElementByKey(key);
    if (existingLinkElement) {
      document.head.removeChild(existingLinkElement);
    }
  }

  private getLinkElementForKey(key: string) {
    return this.getExistingLinkElementByKey(key) || this.createLinkElementWithKey(key);
  }

  private getExistingLinkElementByKey(key: string) {
    return document.head.querySelector(
      `link[rel="stylesheet"].${this.getClassNameForKey(key)}`
    );
  }

  private createLinkElementWithKey(key: string) {
    const el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('type', 'text/css');
    el.classList.add(this.getClassNameForKey(key));
    document.head.appendChild(el);
    return el;
  }

  private getClassNameForKey(key: string) {
    return `app-${key}`;
  }
}
