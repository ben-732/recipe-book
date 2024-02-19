import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ngOnInit() {
    // Request root domain of api
    fetch('/api/recipes')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}
