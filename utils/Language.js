/*
 * Copyright (c) 2020, MΛX! Inc.  All rights reserved.
 * Copyrights licensed under the GNU General Public License v3.0.
 * See the accompanying LICENSE file for terms.
 */
const Parser = require("./Parser");

const supportedLanguages = ["en", "en_US", "fr-Fr", "fr"];
const defaultLanguage = "fr-FR";
/**
 * Detect the browser language of the user
 * @param {*} req - The http request
 */
function detectUserLanguage(req, res) {
    let language = req.locale.toLowerCase().includes("fr") ? "fr" : "en";
    saveUserLanguage(res, language);
    return language; //Check if the language is french. If not, returns english.
}

/**
 * Store the selected language into a cookie
 * @param {*} res - The http response to send
 * @param {*} language - The choosen language
 */
function saveUserLanguage(res, language) {
    Parser.createCookie(res, "language", language); //Create or update the cookie
}

/**
 * Get the user language stored in the cookie language
 * @param {*} req - The http request
 */
const getUserLanguage = function (req, res) {
    const cookie = req.cookies["language"]; //Fetch the language cookie
    return cookie === undefined ? detectUserLanguage(req, res) : cookie;
}

/**
 * Change the user language
 * @param {*} reaction - The reaction which defines the new language
 * @param {*} user - The user who trigerred the event
 */
async function handleLanguageChange(reaction, user) {
if (reaction.emoji.name !== "🇫🇷" && reaction.emoji.name !== "🇬🇧") return;
  var react = reaction.emoji.name === "🇫🇷" ? "fr" : "en";
  let [dbUser] = await sequelize.query(
    `SELECT * FROM users WHERE id = ${user.id}`,
    {
      raw: true,
    }
  );
  if (!dbUser[0]) {
    sequelize.query(
      `INSERT INTO users (id, language) VALUES ("${user.id}", "${react}")`
    );
  } else {
    if (dbUser[0].language === react) return;
    sequelize.query(
      `UPDATE users SET language = "${react}" WHERE id = "${user.id}"`
    );
  }
  await sendChangedLanguageMessage(
    reaction.message.channel,
    react,
    user
  );
  
}

  /**
   * Send the changed language alert
   * @param {*} channel - The text channel were the action happened
   * @param {*} language - The new language
   * @param {*} user - The user
   */
  async function sendChangedLanguageMessage(channel, language, user) {
    let sentences = [
      ":flag_fr: | {username}, `Suivix` vous parlera désormais en **français**.",
      ":flag_gb: | {username}, `Suivix` will now talk to you in **english**.",
    ];
    let msg = await channel.send(
      sentences[language === "fr" ? 0 : 1].formatUnicorn({
        username: user.username,
      })
    );
    msg.delete({
      timeout: 20000,
    });
    console.log('{username}#{discriminator}'.formatUnicorn({username: user.username, discriminator: user.discriminator}).yellow + " changed language option to ".blue + language.yellow + ".".blue + separator);
  }

module.exports = {
    detectUserLanguage,
    saveUserLanguage,
    getUserLanguage,
    supportedLanguages,
    defaultLanguage,
    handleLanguageChange,
    sendChangedLanguageMessage
}