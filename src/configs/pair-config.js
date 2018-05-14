const pairConfig = {
    gdax: {
        trader: {
            enabled: true,
            key: '',
            secret: '',
            passphrase: '',
            orderUpdateDelay: 1, // Number of minutes to adjust unfilled order prices
        },
        pairs: [
            {
                strategies: ["NNv2"],
                currency: "BTC",
                asset: "ETH",
            },
            {
                strategies: ["NNv2", "TSI"],//Multiple strategies
                currency: "BTC",
                asset: "BCH",
            }
        ]
    },
    binance: {
        trader: {
            enabled: true,
            key: '',
            secret: '',
            orderUpdateDelay: 1, // Number of minutes to adjust unfilled order prices
        },
        pairs: [
            {
                strategies: ["NNv2"],
                currency: "BTC",
                asset: "ETH",
            },
            {
                strategies: ["TSI"],
                currency: "ETH",
                asset: "ADA",
            }
        ]
    }
}
exports.module = pairConfig;