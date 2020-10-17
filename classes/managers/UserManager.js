/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */

/**
 * Represents a UserManager
 * @param {*} client - The bot client
 * @param {*} sequelize - The database
 */
class UserManager {

    /**
     * Fetch an user from database
     * @param {*} request - The request 
     */
    async getUserById(id, language = "en", addUser = true) {
        let [dbUser] = await sequelize.query(`SELECT * FROM users WHERE id = "${id}"`);
        if(!dbUser[0] && addUser) [dbUser] = await this.createUser(id, language);
        return dbUser[0];
    }

    /**
     * Fetch the user account type
     */
    async getUserAccountType(id, language, addUser = false) {
        const user = await this.getUserById(id, undefined, addUser);
        const type = user ? user.account_type : 1;
        const userLanguage = language ? language : 'en';
        if(type === 1) {
            return {type: 1, name: Text.global.translations[userLanguage].account_types["1"].name, color: '#7289DA'}
        } else if (type === 2) {
            return {type: 2, name: Text.global.translations[userLanguage].account_types["2"].name, color: '#00e394'}
        } else if (type === 3) {
            return {type: 3, name: Text.global.translations[userLanguage].account_types["3"].name, color: '#fcba03'}
        }
    }

    /** 
     * Change user param in database
     * @param {} id - The user id
     * @param {} language - The user language
     */
    async changeUserParam(id, param, value) {
        await sequelize.query(`UPDATE users SET ${param} = "${value}" WHERE id = "${id}"`);
        console.log(id.yellow + " changed ".blue + param.yellow + " option to ".blue + value.yellow + ".".blue + separator);
    }

    /** 
     * Create a new user in database
     * @param {} id - The user id
     * @param {} language - The user language
     */
    async createUser(id, language) {
        console.log("A new user has been created in database : ".blue + id.yellow + ".".blue + separator);
        await sequelize.query(`INSERT INTO users (id, language) VALUES ("${id}", "${language}")`);
        return await sequelize.query(`SELECT * FROM users WHERE id = "${id}"`);
    }

}

module.exports = UserManager;