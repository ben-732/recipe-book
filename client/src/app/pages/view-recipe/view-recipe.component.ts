import { Component } from '@angular/core';
import { BehaviorSubject, concatMap, distinctUntilChanged, map } from 'rxjs';
import { Recipe } from '../../../generated/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { RecipesService } from '../../../generated/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrl: './view-recipe.component.scss',
})
export class ViewRecipeComponent {
  recipe$ = new BehaviorSubject<Recipe | undefined>(undefined);
  recipe = toSignal(this.recipe$);

  constructor(private recipesService: RecipesService, route: ActivatedRoute) {
    route.params
      .pipe(
        map((params) => (params['recipeId']?.trim() ?? '') as string),
        distinctUntilChanged(),
        concatMap((id) => this.recipesService.recipesIdGet({ id }))
      )
      .subscribe(this.recipe$);
  }
}
