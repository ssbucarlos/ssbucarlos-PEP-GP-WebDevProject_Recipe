/**
 * This script handles the login functionality for the Recipe Management Application.
 * It manages user authentication by sending login requests to the server and handling responses.
*/

/* 
//import { BASE_URL } from "../../../globals/BASE_URL.js";
//const BASE_URL = "http://localhost:8081"; // backend URL
import { 
    getAnchorElementByIdElseThrow, 
    getButtonElementByIdElseThrow, 
    getInputElementByIdElseThrow, 
    getTextAreaElementByIdElseThrow, 
    getUListElementByIdElseThrow } from "../../../helper_functions/helper_functions.js";
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
 * TODO: Get references to DOM elements
 * - username input
 * - password input
 * - login button
 * - logout button (optional, for token testing)
 */

const usernameInput = getInputElementByIdElseThrow("login-input");
const passwordInput = getInputElementByIdElseThrow("password-input");
const loginButton   = getButtonElementByIdElseThrow("login-button");
const logoutButton  = getButtonElementByIdElseThrow("logout-button");


/* 
 * TODO: Add click event listener to login button
 * - Call processLogin on click
 */
loginButton.onclick = processLogin;

class UserInputError extends Error{
    constructor(message){
        super(message);
        this.name = 'UserInputError';
    }
}

const validateUsername = (username) => {
    if (username.trim().length === 0){
        throw new UserInputError("The username was empty!");
    }
} 

const validatePassword = (password) => {
    if (password.trim().length === 0){
        throw new UserInputError("The password was empty!");
    }
}

/**
 * TODO: Process Login Function
 * 
 * Requirements:
 * - Retrieve values from username and password input fields
 * - Construct a request body with { username, password }
 * - Configure request options for fetch (POST, JSON headers)
 * - Send request to /login endpoint
 * - Handle responses:
 *    - If 200: extract token and isAdmin from response text
 *      - Store both in sessionStorage
 *      - Redirect to recipe-page.html
 *    - If 401: alert user about incorrect login
 *    - For others: show generic alert
 * - Add try/catch to handle fetch/network errors
 * 
 * Hints:
 * - Use fetch with POST method and JSON body
 * - Use sessionStorage.setItem("key", value) to store auth token and admin flag
 * - Use `window.location.href` for redirection
 */
async function processLogin() {
    // TODO: Retrieve username and password from input fields
    // - Trim input and validate that neither is empty
    const username = usernameInput.value;
    const password = passwordInput.value;
    try{
        validateUsername(username);
        validatePassword(password);
    } catch (e){
        console.log(`User input error! The error is ${e}.`);
        alert(
            `
            Input error!
            Please check your input and try again.
            Error details: "${e.message}"
            `
        );
        throw (e);
    }
    // TODO: Create a requestBody object with username and password
    const requestBody = {username, password};
    /** @type {RequestInit} */
    const requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(requestBody)
    };
    
    try {
        // TODO: Send POST request to http://localhost:8081/login using fetch with requestOptions
        const request = new Request(`${BASE_URL}/login`, requestOptions);
        const response = await fetch(request);
        
        if (response.status === 200){
            // TODO: If response status is 200
            // - Read the response as text
            // - Response will be a space-separated string: "token123 true"
            // - Split the string into token and isAdmin flag
            // - Store both in sessionStorage using sessionStorage.setItem()
            const responseText = await response.text();
            const [token, isAdmin] = responseText.split(" ");
            
            sessionStorage.setItem("auth-token", token);
            sessionStorage.setItem("is-admin", isAdmin);
            // TODO: Optionally show the logout button if applicable    
            logoutButton.hidden = false;
            // TODO: Add a small delay (e.g., 500ms) using setTimeout before redirecting
            // - Use window.location.href to redirect to the recipe page
            setTimeout(()=>{window.location.href = `../recipe/recipe-page.html`;}, 500);
            
        } else if (response.status === 401){
            // TODO: If response status is 401
            // - Alert the user with "Incorrect login!"
            alert(`Incorrect login!`);
        } else{
            // TODO: For any other status code
            // - Alert the user with a generic error like "Unknown issue!"
            alert(`Unknown issue!`);
        }
    } catch (e) {
        // TODO: Handle any network or unexpected errors
        // - Log the error and alert the user
        console.log(`An unexpected error occured "${e}"`);
        alert(
            `
            An unexpected error occurred, please try again.
            Error details: "${e.message}"
            `);
        throw(e);
    }
    return 0;
}

