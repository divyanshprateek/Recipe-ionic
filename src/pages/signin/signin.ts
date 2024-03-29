import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../service/auth.service';

/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private authService: AuthService, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninPage');
  }
  onSignin(form: NgForm)
  {
    const loading = this.loadingCtrl.create({
      content: 'Signing in!!'
    });
    loading.present();
    this.authService.signin(form.value.email,form.value.password).then((data)=>
    {
      loading.dismiss();
    }).catch((error)=>{
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Signin Failed!',
        message: error.message,
        buttons: ['OK']
      });
      alert.present();
    });
  }
}
