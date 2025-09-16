// header.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  title = 'VISHNU PRIYA P - Todo App';
  
  constructor(private router: Router) {}
  
  navigateTo(route: string) {
    this.router.navigate([route]);
  }
  
  isActive(route: string): boolean {
    return this.router.url === `/${route}`;
  }
}