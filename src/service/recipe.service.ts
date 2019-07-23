import { Recipe } from "../models/recipe.model";
import { Ingrident } from "../models/ingrident.model";
import { Http, Response } from "@angular/http";
import { AuthService } from "./auth.service";
import { Injectable } from "@angular/core";
import 'rxjs/Rx';
@Injectable()
export class RecipeService 
{
    private recipes: Recipe[] = [];
    constructor(private http: Http, private authService: AuthService){}
    addRecipe(title: string, description: string,difficulty: string,ingridents: Ingrident[])
    {
        this.recipes.push(new Recipe(title,description,difficulty,ingridents));
        console.log(this.recipes);
    }

    getRecipe()
    {
        return this.recipes.slice();
    }

    updateRecipe(index: number,title: string, 
    description: string,difficulty: string,ingridents: Ingrident[])
    {
        this.recipes[index] = new Recipe(title,description,difficulty,ingridents);
    }

    removeRecipe(index: number)
    {
        this.recipes.splice(index,1);
    }
    storeList(token: string)
    {
      const userId =  this.authService.getActiveUser().uid;
      return this.http.put('https://ionic3-recipe-book-app.firebaseio.com/'+userId+'/recipe-list.json?auth='+token,
      this.recipes).map((response: Response)=>{
          return response.json();
      });
    }

    fetchList(token: string)
    {
      const userId =  this.authService.getActiveUser().uid;
      return this.http.get('https://ionic3-recipe-book-app.firebaseio.com/'+userId+'/recipe-list.json?auth='+token).map((response: Response)=>{
          return response.json();
      }).do((recipes: Recipe[])=>{
            if(recipes)
            {
                this.recipes = recipes;
            }
            else {
                this.recipes = [];
            }          
      });
    }
}