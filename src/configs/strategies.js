// Everything is explained here:
// @link https://gekko.wizb.it/docs/commandline/plugins.html

var config = {};

config.neuralnet = {
    "threshold_buy": 0,
    "threshold_sell": -1,
    "learning_rate": 0.8541331339587732,
    "momentum": -9.126530331542114,
    "decay": 0.44701435794526234,
    "stoploss_enabled": false,
    "stoploss_threshold": -5.613170915676891,
    "hodl_threshold": -7,
    "price_buffer_len": 143,
    "min_predictions": 842,
};
config.RSI_BULL_BEAR = {
    "BEAR_RSI": 24,
    "BEAR_RSI_high": 43,
    "BEAR_RSI_low": 22,
    "BULL_RSI": 13.72,
    "BULL_RSI_high": 78,
    "BULL_RSI_low": 35,
    "SMA_long": 1002,
    "SMA_short": 36.9,
};
config.buyatsellat_ui = {
    buyat: 1.20,
    sellat: 0.98,
    stop_loss_pct: 0.85,
    sellat_up: 1.01
};
config.BB = {
    TimePeriod: 20,
    NbDevUp: 2.25,
    NbDevDn: 2
};
config.NNv2 = {
    method: 'adadelta',
    threshold_buy_bear: 2.0,
    threshold_buy_bull: 0.5,
    threshold_sell_bear: -0.5,
    threshold_sell_bull: -0.5,
    NN_SMMA_Length: 4,
    maFast: 20,
    maSlow: 720,
    decay: 0.5,
    price_buffer_len: 120,
    stoploss_threshold: 5
};
config.BBRSI = {
    interval: 14,
    thresholds: {
        low: 40,
        high: 40,
        persistence: 9,
    },
    bbands: {
        TimePeriod: 20,
        NbDevUp: 2,
        NbDevDn: 2,
    }
};
config.RsiStopLoss = {
    interval: 14,
    thresholds: {
        low: 30,
        high: 70,
        persistence: 1
    },
    stoploss: {
        loss: 5,
        gain: 8,
        progressive: true,
        progressivegain: 2
    }
};
// Exponential Moving Averages settings:
config.DEMA = {
    // EMA weight (α)
    // the higher the weight, the more smooth (and delayed) the line
    weight: 21,
    // amount of candles to remember and base initial EMAs on
    // the difference between the EMAs (to act as triggers)
    thresholds: {
        down: -0.025,
        up: 0.025
    }
};

// MACD settings:
config.MACD = {
    // EMA weight (α)
    // the higher the weight, the more smooth (and delayed) the line
    short: 10,
    long: 21,
    signal: 9,
    // the difference between the EMAs (to act as triggers)
    thresholds: {
        down: -0.025,
        up: 0.025,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// PPO settings:
config.PPO = {
    // EMA weight (α)
    // the higher the weight, the more smooth (and delayed) the line
    short: 12,
    long: 26,
    signal: 9,
    // the difference between the EMAs (to act as triggers)
    thresholds: {
        down: -0.025,
        up: 0.025,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 2
    }
};

// Uses one of the momentum indicators but adjusts the thresholds when PPO is bullish or bearish
// Uses settings from the ppo and momentum indicator config block
config.varPPO = {
    momentum: 'TSI', // RSI, TSI or UO
    thresholds: {
        // new threshold is default threshold + PPOhist * PPOweight
        weightLow: 120,
        weightHigh: -120,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 0
    }
};

// RSI settings:
config.RSI = {
    interval: 14,
    thresholds: {
        low: 30,
        high: 70,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// TSI settings:
config.TSI = {
    "short": 17.93217457418599,
    "long": 44.725698074840224,
    thresholds: {
        "high": 33.96,
        "low": -25.25,
        "persistence": 1
    }
};

// Ultimate Oscillator Settings
config.UO = {
    first: {weight: 4, period: 7},
    second: {weight: 2, period: 14},
    third: {weight: 1, period: 28},
    thresholds: {
        low: 30,
        high: 70,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 1
    }
};

// CCI Settings
config.CCI = {
    constant: 0.015, // constant multiplier. 0.015 gets to around 70% fit
    history: 90, // history size, make same or smaller than history
    thresholds: {
        up: 100, // fixed values for overbuy upward trajectory
        down: -100, // fixed value for downward trajectory
        persistence: 0 // filter spikes by adding extra filters candles
    }
};

// StochRSI settings
config.StochRSI = {
    interval: 3,
    thresholds: {
        low: 20,
        high: 80,
        // How many candle intervals should a trend persist
        // before we consider it real?
        persistence: 3
    }
};
module.exports = config;
