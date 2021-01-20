import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../models/recipe';
import {Subscription} from 'rxjs/Subscription';
import {pluck} from 'rxjs/operator/pluck';
import {debounceTime, distinctUntilChanged, map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {
  randomRecipe$: Recipe[] = [];
  subscription: Subscription;
  filteredRecipe$: Recipe[] = [];
  @Output() submitted = new EventEmitter<string>();

  constructor(private recipeService: RecipeService) {
    // @ts-ignore
    this.recipeService.getRandomRecipe()
      .subscribe(
        (res: Recipe[]) => {
          this.randomRecipe$ = res;
        }
      );




  }

  ngOnInit() {


  }

  getRecipe() {
    this.recipeService.getRandomRecipe()
      .subscribe(
        (res: Recipe[]) => {
          this.randomRecipe$ = res;
        }
      );
  }

  getRecipeByName(f) {
this.subscription = this.recipeService.searchRecipeByName(f)
   .subscribe(result => {
     // @ts-ignore
     this.filteredRecipe$ = result;
   });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}


