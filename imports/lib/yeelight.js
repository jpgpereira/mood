import YeelightSearch from 'yeelight-wifi';
import IFTTTMaker from 'iftttmaker';

const y = new YeelightSearch();

module.exports = {
  findLights: () => {
    y.on(
      'found',
      (lightBulb) => {
        console.log(lightBulb.Yeelight);
      },
    );
  },
  toggleLights: () => {
    y.on(
      'found',
      (lightBulb) => {
        lightBulb.toggle();
      },
    );
  },
  turnLightsOn: () => {
    y.on(
      'found',
      (lightBulb) => {
        lightBulb.turnOn();
      },
    );
  },
  turnLightsOff: () => {
    y.on(
      'found',
      (lightBulb) => {
        lightBulb.turnOff();
      },
    );
  },
  resetColor: () => {
    y.on(
      'found',
      (lightBulb) => {
        lightBulb.setRGB('#ffffff');
      },
    );
  },
  changeColor: (color) => {
    const lightBulbs = y.getYeelights();
    lightBulbs.forEach((lightBulb) => {
      lightBulb.setRGB(color, 'smooth');
    });
  },
  setBrightness: (brightness) => {
    const lightBulbs = y.getYeelights();
    lightBulbs.forEach((lightBulb) => {
      lightBulb.setBrightness(brightness);
    });
  },
  triggerIFTTT: (mood) => {
    IFTTTMaker(process.env.IFTTT_MAKER_KEY).send(`mood_${mood}`);
  },
};
