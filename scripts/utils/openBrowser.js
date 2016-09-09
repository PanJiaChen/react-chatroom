var opn = require('opn');
var execSync = require('child_process').execSync;
var path = require('path');

module.exports = function (port) {
    if (process.platform === 'darwin') {
        try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            execSync('ps cax | grep "Google Chrome"');
            execSync(
                'osascript ' +
                path.resolve(__dirname, './chrome.applescript') +
                ' http://localhost:' + port + '/'
            );
            return;
        } catch (err) {
            // Ignore errors.
        }
    }
    // Fallback to opn
    // (It will always open new tab)
    opn('http://localhost:' + port + '/');
}