
# Lairbnb

A lightweight clone of Airbnb, an online marketplace for short- and long-term homestays and experiences. <br>


# Technologies Used

<div style=display:flex>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sequelize/sequelize-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style=width:50px />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/visualstudio/visualstudio-plain.svg" style=width:50px />
</div>
<br>



# ScreenShots
##### Home Page
![home_page]
##### Individual Spot Page
![spot_page]
##### Sign-up Modal
![sign_up]


[home_page]: ../images/Screenshot%202023-11-26%20at%2012.57.31 AM.png
[sign_up]: ../images/Screenshot%202023-11-26%20at%2012.56.52 AM.png
[spot_page]: ../images/Screenshot%202023-11-26%20at%2012.58.03 AM.png

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Features](#features)
- [Contributing](#contributing)
  - [Code Contributions](#code-contributions)
  - [Bug Reports](#bug-reports)
- [License](#license)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## Getting Started
The following steps will allow you to run the app locally.

### Prerequisites
- Node.js (version 16.19.0)
- React (version 18.2.0)
- Redux (version 4.2.1)

### Installation

##### 1. Clone the repository:
    • git clone https://github.com/Stodtmeister/Lairbnb.git

##### 2. Navigate to the projects frontend and backend directory to install dependencies:
    • run "npm install"

## Usage
### Configuration

Create a `.env` file in the root directory.
Add the following variables:

    PORT=8000
    DB_FILE=db/dev.db
    JWT_SECRET= <<generate_strong_secret_here>>
    JWT_EXPIRES_IN=604800
    SCHEMA=lairbnb_schema

### Running the Application
##### 1. Run sequelize commands in the backend directory to migrate and seed your database:
    • npx dotenv sequelize db:migrate
    • npx dotenv sequelize db:seed:all

##### 2. Navigate to your backend directory in a terminal and run:
    • npm start

##### 3. Navigate to your front directory in a terminal and run:
    • npm start

## Features

## License

[MIT License](./license)

## Contact
