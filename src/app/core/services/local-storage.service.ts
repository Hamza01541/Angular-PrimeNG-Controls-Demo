import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() { }

  /**
   * Set value to localstorage.
   * @param {String} key
   * @param {any} value
   * @returns {void}
   */
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Retrieve value from localstorage.
   * @param {string} key
   * @returns {any}
   */
  get(key: string): any {
      const item:any = localStorage.getItem(key);
    return JSON.parse(item);
  }

  /**
   * Remove value from localstorage.
   * @param {string} key
   * @returns {void}
   */
  delete(key: string): void {
    localStorage.removeItem(key)
;
  }

  /**
   * Clear localstorage.
   * @returns {void}
   */
  clear(): void {
    localStorage.clear();
  }
}