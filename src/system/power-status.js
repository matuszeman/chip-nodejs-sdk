const Utils = require('../utils');

module.exports = class ChipPowerStatus {
  getStatus() {
    const ret = Utils.exec(`sudo ${__dirname + '/power-status.sh'}`);
    return JSON.parse(ret);
  }
};
