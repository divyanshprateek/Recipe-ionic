import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPageModule } from '../pages/signup/signup.module';
import { SignupPage } from '../pages/signup/signup';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  signinPage = SigninPage;
  signupPage = SignupPage;

  @ViewChild('nav') navCtrl:NavController;
  isAuthenticated: boolean = false;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController) {
      firebase.initializeApp({
        apiKey: "AIzaSyCz4uqIy-PBO4NFus27JXsE-i1ArmPR-Ns",
        authDomain: "ionic3-recipe-book-app.firebaseapp.com",
        databaseURL: "https://ionic3-recipe-book-app.firebaseio.com",
      });
      firebase.auth().onAuthStateChanged(user => {
        if(user)
        {
          this.isAuthenticated = true;
          this.rootPage = TabsPage;
        }
        else {
          this.isAuthenticated = false;
          this.rootPage = SigninPage;
        }
      });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any)
  {
    this.navCtrl.setRoot(page);
    this.menuCtrl.close();
  }
  onLogout() {
    firebase.auth().signOut();
    this.menuCtrl.close();
    this.navCtrl.setRoot(SigninPage);
  }
}

