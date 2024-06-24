import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Get item from local storage
  getItem(key: string): any {
    const jsonString = localStorage.getItem(key);
    return jsonString ? JSON.parse(jsonString) : null;
  }

  // Set item in local storage
  setItem(key: string, value: any): void {
    const jsonString = JSON.stringify(value);
    localStorage.setItem(key, jsonString);
  }

  // Remove item from local storage
  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
