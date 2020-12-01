const { parseScan } = require("./parsers")

const sampleScan = `SSID BSSID             RSSI CHANNEL HT CC SECURITY (auth/unicast/group)
FAKE1 xx:xx:xx:xx:xx:xx -71  13,-1   Y  -- WPA2(PSK/AES/AES) 
FAKE2 xx:xx:xx:xx:xx:xx -49  11      Y  ZA WPA2(PSK/AES/AES) 
FAKE3 xx:xx:xx:xx:xx:xx -49  11      Y  -- WPA2(PSK/AES/AES) 
FAKE4 xx:xx:xx:xx:xx:xx -49  11      Y  -- WPA2(PSK/AES/AES) 
`

describe('parseScan', () => {
    test('creates object from loose airport scan', () => {
        const parsed = parseScan(sampleScan)
        expect(parsed).toEqual([
            {
                "bssid": "BSSID",
                "cc": "CC",
                "channel": "CHANNEL",
                "ht": "HT",
                "rssi": "RSSI",
                "security": "SECURITY (auth/unicast/group)",
                "ssid": "SSID",
            },
            {
                "bssid": "xx:xx:xx:xx:xx:xx",
                "cc": "--",
                "channel": "13,-1",
                "ht": "Y",
                "rssi": "-71",
                "security": "WPA2(PSK/AES/AES)",
                "ssid": "FAKE1",
            },
            {
                "bssid": "xx:xx:xx:xx:xx:xx",
                "cc": "ZA",
                "channel": "11",
                "ht": "Y",
                "rssi": "-49",
                "security": "WPA2(PSK/AES/AES)",
                "ssid": "FAKE2",
            },
            {
                "bssid": "xx:xx:xx:xx:xx:xx",
                "cc": "--",
                "channel": "11",
                "ht": "Y",
                "rssi": "-49",
                "security": "WPA2(PSK/AES/AES)",
                "ssid": "FAKE3",
            },
            {
                "bssid": "xx:xx:xx:xx:xx:xx",
                "cc": "--",
                "channel": "11",
                "ht": "Y",
                "rssi": "-49",
                "security": "WPA2(PSK/AES/AES)",
                "ssid": "FAKE4",
            }
        ])
    })

})