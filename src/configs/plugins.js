// Everything is explained here:
// @link https://gekko.wizb.it/docs/commandline/plugins.html

var config = {};

config.pushover = {
  enabled: false,
  sendPushoverOnStart: false,
  muteSoft: true, // disable advice printout if it's soft
  tag: '[GEKKO]',
  key: '',
  user: ''
}

// want Gekko to send a mail on buy or sell advice?
config.mailer = {
  enabled: false,       // Send Emails if true, false to turn off
  sendMailOnStart: false,    // Send 'Gekko starting' message if true, not if false

  email: '',    // Your Gmail address
  muteSoft: true, // disable advice printout if it's soft

  // You don't have to set your password here, if you leave it blank we will ask it
  // when Gekko's starts.
  //
  // NOTE: Gekko is an open source project < https://github.com/askmike/gekko >,
  // make sure you looked at the code or trust the maintainer of this bot when you
  // fill in your email and password.
  //
  // WARNING: If you have NOT downloaded Gekko from the github page above we CANNOT
  // guarantuee that your email address & password are safe!

  password: '',       // Your Gmail Password - if not supplied Gekko will prompt on startup.

  tag: '[GEKKO] ',      // Prefix all email subject lines with this

  //       ADVANCED MAIL SETTINGS
  // you can leave those as is if you
  // just want to use Gmail

  server: '',   // The name of YOUR outbound (SMTP) mail server.
  smtpauth: true,     // Does SMTP server require authentication (true for Gmail)
  // The following 3 values default to the Email (above) if left blank
  user: '',       // Your Email server user name - usually your full Email address 'me@mydomain.com'
  from: '',       // 'me@mydomain.com'
  to: '',       // 'me@somedomain.com, me@someotherdomain.com'
  ssl: true,        // Use SSL (true for Gmail)
  port: '',       // Set if you don't want to use the default port
}

config.pushbullet = {
  // sends pushbullets if true
  enabled: true,
  // Send 'Gekko starting' message if true
  sendMessageOnStart: false,
  // disable advice printout if it's soft
  muteSoft: true,
  // your pushbullet API key
  key: '',
  // your email, change it unless you are Azor Ahai
  email: '',
  // will make Gekko messages start mit [GEKKO]
  tag: '[GEKKO]'
};
config.telegrambot = {
  enabled: false,
  emitUpdates: true,
  token: '',
  botName: ''
}
config.slack = {
  enabled: true,
  token: '',
  sendMessageOnStart: false,
  muteSoft: true,
  channel: '' // #tradebot
}
config.candleWriter = {
  enabled: false
}

config.adviceWriter = {
  enabled: true,
  muteSoft: true,
}
module.exports = config;
