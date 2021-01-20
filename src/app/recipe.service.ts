import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Recipe} from './models/recipe';
import {debounceTime} from 'rxjs/operator/debounceTime';
import {distinctUntilChanged} from 'rxjs/operator/distinctUntilChanged';
import {switchMap} from 'rxjs/operator/switchMap';
import {pluck} from 'rxjs/operators';



@Injectable()
export class RecipeService {
  headers = new HttpHeaders({
    'x-rapidapi-key': '9271c028f8mshf50658048969f0ap1627c9jsn3473138073f8',
    'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  });

  searchUrl = 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients';
  queryUrl = '?ingredients=';


  constructor(private httpClient: HttpClient) {

  }


   getRandomRecipe() {
    // @ts-ignore
    return this.httpClient.get<Recipe[]>('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/random',
      {headers: this.headers}
    )
      .pipe(pluck('recipes'));
  }

  searchTry(terms: Observable<string>) {
   return  terms.switchMap(term => this.searchEntry(term));
     // .pipe(
     //  debounceTime(400),
     //  distinctUntilChanged(), switchMap(term => this.searchEntries(term)));
     //
  }

  searchEntry(term) {
    return this.httpClient
      .get(this.searchUrl + this.queryUrl + term, {headers: this.headers}).map(res => res || []);
      // .pipe(
      //   map(res => res || []));
  }

}
