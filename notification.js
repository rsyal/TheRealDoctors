const savedNotificationEmitter = require('./Models/blog').savedNotificationEmitter;

// Create the emitter configuration
module.exports = function(io, socket) {
  savedNotificationEmitter(io,socket);
};