# Hotel-Management-Api-V2.0-TypeScript
Hotel management API using Typescript which includes validation, authentication and authorization leveraging on bcryptjs, joi, and jsonwebtoken(jwt) technologies


## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)


## General Information
- A hotel management api use for determinine the prices, and features of hotel room and at carious prices.
- Helps in creation of hotel rooms, allocating various price and features/names to each room using its unique id
- The purpose of this project to bring in technology in solving the problem of item availables room and price in a hotel

## Technologies Used
-  "node" 
-  "body-parser": "^1.20.1",
-  "cors": "^2.8.5",
-  "dotenv": "^16.0.3",
-  "express": "^4.18.2",
-  "mongoose": "^6.9.1",
-  "morgan": "^1.10.0",
-  "postman",
-  "nodemon",
-  "bcrypt": "^5.1.0"
-  "express-async-handler": "^1.2.0",
-  "joi": "^17.7.1",
-  "jsonwebtoken": "^9.0.0",



## Features
- Creation of room users with specific roles(guest and admin)
- Creation of room types
- Creation of rooms
- Allocation of room type to each room, etc,
- define functionality for users
- use of joi for validation of data request 
- Hashing of user password with bcrypt technology/middleware
- use of jsonwebtoken to control/restrict route access


## Setup
-To use fork repository, ensure node installed installed in your local machine and have npm running also
-Fork repository and run "npm install"; to install all dependencies

## Usage
`npm install`
`npm start ` or `nodemon`
 postman/thunderclient vscode extension

- POST "{baseUrl}/api/v1/signup": signing in users
- POST "{baseUrl}/api/v1/login" : logging in users
- GET "{baseUrl}/api/v1/users" : To fetch all users
- PUT "{baseUrl}/api/v1/rooms/:id": Edit/patch all roomtypes.
- PUT "{baseUrl}/api/v1/rooms/:id": Edit/patch a room by id.
- POST "{baseUrl}/api/v1/rooms": Creates new room.
- GET "{baseUrl}/api/v1/rooms/:id": fetches a room by id.
- DELETE "{baseUrl}/api/v1/rooms/:id": Deletes a room by its 
- POST "{baseUrl}/api/v1/rooms-types": Creates new roomType.


## Expected Output
https://github.com/giftibe/Hotel-Management-API/tree/main/images

## Acknowledgements
- This project was inspired by Genesys Tech Hub/Laearnable 23
- Many thanks to all who made this possible continue to do so as we build


## Contact
Created by [@Gift Ibe](giftibe62@gmail.com) - feel free to contact me!
