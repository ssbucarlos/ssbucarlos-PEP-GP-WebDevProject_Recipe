
export class Chef {
    /**
     * 
     * @param {number} id 
     * @param {string} username 
     * @param {string} password 
     * @param {string} email 
     * @param {boolean} isAdmin 
     */
    constructor(id, username, password, email, isAdmin){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.isAdmin = isAdmin;
    }
}