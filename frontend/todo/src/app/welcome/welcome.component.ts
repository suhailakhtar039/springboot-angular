import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent implements OnInit {
  message = 'some welcome message';
  name = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.message);
    this.name = this.route.snapshot.params['name'];
    console.log(this.name);
  }
}
