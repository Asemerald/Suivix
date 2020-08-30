/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */
module.exports = async (req, res) => {
    let [usersQuery] = await sequelize.query(`SELECT count(*) AS users FROM users`, {
        raw: true
    });
    const dblGuild = client.guilds.cache.get("264445053596991498");
    res.send(`{
        "guilds": "${client.guilds.cache.size}",
        "users": "${usersQuery[0].users}",
        "students": "${client.users.cache.size - (dblGuild ? dblGuild.members.cache.size : 0)}"
    }`)
};