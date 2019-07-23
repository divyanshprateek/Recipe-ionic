import { Ingrident } from "./ingrident.model";

export class Recipe {
    constructor(public title: string,public description: string,public difficulty: string,
        public ingridents: Ingrident[]){}


}