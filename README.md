
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


> Visitors of the website can enjoy movies on the Home page. Movies partially fetched from TMDB API and from the Database. Movies are presented with a carousel rows and 
> interactive Movie Cards. Ticket purchases are available for movies from database which are in `Movies Now` row.   

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780803/readmeMoviestaden/0mc_noeqeu.jpg)  

 > Movie is randomly picked up from the data base and shown in the banner. To proceed to `Movie Details` page user should click on the movie card or follow to the next page by `Buy Tickets` button on the banner  
 
![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780803/readmeMoviestaden/1mc_iedvik.jpg)    

> User can filter both categories of TMDB and DB movies by using a search on the Moviestaden website

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606781239/readmeMoviestaden/3ms_xlshyb.jpg)  

> On `Movie Details` page: visitor can read overview, select available ShowTime and watch youtube movie trailers

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780803/readmeMoviestaden/3msb_yfyoes.jpg) 

> Showtimes, which are in the future, are available in the dropdown for the filtering  

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780803/readmeMoviestaden/4ms_cdu0oz.jpg)  

> Once Showtime is chosen user navigates to the `Seats Selection` page to pick up the best seats before others will do it  

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780803/readmeMoviestaden/5ms_lgm4ow.jpg)  

> After seats are selected user will proceed to `Order Confirmation` step to enter Email,Name and proceed to checkout page  

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780804/readmeMoviestaden/6ms_muafia.jpg)   

> User is redirected to the Stripe payment page with the pre-populated order details and user email. `Payment page` is also translated according to the selected language  

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606781862/readmeMoviestaden/pay_uotzzw.jpg)  

> After the payment session is completed user will be redirected to the localized `Failure or Success` page with the ticket details. 

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606780803/readmeMoviestaden/7ms_tnbrwc.jpg)

> Email confirmation will be sent to the user after the successful purchase  

![img](https://res.cloudinary.com/dnkftif1n/image/upload/v1606782238/readmeMoviestaden/email_xur1jn.jpg)

