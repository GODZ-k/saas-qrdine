import bunyan from 'bunyan';

// Create a bunyan logger instance
const logger = bunyan.createLogger({
  name: 'myApp',  // Name of the logger (your app's name)
  level: 'info',  // Set the default log level
  streams: [
    {
      level: 'info',
      path: 'app.log', // Log to console
    }, 
  ],
});

export default logger;
