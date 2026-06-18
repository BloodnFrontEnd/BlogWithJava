import { Injectable, signal } from '@angular/core';

export type GrowlType = 'success' | 'error' | 'info';

export interface GrowlMessage {
  message: string;
  type: GrowlType;
}

@Injectable({
  providedIn: 'root',
})
export class GrowlService {
  public growl = signal<GrowlMessage | null>(null);

  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(message: string, type: GrowlType = 'info', duration = 3000): void {
    this.growl.set({ message, type });

    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.timeoutId = setTimeout(() => {
      this.growl.set(null);
    }, duration);
  }

  success(message: string, duration = 3000): void {
    this.show(message, 'success', duration);
  }

  error(message: string, duration = 3000): void {
    this.show(message, 'error', duration);
  }

  info(message: string, duration = 3000): void {
    this.show(message, 'info', duration);
  }
}
