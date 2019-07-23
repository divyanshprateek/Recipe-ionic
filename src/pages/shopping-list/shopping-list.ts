import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../service/shopping-list.service';
import { Ingrident } from '../../models/ingrident.model';
import { SlOptions } from './sl-options/sl-options';
import { AuthService } from '../../service/auth.service';

/**
 * Generated class for the ShoppingListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
listItems: Ingrident[];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private shopService: ShoppingListService,
    private popCtrl: PopoverController, private authServce: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShoppingListPage');
  }

  ionViewDidEnter()
  {
    this.listItems = this.shopService.getItems();
  }
  onAddItem(form: NgForm)
  {
    this.shopService.addItem(form.value.ingredientName,form.value.amount);
    form.reset();
    this.loadItems();
  }
  private loadItems()
  {
    this.listItems = this.shopService.getItems();
  }

  onCheckItem(index: number)
  {
    this.shopService.remove(index);
    this.loadItems();
  }
  onShowOptions(event: MouseEvent) 
  {
    const loading = this.loadingCtrl.create({
      content: 'Please Wait...'
    });
    const pop = this.popCtrl.create(SlOptions);
    pop.present({ev: event});
    pop.onDidDismiss(
      data =>{
        if(data.action == 'load')
        {
          loading.present();
          this.authServce.getActiveUser().getIdToken().then((token: string)=> {
            this.shopService.fetchList(token).subscribe((list: Ingrident[])=>{
              loading.dismiss();
              console.log(list);
              if(list)
              {
                this.listItems = list;
              }
              else {
                this.listItems = [];
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
            this.shopService.storeList(token).subscribe(()=>{
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
