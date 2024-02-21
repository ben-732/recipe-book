import { Component, OnInit, signal } from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { RecipesService } from '../../../generated/services';
import { RecipeSummary } from '../../../generated/models';
import { Subject, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

// import angular interop observable to signal

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  request$ = new Subject<RecipeSummary[]>();
  recipeList = toSignal(this.request$);

  error$ = new Subject<Error>();

  constructor(private recipesService: RecipesService, http: HttpClient) {
    this.recipesService.recipesGet().subscribe(this.request$);

    // http.get('/api/recipes/').subscribe(console.log);
  }
}
