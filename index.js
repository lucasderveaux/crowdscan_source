let app = require('@treecg/basic-ldes-server')
const AppRunner = app.AppRunner;
//new AppRunner().runCli(process);

new AppRunner().run("./config/config.json");
