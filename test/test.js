/*jslint node: true*/
var PROJECT_CONFIG_FILE = 'config/project.yml';
var SAMPLE_USER_SPECIFIC_CONFIG_FILE = 'config/project_user_specific.yml.sample';
var USER_SPECIFIC_CONFIG_FILE = 'config/project_user_specific.yml';

var fs = require('fs');
var _ = require('underscore');
var test = require('browserstack-webdriver/testing');
var webdriver = require('browserstack-webdriver');
var yamlConfig = require('node-yaml-config');

var BrowserStackTunnel = require('browserstacktunnel-wrapper');
var browserStackTunnel;
var config;
var driver;

// ## Setup

// ### Verify Enviromental Variables
// This is called in an IIFE so we don't have to declare the variables that
// are required by this block globally.
(function verifyUserSpecificConfiguration() {
    var defaultConfig;
    var key;
    var missing = [];
    var overrideConfig;
    var requiredVariables = ['browserstackUser', 'browserstackKey', 'port', 'url'];
    var variable;

    // Load project file
    defaultConfig = yamlConfig.load(PROJECT_CONFIG_FILE);

    // Verify user specific config file has been created
    if (!fs.existsSync(USER_SPECIFIC_CONFIG_FILE)) {
        console.error('User specific configuration file is missing (' + USER_SPECIFIC_CONFIG_FILE + '). Copy ' + SAMPLE_USER_SPECIFIC_CONFIG_FILE + ' to create it.');
        process.exit();
    }

    // Read user specific config file.
    overrideConfig = yamlConfig.load(USER_SPECIFIC_CONFIG_FILE);

    // Merge the configurations into a single config
    config = _.defaults(overrideConfig, defaultConfig);

    for (key in requiredVariables) {
        if (requiredVariables.hasOwnProperty(key)) {
            variable = requiredVariables[key];

            if (!config[variable]) {
                missing.push(variable);
            } else {
                global[variable] = config[variable];
            }
        }
    }

    if (missing.length > 0) {
        console.error('Properties missing from ' + USER_SPECIFIC_CONFIG_FILE + ':' +  missing.join(', '));
        process.exit();
    }
})();

// ### Start the BrowserStack tunnel.
test.before(function() {
    var defer = webdriver.promise.defer();

    browserStackTunnel = new BrowserStackTunnel({
        key: config.browserstackKey,
        hosts: [{
            name: config.url,
            port: config.port,
            sslFlag: 0
        }],
        v: true
    });

    console.info('Starting BrowserStack tunnel...');

    // Start the tunnel
    browserStackTunnel.start(function(error) {
        if (error) {
            console.error('error', error);
            process.exit();
        } else {
            // Fullfil the promise.
            console.info('  tunnel started.');
            defer.fulfill();
        }
    });

    // Return promise.
    return defer.promise;
});

// ### Start WebDriver.
test.before(function() {
    // Create the driver.
    var capabilities;

    console.info('Starting WebDriver...');

    capabilities = {
        'browserstack.local': 'true',
        browserName: 'firefox',
        'browserstack.user': config.browserstackUser,
        'browserstack.key': config.browserstackKey
    };
    driver = new webdriver.Builder().
        usingServer('http://hub.browserstack.com/wd/hub').
        withCapabilities(capabilities).
        build();

    console.info('  WebDriver started.');

});

// ### Print line breaks.
test.before(function() {
    console.info('\n\n');
});

// Execute the tests.
test.describe('Base Marionette', function() {

    test.it('Should see example-region rendered on the page', function() {
        var url = 'http://' + config.url + ':' + config.port;

        driver.get(url);

        driver.wait(function() {
            return driver.findElement(webdriver.By.className('example-region')).then(function(elements) {
                // If control flow enters this callback, the region is found
                return true;
            }, function(err) {
                // If control flow enters this error callback, region wasnt found ... force test to fail
                return false;
            });
        }, 500);
    });

});

// ## Shut down the tunnel and web driver.
test.after(function() {
    // Stop the tunnel
    browserStackTunnel.stop(function(error) {
        if (error) {
            console.error('error stopping tunnel server', error);
        }
    });

    // Quit the driver
    driver.quit();
});
