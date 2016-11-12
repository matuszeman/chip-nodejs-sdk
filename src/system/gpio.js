const _ = require('lodash');
const shell = require('shelljs');
const Joi = require('joi');

const Utils = require('../utils');

module.exports = class ChipGpio {

  constructor() {
    this.gpioCount;
    this.firstPin;
    this.openPins = {};
    this.pinMap = {};
  }

  init() {
    const labelFile = Utils.exec(`grep -l pcf8574a /sys/class/gpio/*/*label`);
    const gpioFolder = Utils.exec(`dirname ${labelFile}`);
    this.firstPin = _.toNumber(shell.cat(gpioFolder + '/base'));
    this.gpioCount = _.toNumber(shell.cat(gpioFolder + '/ngpio'));

    this.pinMap = {};
    for (let i = 0; i < this.gpioCount; i++) {
      const pinName = 'XIO-P' + i;
        this.pinMap[pinName] = this.firstPin + i;
    }
  }

  checkInit() {
    if (!this.gpioCount) {
      throw new Error('Gpio not initialized. Call gpio.setup() first.');
    }
  }


  setup(pin, dir) {
    this.checkInit();

    Joi.assert(dir, Joi.string().required().valid(['in', 'out']));

    const sysPin = this.getSysPin(pin);
    Utils.exec(`sudo sh -c 'echo ${sysPin} > /sys/class/gpio/export'`);

    if (dir === 'out') {
      Utils.exec(`sudo sh -c 'echo out > /sys/class/gpio/gpio${sysPin}/direction'`);
    }
  }

  getDirection(pin) {
    this.checkInit();

    const ret = Utils.exec(`cat /sys/class/gpio/gpio${this.getSysPin(pin)}/direction`);
    return ret;
  }

  shutdown(pin) {
    this.checkInit();

    Utils.exec(`sudo sh -c 'echo ${this.getSysPin(pin)} > /sys/class/gpio/unexport'`);
  }

  input(pin) {
    this.checkInit();

    return Utils.exec(`cat /sys/class/gpio/gpio${this.getSysPin(pin)}/value`);
  }

  output(pin, val) {
    this.checkInit();

    Joi.assert(val, Joi.boolean().required());

    Utils.exec(`sudo sh -c 'echo ${val ? '1' : '0'} > /sys/class/gpio/gpio${this.getSysPin(pin)}/value'`);
  }

  getSysPin(name) {
    if (!this.pinMap[name]) {
      throw new Error(`Pin ${name} does not exist`);
    }

    return this.pinMap[name];
  }
};
