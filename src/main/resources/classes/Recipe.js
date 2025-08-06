
import {Chef} from "./Chef.js";
import { RecipeIngredient } from "./RecipeIngredient.js";

export class Recipe{
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {string} instructions 
     * @param {Chef} author 
     * @param {Array<RecipeIngredient>} ingredients 
     */
    constructor(id, name, instructions, author, ingredients){
        this.id = id;
        this.name = name;
        this.instructions = instructions;
        this.author = author;
        this.ingredients = ingredients;
    }

    updateInstructions(instructions){
        this.instructions = instructions;
    }
}