const winston = require('winston');
require('winston-papertrail').Papertrail;

var winstonPapertrail = new winston.transports.Papertrail(
    {host: 'logs7.papertrailapp.com', port: 53608})

winstonPapertrail.on('error', function(err) {
  // Handle, report, or silently ignore connection errors and failures
});

var logger = winston.createLogger({transports: [winstonPapertrail]});

module.exports = logger;