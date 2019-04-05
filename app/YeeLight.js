// Code commented out for now to prevent error: "dgram_1.createSocket is not a function"

/**
const yeelight = require("yeelight-awesome");
const discover = new yeelight.Discover({
  port: 1982,
  debug: true
});
discover.on("deviceAdded", (device) => {
  const light = new yeelight.Yeelight({
    lightIp: device.host,
    lightPort: device.port
  });

  light.on("error", (error) => {
    console.error(error);
  });
  light.on("connected", () => {
    console.log("Light connected")
    // White
    light.setCtAbx(6500, "smooth", 5000);
    setTimeout(() => {
      // Yellow
      light.setCtAbx(2700, "smooth", 5000);
    }, 5000);
    setTimeout(() => {
        // Dim
      light.setBright(1, "smooth", 5000);
    }, 10000);
    setTimeout(() => {
      // Bright
      light.setBright(100, "smooth", 5000);
    }, 15000);
  });
  light.connect();
});

// const test = new yeelight.Yeelight({lightIp: "192.168.0.112", lightPort: 55443});
// test.connect().then(() => {
//   console.log("Hey, the light connected");
// }).catch((error) => {
//   console.error(error);
// });

discover.start();

process.on("SIGINT", () => {
  discover.destroy();
  process.exit(0);
});

process.on("unhandledRejection", error => {
  console.log("Caught unhandledRejection");
  console.log(error);
});
 **/

