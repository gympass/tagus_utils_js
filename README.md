# **Tagus Utils**

## **Description**

#### This project aims to support teams with test mass generation in the staging environment

## **Requirements**

***Homebrew***
```
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
***Yarn***
```
$ brew install yarn
```
***NodeJS***
```
$ brew install node
or With NVM
$ brew install nvm
$ nvm install v14
$ nvm use v14
```

***Environment Files***
> You need to create a `.env` file and place it inside root the project folder. We have a `.env.template` file that can help you!


## Running application

> As these are end-points that use services in the Staging environment, the Zscaler VPN must be active.

```sh
$ yarn install
then
$ yarn start
```
The server is running: [tagus_utils](http://localhost:3000/api-doc).


## Features

- [X] User registration with plan
- [X] User registration without plan
- [X] Associate plan to user
- [X] Cancel user plan
- [X] Delete user
- [X] Create booking
- [X] Approve booking

## Comments
> The flow of creating a user with a plan and associating a plan with the user will soon be discontinued due to changes in the checkout functionality
