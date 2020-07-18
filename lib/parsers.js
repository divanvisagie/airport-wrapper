const parseGetInfo = infoText => {
    const lines = infoText.split('\n');

    var toReturn = {};
    for (let line of lines) {
        if (!line) continue;
        const colonIndex = line.indexOf(':');
        const left = line.substr(0, colonIndex).trim();
        const right = line.substr(colonIndex+1).trim();
        toReturn[left] = right;
    }
    return toReturn;
}

function parseScan(str) {

    const lines = str.split('\n');
    const colSsid = 0;
    const colMac = lines[0].indexOf('BSSID');
    const colRssi = lines[0].indexOf('RSSI');
    const colChannel = lines[0].indexOf('CHANNEL');
    const colHt = lines[0].indexOf('HT');
    const colCc = lines[0].indexOf('CC');
    const colSec = lines[0].indexOf('SECURITY');

    const wifis = [];
    for (let i = 1, l = lines.length; i < l; i++) {
        wifis.push({

            'ssid': lines[i].substr(0, colMac).trim(),
            'bssid': lines[i].substr(colMac, colRssi - colMac).trim(),
            'rssi': lines[i].substr(colRssi, colChannel - colRssi).trim(),
            'channel': lines[i].substr(colChannel, colHt - colChannel).trim(),
            'ht': lines[i].substr(colHt, colCc - colHt).trim(),
            'cc': lines[i].substr(colCc, colSec - colCc).trim(),
            'security': lines[i].substr(colSec).trim()
        });
    }
    wifis.pop();

    return wifis;
}

module.exports = {
    parseGetInfo,
    parseScan
}