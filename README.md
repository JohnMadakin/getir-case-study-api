[![Build Status](https://travis-ci.com/JohnMadakin/getir-case-study-api.svg?branch=main)](https://travis-ci.com/JohnMadakin/getir-case-study-api)

#Getir Challenge
## Description
Solution to Getir backend task


## Table of Contents

- [Documentation](#documentation)
- [Setup](#setup)
  - [Dependecies](#dependecies)
  - [Getting Started](#getting-started)
  - [Environmental Variables](#env-variable)
- [Testing](#testing)

## Documentation

https://documenter.getpostman.com/view/4919621/TVt17jGK

## Setup

### Dependencies

- [NodeJS](https://github.com/nodejs/node) - A JavaScript runtime environment
- [Express](https://github.com/expressjs/express) - A web application framework for NodeJS
- [Mongodb](https://github.com/mongodb/mongo) - A Document-based database management system
- [Mongoose](https://github.com/Automattic/mongoose) - A promise-based ODM for NodeJS

### Getting Started

Follow these steps to set up the project in development mode

- Install [Nodejs](https://nodejs.org/en/download/)
- Install and setup [Mongodb](https://www.mongodb.com/)
- Clone the repository (See command below)

  ```[bash]
  git clone https://github.com/JohnMadakin/getir-case-study-api.git
  ```

- Run `cd getir-case-study-api` to enter the application's directory
- Install the application's dependencies by running the command
  ```
  npm install
  ```
- Create a `.env` file in the root of your directory using the `env.example` file in the repository
- Copy the database URI from the challenge document as the .env `DB_URI`
- Start the application by running
  ```
  npm run dev
  ```
  The application should now be running at `http://127.0.0.1:${port_number}`


### More about environmental variables

- process.env.USE_CLUSTERS: To enable cluster mode, set this env to 1
- process.env.ENABLE_CIRCUIT_BREAKER: Circuit breaker is set by default. Delete this variable to disable

## Testing

[Jest](https://jestjs.io) is used as the testing framework for both the unit tests.


```
  npm run test
```
