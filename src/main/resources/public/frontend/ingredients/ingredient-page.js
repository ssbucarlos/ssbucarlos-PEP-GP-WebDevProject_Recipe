/**
 * This script defines the add, view, and delete operations for Ingredient objects in the Recipe Management Application.
 */
/* Copy Paste Zone */
//const BASE_URL = "https://8081-ssbucarlos-ssbucarlospe-2rsd73akmiw.ws-us120.gitpod.io"; //Web Testing
const BASE_URL = "http://localhost:8081"; // backend URL, for running project tests

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

/* 
 * TODO: Get references to various DOM elements
 * - addIngredientNameInput
 * - deleteIngredientNameInput
 * - ingredientListContainer
 * - searchInput (optional for future use)
 * - adminLink (if visible conditionally)
 */
const backLink = getAnchorElementByIdElseThrow("back-link");
const ingredientList = getUListElementByIdElseThrow("ingredient-list");
const addIngredientNameInput = getInputElementByIdElseThrow("add-ingredient-name-input");
const addIngredientSubmitButton = getButtonElementByIdElseThrow("add-ingredient-submit-button");
const deleteIngredientNameInput = getInputElementByIdElseThrow("delete-ingredient-name-input");
const deleteIngredientSubmitButton = getButtonElementByIdElseThrow("delete-ingredient-submit-button");

/* 
 * TODO: Attach 'onclick' events to:
 * - "add-ingredient-submit-button" → addIngredient()
 * - "delete-ingredient-submit-button" → deleteIngredient()
 */
addIngredientSubmitButton.onclick = addIngredient;
deleteIngredientSubmitButton.onclick = deleteIngredient;

/*
 * TODO: Create an array to keep track of ingredients
 */
let ingredients = [];

/* 
 * TODO: On page load, call getIngredients()
 */
getIngredients();

/**
 * TODO: Add Ingredient Function
 * 
 * Requirements:
 * - Read and trim value from addIngredientNameInput
 * - Validate input is not empty
 * - Send POST request to /ingredients
 * - Include Authorization token from sessionStorage
 * - On success: clear input, call getIngredients() and refreshIngredientList()
 * - On failure: alert the user
 */
async function addIngredient() {
    // Implement add ingredient logic here
    const ingredientName = addIngredientNameInput.value.trim();
    if (ingredientName.length === 0){
        alert("Can't add ingredient, ingredient name is empty!");
        throw new Error("Can't add ingredient, ingredient name is empty!");
    }
    const ingredient = {
        name: ingredientName
    };
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Authorization": "Bearer " + sessionStorage.getItem("auth-token")
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(ingredient),
    };
    try{
        const response = await fetch(`${BASE_URL}/ingredients`, requestOptions);
        addIngredientNameInput.value = "";
        await getIngredients();
        refreshIngredientList();
    }catch (e){
        alert(`An error occurred adding the ingredient! error=${e.message}`);
    }
}


/**
 * TODO: Get Ingredients Function
 * 
 * Requirements:
 * - Fetch all ingredients from backend
 * - Store result in `ingredients` array
 * - Call refreshIngredientList() to display them
 * - On error: alert the user
 */
async function getIngredients() {
    // Implement get ingredients logic here
    try{
        // Fetch all ingredients from backend
        const response = await fetch(`${BASE_URL}/ingredients`, {headers: {"Authorization": "Bearer " + sessionStorage.getItem("auth-token")}});
        // Store result in `ingredients` array
        ingredients = await response.json();
        // Call refreshIngredientList() to display them
        refreshIngredientList();
    } catch (e){
        // On error: alert the user
        alert(`An error occurred getting the ingredients! error="${e.message}"`);
    }
}


/**
 * TODO: Delete Ingredient Function
 * 
 * Requirements:
 * - Read and trim value from deleteIngredientNameInput
 * - Search ingredientListContainer's <li> elements for matching name
 * - Determine ID based on index (or other backend logic)
 * - Send DELETE request to /ingredients/{id}
 * - On success: call getIngredients() and refreshIngredientList(), clear input
 * - On failure or not found: alert the user
 */
async function deleteIngredient() {
    // Implement delete ingredient logic here
    // Read and trim value from deleteIngredientNameInput
    const ingredientName = deleteIngredientNameInput.value.trim();
    if (ingredientName.length === 0){
        alert("The ingredient name was empty! Can't delete.");
        throw new Error("The ingredient name was empty! Can't delete.");
    }
    // Search ingredientListContainer's <li> elements for matching name
    let matched = false;
    for (const childListItem of ingredientList.childNodes){
        const childParagraph = childListItem.firstElementChild;
        if (childParagraph.textContent === ingredientName){
            matched = true;
        }
    }
    if (!matched){
        alert(`No ingredient of name "${ingredientName}" was found.`)
        throw new Error(`No ingredient of name "${ingredientName}" was found.`);
    }
    // Determine ID based on index (or other backend logic)
    let id = null;
    for (const ingredient of ingredients){
        if (ingredient.name === ingredientName){
            id = ingredient.id;
        }
    }
    // Send DELETE request to /ingredients/{id}
    const requestOptions = {
        method: "DELETE",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*",
            "Authorization": `Bearer ${sessionStorage.getItem("auth-token")}`,
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
    }
    try{
        // On success: call getIngredients() and refreshIngredientList(), clear input
        const response = await fetch(`${BASE_URL}/ingredients/${id}`, requestOptions);
        if (response.status === 401){
            throw new Error("Invalid Permissions to delete an Ingredient.");
        }
        await getIngredients();
        refreshIngredientList();
        deleteIngredientNameInput.value = "";
    } catch (e){
        // On failure or not found: alert the user
        alert(`
            An error occurred deleting the ingredient from the server!
            error details: "${e.message}"`);
        throw new Error(`An error occurred deleting the ingredient from the server, error details=${e.message}`);
    }
    
   
}


/**
 * TODO: Refresh Ingredient List Function
 * 
 * Requirements:
 * - Clear ingredientListContainer
 * - Loop through `ingredients` array
 * - For each ingredient:
 *   - Create <li> and inner <p> with ingredient name
 *   - Append to container
 */
function refreshIngredientList() {
    // Implement ingredient list rendering logic here
    // Clear ingredientListContainer
    while (ingredientList.firstElementChild){
        ingredientList.firstElementChild.remove();
    }
    // Loop through `ingredients` array
    for (const ingredient of ingredients){
        // For each ingredient:
        //  Create <li> and inner <p> with ingredient name
        const newListItem = document.createElement("li");
        const newParagraph = document.createElement("P");
        newParagraph.innerText = ingredient.name;
        newListItem.appendChild(newParagraph);
        //  Append to container
        ingredientList.appendChild(newListItem);
    }
    
}
