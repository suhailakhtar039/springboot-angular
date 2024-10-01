import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [FormsModule, DatePipe],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css',
})
export class TodoComponent implements OnInit {
  id!: number;
  todo!: Todo;

  constructor(
    private todoService: TodoDataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.todo = new Todo(1, '', false, new Date());
    this.id = this.route.snapshot.params['id'];
    this.todoService.retrieveTodo('suhail', this.id).subscribe((response) => {
      this.todo = response;
      // console.log(response);
    });
  }

  saveTodo() {
    this.todoService
      .updateTodo('suhail', this.id, this.todo)
      .subscribe((data) => {
        // console.log(data);
        this.router.navigate(['todos']);
      });
  }
}
