oldConsole = global.console.log;

global.console.log = function (...args) {
  oldConsole("====================");
  oldConsole(...args);
  oldConsole("====================");
};
