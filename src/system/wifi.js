const _ = require('lodash');

const Utils = require('../utils');

module.exports = class ChipWifi {

  list() {
    const cmd = Utils.exec('nmcli device wifi list');

    const networks = [];
    const lines = cmd.split("\n");
    lines.shift();
    for (const line of lines) {
      if (line === '') {
        break;
      }
      //*  ADB-2BAF21   Infra  11    54 Mbit/s  100     ▂▄▆█  WPA2
      const [connected, ssid, mode, channel, rate, signal, signalVisual, security] = Utils.parseLine(line, [3, 13, 7, 6, 11, 8, 6, 6]);

      const network = {
        connected: !_.isEmpty(connected),
        ssid,
        mode,
        channel,
        rate,
        signal,
        security
      };

      networks.push(network);
    }

    return networks;
  }

  connectToOpenNetwork(ssid) {
    Utils.exec(`sudo nmcli device wifi connect '${ssid}' ifname wlan0`);
  }

  connectToPasswordProtectedNetwork(ssid, password) {
    Utils.exec(`sudo nmcli device wifi connect '${ssid}' password '${password}' ifname wlan0`);
  }

  connectToHiddenPasswordProtectedNetwork(ssid, password) {
    Utils.exec(`sudo nmcli con add con-name 'mywifi' ifname wlan0 type wifi ssid '${ssid}'`);
    Utils.exec(`sudo nmcli con modify 'mywifi' wifi-sec.key-mgmt wpa-psk`);
    Utils.exec(`sudo nmcli con modify 'mywifi' wifi-sec.psk '${password}'`);
    Utils.exec(`sudo nmcli con up id 'mywifi'`);
  }

};
