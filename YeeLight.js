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

  light.on("connected", () => {
    light.setCtAbx(6500, "smooth", 5000);
  });
  light.connect();
});

discover.start();

process.on("SIGINT", () => {
  discover.destroy();
});

