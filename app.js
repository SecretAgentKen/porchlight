const SunCalc = require("suncalc");
const moment = require("moment");
const process = require("node:process");
const { Client } = require("tplink-smarthome-api");

const HOST = process.env.HOST;
const LAT = Number(process.env.LATITUDE);
const LON = Number(process.env.LONGITUDE);

const INTERVAL_MS = (Number(process.env.CHECK_INTERVAL) || 10) * 60 * 1000;
const SUNSETBUFF_S = (Number(process.env.SUNSET_PRE) || 20) * 60; // Time BEFORE sunset to turn on light
const SUNRISEBUFF_S = (Number(process.env.SUNRISE_POST) || 20) * 60; // Time AFTER sunrise to turn off light

const client = new Client();

console.log("Starting up with settings:");
console.log("Host:            ", HOST);
console.log("Check Interval:  ", INTERVAL_MS, "ms");
console.log("Sunset prebuff:  ", SUNSETBUFF_S, "s");
console.log("Sunrise postbuff:", SUNRISEBUFF_S, "s");
setInterval(updateLight, INTERVAL_MS);
updateLight();

async function updateLight() {
  let times = SunCalc.getTimes(new Date(), LAT, LON);
  // If we're after the postbuff'd sunset, we should be off.
  const device = await client.getDevice({ host: HOST });
  const isOn = await device.getPowerState();

  if (
    moment(times.sunsetStart).subtract(SUNSETBUFF_S, "s").isBefore(moment())
  ) {
    if (!isOn) {
      console.log("Turning on", moment().toLocaleString());
      await device.setPowerState(true);
    }
    // OK, so if we're not after sunset, we're before, which means we should be off UNLESS sunrise is after us (ie. it's midnight)
  } else if (moment(times.sunriseEnd).add(SUNRISEBUFF_S).isAfter(moment())) {
    if (!isOn) {
      console.log("Turning on", moment().toLocaleString());
      await device.setPowerState(true);
    }
    // Well, sunrise isn't later, and sunset hasn't occurred, so off
  } else {
    if (isOn) {
      console.log("Turning off", moment().toLocaleString());
      await device.setPowerState(false);
    }
  }
}
