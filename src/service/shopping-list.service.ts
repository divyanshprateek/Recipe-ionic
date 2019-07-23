import { Ingrident } from "../models/ingrident.model";
import { Injectable } from "@angular/core";
import { Http,Response } from "@angular/http";
import { AuthService } from "./auth.service";
import 'rxjs/Rx';
@Injectable()
export class ShoppingListService {
    private ingridents: Ingrident[] = [];
constructor(private http: Http, private authService: AuthService){}
    addItem(name: string, amount:number)
    {
        if(name !== null && amount != null)
        this.ingridents.push(new Ingrident(name,amount));
        console.log(this.ingridents);
    }

    addItems(items: Ingrident[])
    {
        this.ingridents.push(...items);
    }

    getItems()
    {
        return this.ingridents.slice();
    }

    remove(index: number)
    {
        this.ingridents.splice(index,1);
    }

    removeAll()
    {
        this.ingridents.splice(0,this.ingridents.length);
    }

    storeList(token: string)
    {
      const userId =  this.authService.getActiveUser().uid;
      return this.http.put('https://ionic3-recipe-book-app.firebaseio.com/'+userId+'/shopping-list.json?auth='+token,
      this.ingridents).map((response: Response)=>{
          return response.json();
      });
    }

    fetchList(token: string)
    {
      const userId =  this.authService.getActiveUser().uid;
      return this.http.get('https://ionic3-recipe-book-app.firebaseio.com/'+userId+'/shopping-list.json?auth='+token).map((response: Response)=>{
          return response.json();
      }).do((ingridents: Ingrident[])=>{
            if(ingridents)
            {
                this.ingridents = ingridents;
            }
            else {
                this.ingridents = [];
            }          
      });
    }
}