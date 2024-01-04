import { Component } from '@angular/core';
import { ThemeService } from '../theme.service';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css'
})
export class ThemeToggleComponent {
  isDarkMode: boolean;
  buttonClass: String;

  constructor(private themeService: ThemeService) {
    this.isDarkMode = this.themeService.isDarkMode();
    this.buttonClass = this.isDarkMode ? "dark" : "light"
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    this.themeService.setDarkMode(this.isDarkMode);
    this.buttonClass = this.isDarkMode ? "dark" : "light"
  }
}
