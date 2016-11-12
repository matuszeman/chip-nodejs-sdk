const shell = require('shelljs');
const _ = require('lodash');

module.exports = class Utils {
  static parseLine(str, slices) {
    const ret = [];

    for (let i = 0; i < slices.length; i++) {
      const length = slices[i];
      const val = str.substr(0, length);
      str = str.substr(length);

      ret.push(_.trim(val));
    }

    return ret;
  }

  static exec(cmd) {
    console.log(cmd);//XXX
    const ret = shell.exec(cmd, {
      silent: true
    });
    if (ret.code !== 0) {
      throw new Error(ret.stderr);
    }
    return _.trim(ret.stdout);
  }
};
