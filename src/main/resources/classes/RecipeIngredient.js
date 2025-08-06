
export class RecipeIngredient{
    /**
     * 
     * @param {number} id 
     * @param {string} name 
     * @param {number} volume 
     * @param {string} unit 
     */
    constructor(id, name, volume, unit){
        this.id = id;
        this.name = name;
        this.volume = volume;
        this.unit = unit;
    }
}