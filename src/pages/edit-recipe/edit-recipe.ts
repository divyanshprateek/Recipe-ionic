import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, ToastController } from 'ionic-angular';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { RecipeService } from '../../service/recipe.service';
import { ValueTransformer } from '@angular/compiler/src/util';
import { Recipe } from '../../models/recipe.model';

/**
 * Generated class for the EditRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit{
mode = 'New';
recipe: Recipe;
index: number;
selectOptions = ['Easy','Medium','Hard'];
recipeForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private actionSheetCtrl: ActionSheetController,private alertCtrl: AlertController,
    private toastCtrl: ToastController,private recipeService: RecipeService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditRecipePage');
  }

  ngOnInit()
  {
    this.mode = this.navParams.get('mode');
    if(this.mode == 'Edit')
    {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initializeForm();    
  }

  onSubmit()
  {
    const value = this.recipeForm.value;
    console.log(value.description);
    let ingridents = [];
    if(value.ingridents.length > 0)
    {
      ingridents = value.ingridents.map(name => {
        return {name: name, amount: 1};
      });
    }
    if(this.mode == 'Edit')
    {
      this.recipeService.updateRecipe(this.index,value.title,value.description,value.difficulty,ingridents);
    }
    else{
      this.recipeService.addRecipe(value.title,value.description,value.difficulty,ingridents);
    }
    this.recipeForm.reset();
    this.navCtrl.popToRoot();
  }

  async onManageIngridents()
  {
     const actionSheet = await this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [{
        text: 'Add ingrident',
        icon: 'add',
        handler: ()=> {
          this.createNewIngridentAlert().present();
        }
      },
        {
          text: 'Remove All Ingridents',
          role: 'destructive',
          icon: 'trash',
          handler: ()=> {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingridents');
            const len = fArray.length;
            for(let i = len-1; i>=0; i--)
            {
              fArray.removeAt(i);
            }
            const toast = this.toastCtrl.create({
              message: "All ingridents were deleted",
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
        }
      ],
    });
    await actionSheet.present();
  }

  private createNewIngridentAlert()
  {
    return this.alertCtrl.create({
      title: 'Add Ingrident',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data=>{
            if(data.name.trim() == '' || data.name == null)
            {
              const toast = this.toastCtrl.create({
                message: "Please enter a valid value",
                duration: 1000,
                position: 'bottom'
              });
              toast.present();
              return;
            }
            (<FormArray>this.recipeForm.get('ingridents')).push(new FormControl(data.name,Validators.required));
            const toast = this.toastCtrl.create({
              message: "Item added!",
              duration: 1000,
              position: 'bottom'
            });
            toast.present();
          }
        }
      ]
    });
  }
  private initializeForm()
  {
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingridents = [];

    if(this.mode == 'Edit')
    {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      for(let i of this.recipe.ingridents)
      {
        ingridents.push(new FormControl(i.name,Validators.required));
      }
    }
    this.recipeForm = new FormGroup(
      {
        'title': new FormControl(title,Validators.required),
        'description': new FormControl(description,Validators.required),
        'difficulty': new FormControl(difficulty,Validators.required),
        'ingridents': new FormArray(ingridents)
      }
    );
  }
}
