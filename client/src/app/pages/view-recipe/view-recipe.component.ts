import { Component, Signal, computed } from '@angular/core';
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

  /**
   * The source of the recipe, possibly url or text. returns { text: string, link: string }
   */
  recipeSource: Signal<{ text?: string; url?: string }> = computed(() => {
    const recipe = this.recipe();
    if (!recipe || !recipe?.source) {
      return {};
    }

    try {
      // Parse source to check if url
      const url = new URL(recipe.source);

      // If the source is a url, return the url
      if (url.protocol) {
        return { url: recipe.source, text: url.hostname };
      }
    } catch (e) {}

    // If the source is not a url, return the text
    return { text: recipe.source };
  });
}
