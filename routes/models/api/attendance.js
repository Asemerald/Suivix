/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */
const RequestManager = require('../../../classes/managers/RequestManager');

module.exports = async (req, res) => {
    const manager = new RequestManager();
    const request = await manager.getRequest(req.session.passport.user.attendance_request);
    if (!request) {
        res.status(404).json("Request does not exists")
    } else {
        const statement = await request.doAttendance(req.query.channels, req.query.roles, req.query.timezone, req.cookies["language"]);
        if (statement.success) req.session.passport.user.attendance_request = manager.deleteRequest(req.session.passport.user.attendance_request);
        res.status(200).send(statement);
    }
}