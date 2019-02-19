# Photo Carousel

> Microservice which handles display of any given property's photos to the Xillow Talk application.

## Related Projects

  - https://github.com/xillow-talk/brian-component-neighborhood
  - https://github.com/xillow-talk/john-sprague-component-home-value
  - https://github.com/xillow-talk/steve-component-agent-contact

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

#### DB Schema and Seeding
Make a copy of `config.example.js` and rename it to `config.js`. Replace the placeholder text with your mysql username and password. 
```
// config.js
module.exports = {
  mysqlUser: 'YOUR USERNAME HERE',
  mysqlPass: 'YOUR PASSWORD HERE',
};
```
From the root directory of this service, run `npm run seed`. This script will create a `xillow` database, 2 tables (`properties` and `photos`), and then populate the `properties` table with 100 entries, and the `photos` table with roughly 3500 entries (20-50 entries per property).

#### Building the Client
From the root directory of this service, run `npm run build`. This will generate `bundle.js` in the `client/dist` directory. 

#### Running the Server
From the root directory of this service, run `npm run start`. This will start up a localhost on port 3333 with the client files. Open a web browser and visit `http://localhost:3333/`.

## Requirements

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

