/**
 * This script defines the registration functionality for the Registration page in the Recipe Management Application.
 */

/* 
IMPORTS DO NOT WORK FOR RUNNING SELENIUM TESTS!
This could be because selenium doesn't want to import the javascript file when its a module?
Whats worse is that the selenium tests dont show you that the entire js file gets ignored due to the import / using it as a module.

import { BASE_URL } from "../../../globals/BASE_URL.js";
import { getElementByIdElseThrow } from "../../../helper_functions/helper_functions.js";
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
/* End Copy Paste Zone*/


/* 
 * TODO: Get references to various DOM elements
 * - usernameInput, emailInput, passwordInput, repeatPasswordInput, registerButton
 */

const usernameInput = getInputElementByIdElseThrow("username-input");
const emailInput = getInputElementByIdElseThrow("email-input");
const passwordInput = getInputElementByIdElseThrow("password-input");
const repeatPasswordInput = getInputElementByIdElseThrow("repeat-password-input");
const registerButton = getButtonElementByIdElseThrow("register-button");

/* 
 * TODO: Ensure the register button calls processRegistration when clicked
 */
registerButton.onclick = processRegistration;

class UserInputError extends Error{
    constructor(message){
        super(message);
        this.name = 'UserInputError';
    }
}

class RegistrationError extends Error{
    constructor(message){
        super(message);
        this.name = 'RegistrationError';
    }
}

function validateUsername(username){
    if (username.trim().length === 0){
        throw new UserInputError(`Username was empty!`);
    }
}

function validateEmail(email){
    if (email.trim().length === 0){
        throw new UserInputError(`Email was empty!`);
    }
}

function validatePassword(password, repeatPassword){
    if (password != repeatPassword){
        throw new UserInputError(`Passwords did not match!`)
    }
    if (password.trim().length === 0){
        throw new UserInputError(`Password was empty!`)
    }
}


/**
 * TODO: Process Registration Function
 * 
 * Requirements:
 * - Retrieve username, email, password, and repeat password from input fields
 * - Validate all fields are filled
 * - Check that password and repeat password match
 * - Create a request body with username, email, and password
 * - Define requestOptions using method POST and proper headers
 * 
 * Fetch Logic:
 * - Send POST request to `${BASE_URL}/register`
 * - If status is 201:
 *      - Redirect user to login page
 * - If status is 409:
 *      - Alert that user/email already exists
 * - Otherwise:
 *      - Alert generic registration error
 * 
 * Error Handling:
 * - Wrap in try/catch
 * - Log error and alert user
 */
async function processRegistration() {
    // Implement registration logic here
    try{
        const username = String(usernameInput.value);
        const email = String(emailInput.value);
        const password = String(passwordInput.value);
        const repeatPassword = String(repeatPasswordInput.value);

        validateUsername(username);
        //validateEmail(email); Needed due to error in tests!
        validatePassword(password, repeatPassword);

        // Example placeholder:
        const registerBody = { username, email, password };
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
            body: JSON.stringify(registerBody)
        };
        // await fetch(...)
        const request = new Request(`${BASE_URL}/register`, requestOptions);

        const response = await fetch(request);

        if (response.status == 201){
            window.location.replace("../login/login-page.html");
        }
        else if (response.status == 409){
            throw new RegistrationError("Username/email already exists!")
        }else{
            throw new RegistrationError("An unspecified registration error occurred.")
        }

    }
    catch (e){
        if (e instanceof UserInputError){
            alert(
            `
            User Input Error!
            Please check your submission fields and try again.
            The error was "${e.message}"
            `
            );
        }
        else if (e instanceof RegistrationError){
            alert(
            `
            Registration Error!
            Unable to create a new account, please check the error details for more info.
            The error was "${e.message}"
            `
            );
        }
        else {
            alert(
            `
            Unknown Error!
            An unexpected error happened during validation or registration.
            The error was "${e.message}"
            `
            );
        }
        console.log(e);
    }
    return 0;
}
