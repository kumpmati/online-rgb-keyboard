const fs = require('fs');
require('dotenv').config();

function config({
        name,
        display_name,
        event_name
    } = {
        name: "WS_RGB",
        display_name: "Websocket RGB",
        event_name: "WS_UPDATE"
    }) {
    const { ProgramData, STEELSERIES_CONFIG } = process.env;

    // read steelseries engine configuration file
    const steelseriesConfig = fs.readFileSync(`${ProgramData}/${STEELSERIES_CONFIG}`);

    // setup config variables
    const CONFIG = {
        GAME_NAME: name,
        DISPLAY_NAME: display_name,
        DEVELOPER: "Matias Kumpulainen",
        EVENT_NAME: event_name,
        BASE_URL: `http://${JSON.parse(steelseriesConfig).address}`
    };

    return CONFIG;
}

module.exports = config;