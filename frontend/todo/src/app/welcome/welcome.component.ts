import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  HelloWorldBean,
  WelcomeDataService,
} from '../service/data/welcome-data.service';

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
  customizedWelcomeMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private service: WelcomeDataService
  ) {}

  ngOnInit(): void {
    // console.log(this.message);
    this.name = this.route.snapshot.params['name'];
    // console.log(this.name);
  }

  getWelcomeMessage() {
    // console.log(this.service.executeHelloWorldBeanService());

    this.service.executeHelloWorldBeanService().subscribe(
      (response) => {
        console.log(response);
        this.handleSuccessfulResponse(response);
      },
      (error) => this.errroHandleResponse(error)
    );
    // console.log('last line of code');
  }

  getWelcomeMessageWithPathParameter(name: string) {
    // console.log(this.service.executeHelloWorldBeanService());
    console.log(this.customizedWelcomeMessage);
    this.service.executeHelloWorldServiceWithPathVariable(this.name).subscribe(
      (response) => {
        console.log('in response');
        console.log(response);
        this.handleSuccessfulResponse(response);
      },
      (error) => {
        console.log('in error');
        console.log(error);
        this.errroHandleResponse(error);
      }
    );
    console.log('last line of code');
  }

  handleSuccessfulResponse(response: HelloWorldBean) {
    console.log('');
    this.customizedWelcomeMessage = response.message;
  }
  errroHandleResponse(error: any) {
    this.customizedWelcomeMessage = error.error.text;
  }
}
