/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */
const RequestManager = require('../../../classes/managers/RequestManager');

module.exports = async (req, res) => {
    const manager = new RequestManager();
    const request = await manager.getRequestByID(req.get("RequestID"));
    if (!request) {
        res.status(404).json("Request does not exists")
    } else {
        res.json(request.getRoles());
    }
};