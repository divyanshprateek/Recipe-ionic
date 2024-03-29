import { Component } from "@angular/core";
import { ViewCompileResult } from "@angular/compiler/src/view_compiler/view_compiler";
import { ViewController } from "ionic-angular";


@Component({
    selector: 'page-sl-options',
    template: `
    <ion-grid text-center>
    <ion-row>
    <ion-col>
    <h3>Store & Load</h3>
    </ion-col>
    </ion-row>
    <ion-row>
    <ion-col>
    <button ion-button outline (click) = "onAction('load')">Load List</button>
    </ion-col>
    </ion-row>
    <ion-row>
    <ion-col>
    <button ion-button outline (click) = "onAction('store')">Save List</button>
    </ion-col>
    </ion-row>
    </ion-grid>
    `
})
export class SlOptions {
constructor(private viewCtrl: ViewController){}
onAction(action)
{
    this.viewCtrl.dismiss({action: action});
}
}