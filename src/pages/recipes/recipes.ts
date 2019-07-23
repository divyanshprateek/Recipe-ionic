import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../service/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { RecipePage } from '../recipe/recipe';
import { AuthService } from '../../service/auth.service';
import { RecipeOptions } from './recipe-options/recipe-options';

/**
 * Generated class for the RecipesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private recipesService: RecipeService,
    private popCtrl: PopoverController, private authServce: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }
recipes: Recipe[];
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipesPage');
  }
  ionViewWillEnter()
  {
    this.recipes = this.recipesService.getRecipe();
  }
  onLoadRecipe(recipe: Recipe,index: number)
  {
    this.navCtrl.push(RecipePage,{recipe: recipe,index: index});
  }
  onAdd()
  {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }
  onShowOptions(event: MouseEvent) 
  {
    const loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    const pop = this.popCtrl.create(RecipeOptions);
    pop.present({ev: event});
    pop.onDidDismiss(
      data =>{
        if(data.action == 'load')
        {
          loading.present();
          this.authServce.getActiveUser().getIdToken().then((token: string)=> {
            this.recipesService.fetchList(token).subscribe((list: Recipe[])=>{
              loading.dismiss();
              console.log(list);
              if(list)
              {
                this.recipes = list;
              }
              else {
                this.recipes = [];
              }
            },error=> {
              loading.dismiss();
              this.handleError(error.message);
            })
          });
        }
        else if (data.action == 'store') {
          loading.present();
          this.authServce.getActiveUser().getIdToken().then((token: string)=> {
            this.recipesService.storeList(token).subscribe(()=>{
              loading.dismiss();
              console.log('Success');
            },error=> {
              loading.dismiss();
             this.handleError(error.message);
            })
          });
        }
      }
    )
  }

  handleError(errorMessage: string)
  {
    const alert = this.alertCtrl.create({
      title: 'An Error Occurred !',
      message: errorMessage,
      buttons: ['OK']
    });
    alert.present();
  }
}

