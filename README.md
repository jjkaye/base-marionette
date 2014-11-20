base-marionette
===============
[![Build Status](https://travis-ci.org/UseAllFive/base-marionette.svg)](https://travis-ci.org/UseAllFive/base-marionette)

## Getting started
```BASH
npm install
bower install
grunt
```

## Testing
### Set up BrowserStack
- Export BrowserStack creds as env variables... :
    * ```export BROWSERSTACK_USER=your_username```
    * ```export BROWSERSTACK_KEY=your_key```
    * ```export BROWSERSTACK_PORT=12080```
- Install mocha globally - this will give you the mocha command
    * ```npm install -g mocha```
    * Exposes globals like describe inside you test javascript
- Download the proxy executable and unpack it somewhere in your path or know where to get it from
    * Download from: https://www.browserstack.com/local-testing#command-line
- Set your username and access key and replace in test file
    * Can get it from top left here: https://www.browserstack.com/automate
- Run the proxy executable and keep it running in seperate terminal session
    * For example I do: ```~/installs/BrowserStackLocal -v $BROWSERSTACK_KEY localhost,12080,0```
    * I've aliased this by adding something like this to my .bashrc
        * ```alias testproxy='~/installs/BrowserStackLocal -v $BROWSERSTACK_KEY localhost,12080,0'```
- In app root run ```mocha -R spec test```
- Notes:
    * Useful selenium examples: https://code.google.com/p/selenium/wiki/WebDriverJs
    * Initial test only set up to run on firefox but we'll change that

## Code Standards
### Sublime Settings
The JavaScript linting for this project requires [Sublime Text 3](http://www.sublimetext.com/3).

In Sublime Text 3 (ST3) install the following packages `CMD + Shift + P`:
- SublimeLinter
- SublimeLinter-jshint
- SublimeLinter-jscs

Next make sure you globally install the following on your command line:
- jshint `npm install -g jshint`
- jscs (JavaScript Code Style Checker) `npm -g install jscs`

### Resources
- Setup package control in ST3 - [Setup Package Control in ST3](https://sublime.wbond.net/installation)
- jscs documentation -  [jscs github repo](https://github.com/mdevils/node-jscs)
