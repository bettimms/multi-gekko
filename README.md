# multi-gekko

<b>multi-gekko</b> is a `NodeJS` app that aims to make easy configuring & generating multiple config files for <b>[gekko](https://github.com/askmike/gekko)</b> trading bot 
,monitor/trade in multiple currencies and multiple exchanges simultaneously.

## Requirements

<b>[gekko](https://github.com/askmike/gekko)</b> trading bot and all it's requirements. No need to open or run, we just need the local path to the folder.


## Installation

#### Step 1
```
1. git clone https://github.com/bettimms/multi-gekko.git
2. cd multi-gekko
3. npm i
```
#### Step 2


Change file under `gekko/core/util.js` with `multi-gekko/src/util.js` issue [#2163](https://github.com/askmike/gekko/issues/2163)
<small>(We don't want config files to be generated inside gekko folder)</small>

#### Step 3

Go to `multi-gekko/src/pair-config.js` and configure currencies, exchanges and strategies.
Config files will be generated for each asset and strategy.

#### Step 4

Go to `multi-gekko/index.js` set path to your local `gekko` folder based on your `OS` (tested in Mac and Windows)

#### Step 5
```
npm run generate
```
You should see configs folder with config files for each asset generated inside `multi-gekko` folder

- NOTE: <small>It's strongly suggested that every time, before running `npm run generate` command to run `npm run remove-configs` on Mac 
or `npm run remove-configs-win` for Windows, except on very first time or when `configs` folder is not generated yet!
</small>


#### Step 6
```
npm run run-all
```
<small>(or check `package.json` `scripts` tag to see other generated options for each asset)</small>


## Limitations
- If you set multiple strategies per asset then gekko might not be optimized to fetch an asset and analyze it for each strategy, rather it goes and fetches same asset for each strategy (this is my assumption)
- Be careful of being `IP blacklisted` if you exceed exchange limitations! For example if we assume that `binance` has a limit of `1200` `requests/minute`, then you might be limited to watch only 20 assets for binance (unless you find a way using proxies ,if you do please share)

## Donation
If this tool has made your life easier and you'r willing to support this project and add more features, you may donate at:

- ETH  `0xa8dd6e3fa942aba40da07df9e25e4d2a65c43126`
- NEO  `ALWojx6XF1B8ozW8otWrD826Q7NdhhJFXb`
- BTC `1DBjVYHP4jrgwTRcuM9KeovANGzqyDaGqN`
- DOGE `DNHDKcABVvA3togGzH7zUTMRUaXhetzwLo`



## TODO
- Integrate with one of current backtesting tools, read most profitable strategies periodically (daily, weekly, monthly) and generate config files with most profitable strategies and assets/currencies


## Liability
I am not your financial adviser, nor is this tool. Use this program as an educational tool, and nothing more. None of the contributors to this project are liable for any losses you may incur. Be wise and always do your own research!

## License : `MIT`