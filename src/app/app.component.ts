import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home'},
    { title: 'Minha Lista', url: '/my-list', icon: 'list' },
    { title: 'Adicionar', url: '/adicionar', icon: 'add' },
  ];
  public labels = ["Adicione as tags que deseja criar"];
  //adicionar tags, inicia vazia
  //tags: Tags[]

  constructor(
    private router: Router,
  ) {}

  redirect(url: string){
    this.router.navigate([url]);
  }
}
