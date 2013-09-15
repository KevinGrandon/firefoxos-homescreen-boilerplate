# FirefoxOS Homescreen Boilerplate

This homescreen is a simple list of all installed applications. It is not complete as it does not yet support bookmarks, installation, and uninstallation.

## Installation

Homescreens are currently certified apps, so you will need to build FirefoxOS to install it.

1 - Clone this repo into your gaia checkout:
```
git clone https://github.com/KevinGrandon/firefoxos-homescreen-boilerplate.git apps/firefoxos-homescreen-boilerplate
```

2 - Reset your device to install the homescreen:
```
PRODUCTION=1 make reset-gaia
```

3 - Enable it!

Open the Settings app and navigate to Homescreens -> Home Boilerplate.
