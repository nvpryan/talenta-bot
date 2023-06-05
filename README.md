# Talenta Bot 🤖

This application can be used to automate your daily attendance.

Now you can be at ease and doesn't need to panic about your daily attendance 🎉

## Table of Contents
- [Talenta Bot 🤖](#talenta-bot-)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Features](#features)
  - [CI/CD](#cicd)

## Installation

- Configure your environment variable based on this setup [./env.example](env.example):

  ```env
  USERNAME=email@example.com #Your talenta account email
  PASSWORD=12345678 #Your talenta account password

  SENTRY_DSN=https://example.com #Use your own DSN for Error Tracking

  MONGO_URI=mongodb://exampleip:exampleport/examplename #Only add this if you are running in your local, do not add this to your deployment env secrets
  ```

- Run the initial `npm` command
  ```bash
  npm install
  ```
- Mongo DB Setup

  Add this key `MONGO_URI` into the application environment

  ```env
  MONGO_URI=mongodb://yourmongoip:yourmongoport/yourmongodbname
  ```

- Run the project
  ```env
  npm run start
  ```

## Features

- Automatic run based on `node-schedule`. If you want to change the time of the scheduler please check this file [./src/scheduler/scheduler.js](src/scheduler/scheduler.js) 🤖

  ```js
  const DEFAULT_TZ = "Asia/Singapore"; // Change this to your current timezone

  async function attendance() {
    const date = moment().tz(this.defaultTZ);
    const holiday = await Holiday.findOne({
      startDate: date.format("YYYY-MM-DD"),
    });

    if (holiday) {
      return;
    }

    let stepType = "clock-in";
    if (date.hour() === 18) {
      stepType = "clock-out";
    }
    await steps(stepType);
  }

  const initSchedule = () => {
    const ruleAttendance = new RecurrenceRule();
    ruleAttendance.dayOfWeek = [new Range(1, 5)];
    ruleAttendance.hour = [9, 18]; // Change this to your preference time
    ruleAttendance.minute = 0;
    ruleAttendance.second = 0;
    ruleAttendance.tz = DEFAULT_TZ;
    scheduleJob(ruleAttendance, attendance);
  };
  ```

- Check your current holiday and save it for future scheduled
- Save your session after first logged in from the automation

## CI/CD

- Set up your secrets to use the CI/CD

  1. `ENV`: Set this to your current `.env` file contents
  2. `DOCKERHUB_USERNAME`: Your docker account username
  3. `DOCKERHUB_TOKEN`: Your own docker account token. Create it here https://hub.docker.com/settings/security
  4. `SERVER_USERNAME`: Your server username
  5. `SERVER_IP`: Your server external IP Address
  6. `SERVER_PRIVATE_KEY`: A github action private key by generating it using `ssh-keygen` and upload the pubkey into your `authorized_keys` inside your server.
  7. `DB_NAME`: Your MongoDB document name

- Change this docker image to your own docker image repository. You can find this config in this file [./bin/utils.sh](bin/utils.sh)
  ```shell
  function get_tag() {
    tag=yourdockerusername/yourdockerrepository:yourdockerimagetag
    echo "$tag"
  }
  ```
