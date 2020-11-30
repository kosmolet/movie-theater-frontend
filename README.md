
[![Actions Status](https://github.com/kosmolet/movie-theater-frontend/workflows/Cinema%20frontend/badge.svg?branch=main)](https://github.com/kosmolet/movie-theater-frontend/actions) [![Actions Status](https://github.com/kosmolet/movie-theater-frontend/workflows/Run%20Lint/badge.svg?branch=main)](https://github.com/kosmolet/movie-theater-frontend/actions)    
  [![Netlify Status](https://api.netlify.com/api/v1/badges/4fe9ed6a-931f-415c-ad69-3d2a239af4a7/deploy-status)](https://app.netlify.com/sites/moviestaden/deploys)  
## movie-theater-frontend  

# Frontend for Moviestaden cinema app  

Deployed to https://moviestaden.netlify.app/  

### Built with the MERN stack along with React Context API for state management.


### Tech
`React` with `hooks` JavaScript library for building user interfaces and UI components    
`Context API` for state management in React  
`Mongoosejs` with `MongoDB` for database management   
`Express Server` back end web application framework for Node.js
`NodeJS` JavaScript runtime environment  
`Stripe` Online payment processing for internet businesses to accept payments from cinema visitors  
`i18n` translation module with dynamic JSON storage to localize app to EN, SV, BY, RU languages  
`emailj` to send emails after ticket purchased  
`Supertest`, `Mocha`, `Chai` and `Jest` for TDD  


### Setup  
Download and run backend part of the project: [backend](https://github.com/kosmolet/movie-theater-backend)

Install all dependencies and create environment variables for frontend app:  
```sh
$ npm install
$ npm start
```
Create accounts on `TMDB_API`,  
`EMAILJS`(account and template for email, `SENDGRID`)  
`STRIPE` accounts
and add variables to `.env` file in the root directory with the following fields:  

REACT_APP_TMDB_API_KEY="APIkeyhere"  
REACT_APP_BASE_URL="http://localhost:YOURPORT/api/v1/"  
REACT_APP_EMAILJS_USERID="user_other1numbers"  
REACT_APP_TEMPLATE_ID="template_other1numbers"  
REACT_APP_SERVICE_ID="service_other1numbers"  
REACT_APP_SENDGRID_API="SG.other1numbers"  
REACT_APP_STRIPE_SK_PUBLIC='here_your_public_key"  

### User Stories

