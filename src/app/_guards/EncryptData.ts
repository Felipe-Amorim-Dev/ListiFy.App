import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptedStorageService {
  private secretKey = 'CHANGE-ME-IN-LOCAL-ONLY';

  constructor() {}

  setItem(key: string, value: any): void {
    const encryptedValue = CryptoJS.AES.encrypt(JSON.stringify(value), this.secretKey).toString();
    localStorage.setItem(key, encryptedValue);
  }


  getItem(key: string): any {
    const encryptedValue = localStorage.getItem(key);
    if (encryptedValue) {
      const bytes = CryptoJS.AES.decrypt(encryptedValue, this.secretKey);
      const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decryptedValue);
    }
    return null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}