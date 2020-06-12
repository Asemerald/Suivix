/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */
var package = require('../../../package.json');

module.exports = (req, res) => {
    res.send(`{
        "version": "${package.version}",
        "en": "<strong>• Added the support for multi-roles and multi-channels attendance.</strong><br><br>If you encounter a bug, or you think something is broken, please contact me on Discord:<br><br>MΛX#2231",
        "fr": "<strong>• Ajout d'une fonctionnalité de multi-suivi</strong><br>- Vous pouvez désormais sélectionner plusieurs roles et salons lors de votre appel.<br><br>Si vous rencontrez un bug, ou pensez que quelque chose ne marche pas bien, merci de me contacter sur Discord :<br><br>MΛX#2231"
    }`);
};