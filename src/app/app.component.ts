import { Component, ElementRef, ViewChild, inject, PLATFORM_ID, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { NgClass, NgFor, CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    NgFor,
    NgClass,
    CommonModule,
    HeaderComponent
  ]
})
export class AppComponent implements OnInit {
  title = 'Colorful Todo App';
  todoList: TodoItem[] = [];
  @ViewChild('todoText') todoInputRef!: ElementRef<HTMLInputElement>;

  // ✅ Browser detection for SSR safety
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor(public router: Router) {
    
  }

  ngOnInit(): void {
    // ✅ FIXED: Safe localStorage access - only runs in browser
    if (this.isBrowser) {
      try {
        const storedTodoList = localStorage.getItem('todoList');
        if (storedTodoList) {
          this.todoList = JSON.parse(storedTodoList);
        }
      } catch (error) {
        console.warn('Error loading todos from localStorage:', error);
        this.todoList = [];
      }
    }
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false
      };
      this.todoList.push(newTodoItem);
      if (this.todoInputRef && this.todoInputRef.nativeElement) {
        this.todoInputRef.nativeElement.value = '';
      }
      this.saveTodoList();
    }
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList();
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList();
    }
  }

  saveTodoList(): void {
    // ✅ FIXED: Safe localStorage access - only runs in browser
    if (this.isBrowser) {
      try {
        localStorage.setItem('todoList', JSON.stringify(this.todoList));
      } catch (error) {
        console.warn('Error saving todos to localStorage:', error);
      }
    }
  }
}
