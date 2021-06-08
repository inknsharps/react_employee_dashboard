# React Employee Dashboard

## Description

This is a single page web application built with React, which acts as a employee directory using data fetched from the [Random Users API](https://randomuser.me/). A deployed version of this can be found [here](https://inknsharps.github.io/react_employee_dashboard/).

## Installation

To run this application locally:

1. Make sure you have [node.js](https://nodejs.dev/) installed on your local machine.
2. Then clone or download the repository. Navigate to the root directory of the copy in your CLI and run the following to install all required dependencies:
```
    npm install
```
3. Finally, run the following to start a development server on localhost:3000:
```
    npm start
```

## Usage

* Upon page load, users will be loaded in from the Random Users API.
* Type any value in the input field to filter the currently displayed users. It will currently filter out any value from all fields.
* You can sort users alphabetically by name, either by ascending or descending order.
* Emails are generated as a mailto: link which will open your local machines' default email application.

## Demo

![dashboard-demo](./img/dashboard.gif)