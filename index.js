const ChipWifi = require('./src/system/wifi');
const ChipGpio = require('./src/system/gpio');
const ChipBluetooth = require('./src/system/bluetooth');
const ChipPowerStatus = require('./src/system/power-status');

const power = new ChipPowerStatus();
const stat = power.getStatus();
console.log(stat);//XXX
//DOES NOT WORK - start stacanning but does not find any devices
//const bt = new ChipBluetooth();
//bt.setup();
//setTimeout(() => {
//  bt.startScanning();
//}, 1000);

//const wifi = new ChipWifi();
//const networks = wifi.list();
//console.log(networks);//XXX

//const connect = wifi.connectToOpenNetwork('XXX');

//const gpio = new ChipGpio();
//gpio.init();

//const pinIn = 'XIO-P7';
//gpio.setup(pinIn, 'in');
////gpio.shutdown(pinIn);
////const dir = gpio.getDirection(pinIn);
////console.log(dir);//XXX
//
//const input = gpio.input(pinIn);
//console.log(input);//XXX
//
//gpio.shutdown(pinIn);


//const pinOut = 'XIO-P5';
//gpio.setup(pinOut, 'out');
//
//const dir = gpio.getDirection(pinOut);
//console.log(dir);//XXX
//
//gpio.output(pinOut, false);
//
//gpio.shutdown(pinOut);


