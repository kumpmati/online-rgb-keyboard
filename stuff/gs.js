const axios = require('axios').default;
const { createBitmap, hexToRgb } = require('./bitmap');

let CONFIG = null;
let bitmap = createBitmap([252, 198, 3]);

// sets the internal config file
function setConfig(cfg) {
    CONFIG = cfg;
    return cfg;
}

// sends a post request with the given data
// to a specific endpoint at the base url
async function post({endpoint, data}) {
    const response = await axios({
        method: "POST",
        url: `${CONFIG.BASE_URL}/${endpoint}`,
        data: data
    });

    return response.data;
};

// registers game to steelseries engine
function registerGame() {
    return post({
        endpoint: 'game_metadata',
        data: {
            game: CONFIG.GAME_NAME,
            game_display_name: CONFIG.DISPLAY_NAME,
            developer: CONFIG.DEVELOPER
        }
    });
}

// binds event to game with the proper handler and settings
function bindEvent() {
    return post({
        endpoint: 'bind_game_event',
        data: {
            game: CONFIG.GAME_NAME,
            event: CONFIG.EVENT_NAME,
            value_optional: true,
            handlers: [
                {
                    "device-type": "rgb-per-key-zones",
                    mode: "bitmap",
                    zone: "all"
                }
            ]
        }
    });
}

async function setBitmap(data) {
    for(let i=0;i<data.length;i++) {
        const { r, g, b } = hexToRgb(data[i]);
        bitmap[i] = [r, g, b];
    }

    try {
        await post({
            endpoint: 'game_event',
            data: {
                game: CONFIG.GAME_NAME,
                event: CONFIG.EVENT_NAME,
                data: {frame: { bitmap } }
            }
        });
    } catch(e) {
        console.log(e);
    }
}

// starts interval to send heartbeat every s seconds
function startHeartbeat(ms) {
    // send initial heartbeat immediately
    post({
        endpoint: 'game_heartbeat',
        data: {
            game: CONFIG.GAME_NAME
        }
    });

    // start sending heartbeats at given interval
    setInterval(async () => {
        await post({
            endpoint: 'game_heartbeat',
            data: {
                game: CONFIG.GAME_NAME
            }
        });
    }, ms);
}

async function startApp() {
    if(!CONFIG) throw new Error("config not set");

    await registerGame();
    console.log(`registered as '${CONFIG.DISPLAY_NAME}' in SteelSeries Engine`);

    await bindEvent();
    console.log(`bound event '${CONFIG.EVENT_NAME}'`);

    startHeartbeat(5000);
    console.log('sending heartbeat at 5 second intervals');
}

module.exports = {
    setConfig,
    startApp,
    registerGame,
    bindEvent,
    startHeartbeat,
    setBitmap
};