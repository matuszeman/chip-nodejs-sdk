const noble = require('noble');

module.exports = class ChipBluetooth {
  constructor() {
    this.state;
  }

  setup() {
    noble.on('stateChange', (state) => {
      console.log(state);//XXX
      this.state = state;
    });

    noble.on('scanStart', function() {
      console.log('scanStart');//XXX
    });

    noble.on('scanStop', function() {
      console.log('scanStop');//XXX
    });

    noble.on('discover', function(per) {
      console.log('discovered', per);//XXX
    });

    noble.on('warning', function(err) {
      console.log('warning', err);//XXX
    });
  }

  startScanning() {
    noble.startScanning();
  }
};

