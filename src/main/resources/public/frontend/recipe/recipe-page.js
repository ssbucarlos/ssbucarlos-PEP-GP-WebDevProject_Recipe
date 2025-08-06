/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

/* Copy Paste Zone */
//const BASE_URL = "https://8081-ssbucarlos-ssbucarlospe-2rsd73akmiw.ws-us120.gitpod.io"; //Web Testing
const BASE_URL = "http://localhost:8081"; // backend URL, for running project tests
class Recipe{
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
/**
 * 
 * @param {string} id 
 * @returns {HTMLElement}
 * @throws {ReferenceError} If the element was not found
 */
const getElementByIdElseThrow = (id) => {
    const e = document.getElementById(id);
    if (e === null){
        throw new ReferenceError(`Element of id='${id}' was null!`)
    }
    return e;
}

/**
 * 
 * @param {string} id 
 * @return {HTMLAnchorElement}
 * @throws {ReferenceError | TypeError} If element not found | Element was wrong type
 */
const getAnchorElementByIdElseThrow = (id) => {
    const element = getElementByIdElseThrow(id);
    if (!(element instanceof HTMLAnchorElement)){
        throw new TypeError(`Found element was not HTMLAnchorElement, it was ${typeof(element)}`)
    }
    return element;
    //return /** @type {HTMLAnchorElement}*/(getElementByIdElseThrow(id));
}

/**
 * 
 * @param {string} id 
 * @returns {HTMLButtonElement}
 * @throws {ReferenceError | TypeError} If element not found | Element was wrong type
 */
const getButtonElementByIdElseThrow = (id) => {
    const element = getElementByIdElseThrow(id);
    if (!(element instanceof HTMLButtonElement)){
        throw new TypeError(`Found element was not HTMLButtonElement, it was ${typeof(element)}`)
    }
    return element;
    //return /** @type {HTMLButtonElement} */(getElementByIdElseThrow(id));
}

/**
 * 
 * @param {string} id
 * @returns {HTMLUListElement}
 * @throws {ReferenceError | TypeError} If element not found | Element was wrong type 
 */
const getUListElementByIdElseThrow = (id) => {
    const element = getElementByIdElseThrow(id);
    if (!(element instanceof HTMLUListElement)){
        throw new TypeError(`Found element was not HTMLUListElement, it was ${typeof(element)}`)
    }
    return element;
    //return /** @type {HTMLUListElement} */(getElementByIdElseThrow(id));
}

/**
 * 
 * @param {string} id
 * @returns {HTMLInputElement}
 * @throws {ReferenceError | TypeError} If element not found | Element was wrong type 
 */
const getInputElementByIdElseThrow = (id) => {
    const element = getElementByIdElseThrow(id);
    if (!(element instanceof HTMLInputElement)){
        throw new TypeError(`Found element was not HTMLInputElement, it was ${typeof(element)}`)
    }
    return element;
    //return /** @type {HTMLInputElement} */(getElementByIdElseThrow(id));
}

/**
 * 
 * @param {string} id
 * @returns {HTMLTextAreaElement}
 * @throws {ReferenceError | TypeError} If element not found | Element was wrong type 
 */
const getTextAreaElementByIdElseThrow = (id) => {
    const element = getElementByIdElseThrow(id);
    if (!(element instanceof HTMLTextAreaElement)){
        throw new TypeError(`Found element was not HTMLTextAreaElement, it was ${typeof(element)}`)
    }
    return element;
    //return /** @type {HTMLTextAreaElement} */(getElementByIdElseThrow(id));
}
/* /Copy Paste Zone*/

/**
 * RECIPE OBJECT FORMAT
 * "id": Number
 * "name": String
 * "instructions": String
 * "author": Author
 * "ingredients": Array<Ingredient>
 * @type {Array<Recipe>}  
 */
let recipes = [];

/**
 * 
 * @param {string} name 
 * @returns {Recipe | null}
 */
const getRecipeByName = (name) => {
    for (const recipe of recipes){
        if (recipe.name === name){
            return recipe;
        }
    }
    return null;
}

// Wait for DOM to fully load before accessing elements
window.addEventListener("DOMContentLoaded", () => {

    /* 
     * TODO: Get references to various DOM elements
     * - Recipe name and instructions fields (add, update, delete)
     * - Recipe list container
     * - Admin link and logout button
     * - Search input
    */
    
    const adminLink = getAnchorElementByIdElseThrow("admin-link");
    const logoutButton = getButtonElementByIdElseThrow("logout-button"); 
    const searchRecipeInput = getInputElementByIdElseThrow("search-input");
    const searchRecipeButton = getButtonElementByIdElseThrow("search-button");
    const recipeList = getUListElementByIdElseThrow("recipe-list");
    const addRecipeNameInput = getInputElementByIdElseThrow("add-recipe-name-input");
    const addRecipeInstructionsInput = getTextAreaElementByIdElseThrow("add-recipe-instructions-input");
    const addRecipeButton = getButtonElementByIdElseThrow("add-recipe-submit-input");
    const updateRecipeNameInput = getInputElementByIdElseThrow("update-recipe-name-input");
    const updateRecipeInstructionsInput = getTextAreaElementByIdElseThrow("update-recipe-instructions-input");
    const updateRecipeButton = getButtonElementByIdElseThrow("update-recipe-submit-input");
    const deleteRecipeNameInput = getInputElementByIdElseThrow("delete-recipe-name-input");
    const deleteRecipeButton = getButtonElementByIdElseThrow("delete-recipe-submit-input");
    
    /*
     * TODO: Show logout button if auth-token exists in sessionStorage
     */
    const authToken = sessionStorage.getItem("auth-token");
    if (authToken !== null){
        logoutButton.hidden = false;
    }
    
    /*
     * TODO: Show admin link if is-admin flag in sessionStorage is "true"
     */
    const isAdmin = sessionStorage.getItem("is-admin");
    if (isAdmin === "true"){
        adminLink.hidden = false;
    }

    /*
     * TODO: Attach event handlers
     * - Add recipe button → addRecipe()
     * - Update recipe button → updateRecipe()
     * - Delete recipe button → deleteRecipe()
     * - Search button → searchRecipes()
     * - Logout button → processLogout()
     */
    addRecipeButton.onclick = addRecipe;
    updateRecipeButton.onclick = updateRecipe;
    deleteRecipeButton.onclick = deleteRecipe;
    searchRecipeButton.onclick = searchRecipes;
    logoutButton.onclick = processLogout;
    
    /*
     * TODO: On page load, call getRecipes() to populate the list
     */
    getRecipes();

    /**
     * TODO: Search Recipes Function
     * - Read search term from input field
     * - Send GET request with name query param
     * - Update the recipe list using refreshRecipeList()
     * - Handle fetch errors and alert user
     */
    async function searchRecipes() {
        // Implement search logic here
        // Read search term from input field
        const searchTerm = searchRecipeInput.value;
        // Send GET request with name query param
        try{
            const params = new URLSearchParams({
                "name": searchTerm,
            })
            const response = await fetch(`${BASE_URL}/recipes?${params.toString()}`, {headers:{"Authorization": `Bearer ${authToken}`}});
            recipes = await response.json();
            
            // Update the recipe list using refreshRecipeList()
            refreshRecipeList();
        }catch(e){
            // Handle fetch errors and alert user
            alert(`An error occured while searching, error="${e.message}"`);
        }
    }

    /**
     * TODO: Add Recipe Function
     * - Get values from add form inputs
     * - Validate both name and instructions
     * - Send POST request to /recipes
     * - Use Bearer token from sessionStorage
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function addRecipe() {
        // Implement add logic here
        const newRecipeName = addRecipeNameInput.value;
        const newRecipeInstructions = addRecipeInstructionsInput.value;
        // Validate both name and instruction
        for (const s of [newRecipeName, newRecipeInstructions]){
            if (s.trim().length === 0){
                throw new Error(`Empty input detected, can't add recipe!`);
            }
        }
        // Send POST request to /recipes
        const newRecipe = new Recipe(null, newRecipeName, newRecipeInstructions, null, null);
        /** @type {RequestInit} */
        const requestOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Authorization": `Bearer ${authToken}`, // I only knew this from checking out the RecipeController (it was in the Readme oops)
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(newRecipe),
        }
        fetch(`${BASE_URL}/recipes`, requestOptions)
            .then(_response => {
                // On Success: clear inputs, fetch latest recipes, refresh the list
                addRecipeNameInput.value = "";
                addRecipeInstructionsInput.value = "";
                getRecipes();
            })
            .catch(e => {
                throw new Error("An error occured while adding the new recipe to the db");
            }); 
    }

