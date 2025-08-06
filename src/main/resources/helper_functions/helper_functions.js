/**
 * 
 * @param {string} id 
 * @returns {HTMLElement}
 * @throws {ReferenceError} If the element was not found
 */
export const getElementByIdElseThrow = (id) => {
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
export const getAnchorElementByIdElseThrow = (id) => {
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
export const getButtonElementByIdElseThrow = (id) => {
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
export const getUListElementByIdElseThrow = (id) => {
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
export const getInputElementByIdElseThrow = (id) => {
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
export const getTextAreaElementByIdElseThrow = (id) => {
    const element = getElementByIdElseThrow(id);
    if (!(element instanceof HTMLTextAreaElement)){
        throw new TypeError(`Found element was not HTMLTextAreaElement, it was ${typeof(element)}`)
    }
    return element;
    //return /** @type {HTMLTextAreaElement} */(getElementByIdElseThrow(id));
}

