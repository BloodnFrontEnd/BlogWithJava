import {Component, inject, OnInit, signal} from '@angular/core';
import {NgClass} from '@angular/common';
import {Theme, ThemeService} from '../../core/services/theme-service';
import {LucideDynamicIcon, LucideMoon, LucideSun} from '@lucide/angular';

@Component({
  selector: 'app-radio-button',
  imports: [
    NgClass,
    LucideDynamicIcon
  ],
  templateUrl: './radio-button.html',
  styleUrl: './radio-button.css',
})
export class RadioButton implements OnInit {
  private readonly themeService = inject(ThemeService);

  protected readonly theme = signal<Theme>('light');
  protected icon = signal<ThemeIcon>(LucideSun)

  ngOnInit() {
    const themeFromLocalstorage = this.themeService.getTheme();
    this.theme.set(themeFromLocalstorage);
    this.icon.set(themeFromLocalstorage === 'dark' ? LucideMoon : LucideSun)
  }

  protected toggleTheme(): void{
    this.themeService.toggleTheme();

    this.theme.set(this.themeService.getTheme());
    this.icon.set(this.themeService.getTheme() === 'dark' ? LucideMoon : LucideSun)
  }
}

type ThemeIcon = typeof LucideSun | typeof LucideMoon;