    /**
     * TODO: Update Recipe Function
     * - Get values from update form inputs
     * - Validate both name and updated instructions
     * - Fetch current recipes to locate the recipe by name
     * - Send PUT request to update it by ID
     * - On success: clear inputs, fetch latest recipes, refresh the list
     */
    async function updateRecipe() {
        // Implement update logic here
        const existingRecipeName = updateRecipeNameInput.value;
        const newRecipeInstructions = updateRecipeInstructionsInput.value;

        // Validate recipe name/instruction inputs
        if (existingRecipeName.trim().length === 0){
            console.log("Can't update, recipe name is empty");
            alert("Can't update, recipe name is empty");
            throw new Error("Can't update, recipe name is empty");
        }
        if (newRecipeInstructions.trim().length === 0){
            console.log("Can't update, recipe instructions is empty");
            alert("Can't update, recipe instructions is empty");
            throw new Error("Can't update, recipe instructions is empty");
        }


        // Update Recipe List
        const fetchRecipesUrl = `${BASE_URL}/recipes`;
        const fetchRecipesResponse = await fetch(fetchRecipesUrl, {headers:{"Authorization": `Bearer ${authToken}`}});
        recipes = await fetchRecipesResponse.json();

        // Verify recipe in list
        let recipeToUpdate = getRecipeByName(existingRecipeName);
        if (recipeToUpdate === null){
            console.log("Can't update, no matching recipe was found.");
            alert("Can't update, no matching recipe was found.");
            throw new Error("Can't update, no matching recipe was found.");
        }

        // Update recipe object (locally)

        //recipeToUpdate.updateInstructions(newInstructions);
        recipeToUpdate.instructions = newRecipeInstructions;
        // Send PUT request to send updated object to backend
        const recipeId = Number(recipeToUpdate.id);
        
        /** @type {RequestInit}*/
        const requestOptions = {
            method: "PUT",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Authorization": `Bearer ${authToken}`
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(recipeToUpdate),
        }
        const updateUrl = `${BASE_URL}/recipes/${recipeId}`;
        try{
            await fetch(updateUrl, requestOptions);
        }
        catch (e){
            console.log("Can't update, an error occured during the PUT update.");
            alert("An unexpected error occured while updating! Please try again");
            throw e;
        }
        
        updateRecipeNameInput.value = "";
        updateRecipeInstructionsInput.value = "";

        try {
            await getRecipes();
        } catch (e){
            console.log("The update was succesful, however an unexpected error occured while attempting to get the refreshed list of recipes.");
            alert("The update was succesful, however an unexpected error occured while attempting to get the refreshed list of recipes.");
            throw e;
        }
    }

