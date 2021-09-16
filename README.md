# LFT Scanner

![Logo](public/icon-192x192.png)

This is a simple app just used to validate any QR codes given by the Durham University LFT scheme. It keeps a list of all people’s details scanned through it (valid or invalid) locally on the phone (no scanned information is transmitted). You can access these by clicking the “People Scanned” button. In this you can export (as an excel file) or clear the people scanned.

You can use it directly from the webpage or install it as an app.

The App can be found at (it requires camera access): [https://stjohnscommonroom.org.uk/covid-test/](https://stjohnscommonroom.org.uk/covid-test/)

## Building

To build the application for production (i.e. to bundle into html and javascript files which can be dropped on any usual http server like apache, nginx etc.). You will need NodeJS, additionally yarn is recommended. If you don't have `yarn` feel free to substitute all the following commands by replacing `yarn` with `npm` (the standard NodeJS package manager).

First run `yarn install` to install all the dependencies then `yarn build` to generate the `out` directory (as listed for deployment).

## Deploying

Once the application is built it will generate html, js and css files under the `out` directory. These files can be dropped in any suitable https server, like apache, nginx etc.

The application requires https. This is due to the security requirements of modern browsers.

*Be aware*: The current configuration builds the files such they are expecting to be hosted on a domain at `/covid-test/` as the base path (e.g. `example.com/covid-test/`). If you would like to change the base path for deployment, change it in `next.config.js`.

## Changing Logo's

All logos can be changed via changing the png, ico and similar files in the `public/` directory

## Testing

All testing is done via jest and can be run using `yarn test`.

## Running in development environment

To run in a development environment ensure you have built some development certificates using `certificates/generate-local-cert.sh`. Once built you should be able to run `yarn start` to run the local development server. It is usually hosted at `https://localhost:3000/${BASE_PATH}` (See note about base path above).

## Implementation

The validation/parsing (Parse not validate!) of the QR code data in `utils/validateQr.ts`.

## Licensing

This application is released under standard MIT license apart from the image files described in the `LICENSE.md`.