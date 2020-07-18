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

const parseScan = infoText => {
    const lines = infoText.split('\n');
    const colSsid = 0;
    const colMac = lines[0].indexOf('BSSID');
    const colRssi = lines[0].indexOf('RSSI');
    const colChannel = lines[0].indexOf('CHANNEL');
    const colHt = lines[0].indexOf('HT');
    const colCc = lines[0].indexOf('CC');
    const colSec = lines[0].indexOf('SECURITY');

    const wifis = [];
    for (let line of lines) {
        if (!line) continue;
        wifis.push({
            'ssid': line.substr(0, colMac).trim(),
            'bssid': line.substr(colMac, colRssi - colMac).trim(),
            'rssi': line.substr(colRssi, colChannel - colRssi).trim(),
            'channel': line.substr(colChannel, colHt - colChannel).trim(),
            'ht': line.substr(colHt, colCc - colHt).trim(),
            'cc': line.substr(colCc, colSec - colCc).trim(),
            'security': line.substr(colSec).trim()
        });
    }

    return wifis;
}

module.exports = {
    parseGetInfo,
    parseScan
};