const Routes = require("../../config/Routes"),
    Server = require('../../utils/Server');

module.exports = (req, res) => {
    res.sendFile(Server.getViewsFile(req, res, Routes.CONTACT_PAGE, "/", req.query.language ? req.query.language : undefined));
};