    /**
     * TODO: Delete Recipe Function
     * - Get recipe name from delete input
     * - Find matching recipe in list to get its ID
     * - Send DELETE request using recipe ID
     * - On success: refresh the list
     */
    
    async function deleteRecipe() {
        // Implement delete logic here
        const recipeName = String(deleteRecipeNameInput.value);
        const recipe = getRecipeByName(recipeName);
        
        if (recipe === null){
            console.log("No matching recipe was found, so can't delete!");
            alert("No matching recipe was found, so can't delete!");
            throw new Error("No matching recipe was found, so can't delete!");
        }
 
        const recipeId = Number(recipe.id);
        /**@type {RequestInit} */
        const requestOptions = {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Authorization": `Bearer ${authToken}`,
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            
        }
        const url = `${BASE_URL}/recipes/${recipeId}`;
        try{
            const response = await fetch(url, requestOptions);
            if (response.status === 401){
                throw new Error("Invalid Permissions to Delete A Recipe")
            }
            const index = recipes.findIndex(r => r.id === recipeId);
            recipes.splice(index, 1);
            refreshRecipeList();
        }
        catch(e){
            console.log(`Error trying to delete a recipe, error=${e}`);
            alert(`
                An unexpected error occured trying to delete the recipe.
                Please try again.
                Error Details: ${e.message}`);
        }

    }

    /**
     * TODO: Get Recipes Function
     * - Fetch all recipes from backend
     * - Store in recipes array
     * - Call refreshRecipeList() to display
     */
    async function getRecipes() {
        // Implement get logic here
        // GET path is at /recipes
        const url = `${BASE_URL}/recipes`;
        const response = await fetch(url, {headers: {"Authorization": `Bearer ${authToken}`}});
        recipes = await response.json();
        //recipes = await (await fetch(url)).json(); // Forbidden one-liner???
        refreshRecipeList();
        return 0;
    }

    /**
     * TODO: Refresh Recipe List Function
     * - Clear current list in DOM
     * - Create <li> elements for each recipe with name + instructions
     * - Append to list container
     */
    function refreshRecipeList() {
        // Implement refresh logic here
        // Clear current list in DOM
        while (recipeList.firstElementChild){
            recipeList.firstElementChild.remove();
        }

        for (const recipe of recipes){
            const newListItem = document.createElement("li");
            newListItem.textContent = `Here is how to make "${recipe.name}":
                                       "${recipe.instructions}"`;
            recipeList.appendChild(newListItem);
        }
        
    }

    /**
     * TODO: Logout Function
     * - Send POST request to /logout
     * - Use Bearer token from sessionStorage
     * - On success: clear sessionStorage and redirect to login
     * - On failure: alert the user
     */
    async function processLogout() {
        // Implement logout logic here
        /** @type {RequestInit} */
        const requestOptions = {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "*",
                "Authorization": `Bearer ${authToken}`
            },
            redirect: "follow",
            referrerPolicy: "no-referrer",
            body: JSON.stringify(authToken),
        }
        const request = new Request(`${BASE_URL}/logout`, requestOptions);
        fetch(request)
            .then(_response => {
                sessionStorage.clear();
                window.location.href=`../login/login-page.html`;
            })
            .catch(e => {
                console.log(`An error occurred trying to logout, error=${e}`);
                alert(`An unexpected error occured trying to logout!
                    Please try again.
                    Error Details: ${e.message}`);
            });
    }

});
