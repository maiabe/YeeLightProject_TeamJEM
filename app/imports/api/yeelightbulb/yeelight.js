import { Meteor } from 'meteor/meteor';

const yeelight = require("yeelight-awesome");

let bulb = NaN;

Meteor.methods({
  discover() {
    const discover = new yeelight.Discover({
      port: 1982,
      debug: true
    });

    console.log("0+++++++++++++++++++++++++++++REACHED!!!!!!!!!!!");

    discover.once("deviceAdded", (device) => {
      bulb = new yeelight.Yeelight({
        lightIp: device.host,
        lightPort: device.port
      });

      bulb.on("connected", () => {
        let lightPower = bulb.setPower();
        lightPower.then(function (value) {
          console.log("1++++++++++++++++++++++++++++++++++Light on! ", value);
        });

        lightPower.catch(function (reason) {
          console.log("2------------------------------Problem Encountered: ", reason);
        });
      });

      let bulbConnect = bulb.connect();

      bulbConnect.then(function (value) {
        console.log("2+++++++++++++++++++++++++++++++++++Connected to light! ", value);
      });

      bulbConnect.catch(function (reason) {
        console.log("2----------------------------------Problem Encountered: ", reason);
      });
    });

    let bulbDiscover = discover.start();

    bulbDiscover.then(function (value) {
      console.log("3-------------------------------------Searching..............", value);
    });

    bulbDiscover.catch(function (reason) {
      console.log("4-------------------------------------Problem Encountered", reason);
    });

  },

  toggleBulb() {
    console.log("Toggle Bulb Button Pressed");

    const discover = new yeelight.Discover({
      port: 1982,
      debug: true
    });

    console.log("0+++++++++++++++++++++++++++++REACHED!!!!!!!!!!!");

    discover.once("deviceAdded", (device) => {
      bulb = new yeelight.Yeelight({
        lightIp: device.host,
        lightPort: device.port
      });

      bulb.on("connected", () => {
        let lightPower = bulb.toggle();
        lightPower.then(function (value) {
          console.log("1++++++++++++++++++++++++++++++++++Toggle! ", value);
        });

        lightPower.catch(function (reason) {
          console.log("2------------------------------Problem Encountered: ", reason);
        });
      });

      let bulbConnect = bulb.connect();

      bulbConnect.then(function (value) {
        console.log("2+++++++++++++++++++++++++++++++++++Connected to light! ", value);
      });

      bulbConnect.catch(function (reason) {
        console.log("2----------------------------------Problem Encountered: ", reason);
      });
    });

    let bulbDiscover = discover.start();

    bulbDiscover.then(function (value) {
      console.log("3-------------------------------------Searching..............", value);
    });

    bulbDiscover.catch(function (reason) {
      console.log("4-------------------------------------Problem Encountered", reason);
    });
  },

});