/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */
const Auth = require('../../../auth/DiscordOauth'),
    RequestManager = require('../../../classes/managers/RequestManager');

module.exports = async (req, res) => {
    if (!req.get("Access_token")) { //Check if there is an acess_token
        res.status(401).send("Unauthorized"); //Send the response status
        return;
    }
    const manager = new RequestManager();
    const user = await Auth.getUserByAccessToken(res, req.get("Access_token")); //Fetch the user with the header "Access_token"
    if (!user.id) { //Check if there is an user and an attendance request
        res.status(404).json({
            error: "Unknown User"
        })
        return;
    }
    const request = await manager.getRequestByAuthorID(user.id); //Fetch the attendance request with the user id
    if (!request) { //Check if there is an user and an attendance request
        res.send(user);
        return;
    }
    res.send(Object.assign(user, {
        requestID: request.getId()
    }));
};