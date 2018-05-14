const CONFIGS_DIR_DEST_PATH = "./configs";


var fs = require('fs-extra');
const fileHelper = require("./file-helper");
const strategiesConfig = require(`${CONFIGS_DIR_DEST_PATH}/strategies`);

const packageJson = './package.json';
const pairConfig = require(`${CONFIGS_DIR_DEST_PATH}/pair-config`).module;
var gekkoPath;

const generator = ({
    getPackageJsonContent() {
        return JSON.parse(fs.readFileSync(packageJson));
    },
    getScriptsTag() {
        return this.getPackageJsonContent()["scripts"];
    },
    cleanScriptsTag() {
        //Remove previous generated run scripts
        const scripts = this.getScriptsTag();
        Object.keys(scripts).forEach(key => {
            const scriptVal = scripts[key];
            if (scriptVal.indexOf("gekko") >= 0 && scriptVal.indexOf("--ui") === -1) delete scripts[key];
        });
        scripts["run-all"] = "";
        return scripts;
    },
    updatePackageJsonScripts(scripts) {
        var packageJsonContent = this.getPackageJsonContent();
        packageJsonContent["scripts"] = scripts;
        return fileHelper.writeJson(packageJson, packageJsonContent);
    },
    getBaseConfig() {
        const baseConfig = require(`${CONFIGS_DIR_DEST_PATH}/base-config.js`);
        const pluginsConfig = require(`${CONFIGS_DIR_DEST_PATH}/plugins`);
        const config = {...baseConfig, ...strategiesConfig, ...pluginsConfig};
        return config;
    },
    setScriptsProp(scripts, watchProp) {
        const {filePath, fileName} = fileHelper.fileParts(watchProp);
        const relPath = process.cwd().replace(/\s/g, "\\ ");
        const scriptValue = `node ${gekkoPath} --config ${relPath}/${filePath}`;
        scripts[fileName] = scriptValue;
    },
    writeCurrencyConfig(config, watchProp) {
        const {filePath} = fileHelper.fileParts(watchProp);
        fileHelper.writeNodeModule(filePath, config);
    },
    cleanStrategies(config, currentStrategy) {
        var newConfig = {...config};//make a copy to be able to remove all other
        // unnecessary strategies in config file
        Object.keys(strategiesConfig).forEach(s => {
            if (s !== currentStrategy) {
                delete newConfig[s];
            }
        });
        return newConfig;
    },
    generateConfigs() {
        var _config = this.getBaseConfig();

        Object.keys(pairConfig).forEach(exchangeKey => {
            const exchange = pairConfig[exchangeKey];
            exchange.pairs.forEach(watchProp => {

                watchProp.exchange = exchangeKey;

                let {strategies, ...watch} = watchProp;//Ommit strategies
                _config.watch = watch;
                _config.trader = exchange.trader;

                watchProp.strategies.forEach(strategy => {
                    watchProp.strategy = strategy;

                    var newConfig = this.cleanStrategies(_config, strategy);
                    newConfig.tradingAdvisor.method = strategy;
                    newConfig.mailer.tag = newConfig.pushbullet.tag = `[GEKKO-${strategy}]`;
                    this.writeCurrencyConfig(newConfig, watchProp);
                });
            });
        });


        return _config;
    },
    setRunAllScriptsCommand(scripts) {
        var runAllCommand = `npm-run-all --parallel `;
        const configFiles = this.getConfigFilesSorted(CONFIGS_DIR_DEST_PATH);
        configFiles.forEach(file => {
            runAllCommand += `${file.fileName} `;
        });
        scripts["run-all"] = runAllCommand.trim();
    },
    getRunScripts() {
        const _config = this.getBaseConfig();
        const scripts = this.cleanScriptsTag();

        //TODO: merge with generateConfigs()
        Object.keys(pairConfig).forEach(exchangeKey => {
            const exchange = pairConfig[exchangeKey];
            exchange.pairs.forEach(watchProp => {
                _config.watch = watchProp;
                _config.trader = {..._config[watchProp.exchange]};
                delete _config[watchProp.exchange];//Remove api keys under exchange name

                watchProp.strategies.forEach(strategy => {
                    watchProp.strategy = strategy;
                    _config.tradingAdvisor.method = strategy;
                    _config.mailer.tag = _config.pushbullet.tag = `[GEKKO-${strategy}]`;
                    this.setScriptsProp(scripts, watchProp)
                });
            });
        });
        this.setRunAllScriptsCommand(scripts);
        return scripts;
    },
    getConfigFilesSorted(dirPath) {
        const configFiles = fileHelper.fileNames(dirPath).sort((a, b) => {
            const aStrategyName = a.fileName.split("-")[1].split(".")[0];
            const bStrategyName = b.fileName.split("-")[1].split(".")[0];
            return aStrategyName.localeCompare(bStrategyName);
        });
        return configFiles;
    },
    run(gekko) {
        gekkoPath = gekko;
        this.generateConfigs();
        const runScripts = this.getRunScripts();
        this.updatePackageJsonScripts(runScripts);
    }
});
module.exports = generator;
