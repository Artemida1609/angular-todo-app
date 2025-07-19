import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet, ɵEmptyOutletComponent } from '@angular/router';
import { TodoComponent } from "./components/todo/todo.component";
import { Todo } from './types/todo';

const todos = [
  {id: 1, title: 'HTML + CSS', completed: true},
  {id: 2, title: 'JS', completed: false},
  {id: 3, title: 'React', completed: false},
  {id: 4, title: 'Vue.js', completed: false},
]

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TodoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  todos = todos;
  todoForm = new FormGroup({
    title: new FormControl('', {  
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
      ],
    }),
  });
  
  get title() {
    return this.todoForm.get('title') as FormControl;
  };

  get activeTodos() {
    return todos.filter(todo => !todo.completed);
  }

  addTodo() {
    if (this.todoForm.invalid) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: this.title.value,
      completed: false,
    };

    this.todos.push(newTodo);
    this.todoForm.reset();
  }
}
