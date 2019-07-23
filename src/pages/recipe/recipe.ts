import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { ShoppingListService } from '../../service/shopping-list.service';
import { RecipeService } from '../../service/recipe.service';

/**
 * Generated class for the RecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit{

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) {
  }

  recipe: Recipe;
  index: number;
  ionViewDidLoad() {
    console.log('ionViewDidLoad RecipePage');
  }

  ngOnInit()
  {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onEditRecipe()
  {
    this.navCtrl.push(EditRecipePage,{mode:'Edit',recipe: this.recipe,index: this.index});
  }
  onAddIngridents()
  {
    this.shoppingListService.addItems(this.recipe.ingridents);
  }
  onDeleteRecipe()
  {
    this.recipeService.removeRecipe(this.index);
    const toast = this.toastCtrl.create({
      message: "Recipe Deleted",
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
    const alert = this.alertCtrl.create({
      title: 'Do you wish to remove items from the Shopping List?',
        buttons: [
        {
        text: 'Yes',
        handler: ()=>
        {
          this.shoppingListService.removeAll();
        }
        },
          {
          text: 'cancel',
          role: 'cancel'
          }]
        });
        alert.present();
        this.navCtrl.popToRoot();
  }
}
