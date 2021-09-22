let app2 = require('../dist/init/CrowdscanAppRunner');
const appRunner = app2.CrowdscanAppRunner;

new appRunner().run('./config/config.json');
