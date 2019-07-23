import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { RecipesPage } from '../pages/recipes/recipes';
import { RecipePage } from '../pages/recipe/recipe';
import { EditRecipePage } from '../pages/edit-recipe/edit-recipe';
import { ShoppingListPage } from '../pages/shopping-list/shopping-list';
import { TabsPage } from '../pages/tabs/tabs';
import { ShoppingListService } from '../service/shopping-list.service';
import { RecipeService } from '../service/recipe.service';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { AuthService } from '../service/auth.service';
import { SlOptions } from '../pages/shopping-list/sl-options/sl-options';
import {HttpClientModule} from "@angular/common/http";
import { HttpModule, Http } from '@angular/http';
import { RecipeOptions } from '../pages/recipes/recipe-options/recipe-options';
@NgModule({
  declarations: [
    MyApp,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptions,
    RecipeOptions
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecipesPage,
    RecipePage,
    EditRecipePage,
    ShoppingListPage,
    TabsPage,
    SigninPage,
    SignupPage,
    SlOptions,
    RecipeOptions
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ShoppingListService,
    RecipeService,
    AuthService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
