## App Context
I developed a song rating app where users can rate the songs from their spotify account data, even listen to song previews. In able to get data from spotify, I used the Spotify API to require users authorization this will enable the app to get the data or songs that will be rated by the users.

## Logging In The App
_Note: In this project we will use my spotify data for presentation purposes only. I provided an instruction below if you want to authorize your spotify account and use your own data._
1. Email: uno@gmail.com
2. Password: admin@123

## How To Run The App Locally
_Note: Because Spotify API limits user authorization to 5 users in Development Mode and requires manual whitelisting for testers, it's best to create a clone of this to your local repository and create your own spotify client id and secret so you can use the features of this app with your own data._
1. Install and Configure Frontend
```
git clone git@github.com:uno-arce/music-app-react.git
cd (your repo folder)
npm install
```
2. Install and Configure Backend
```
git clone git@github.com:uno-arce/music-app-api.git
cd (your repo folder)
npm install
```
  - Once installed, open the .env.guest file as you will define your own env variable
  - Rename the file to .env, and input your mongodb uri, jwt secret, spotify client id, and spotify client secret (Proceed to step 3 and 4)
3. Get Spotify Credentials
  - Go to https://developer.spotify.com/ and login your spotify account
  - Go to dashboard and create an app, any app name can do
  - Get your client id and client secret and paste it in your env file
  - Go to dashboard and edit the Website Url to http://localhost:5173/
  - Edit the Redirect URI to http://127.0.0.1:4000/auth/spotify/callback
4. Get MongoDB URI
  - Go to https://account.mongodb.com/account/login and login your mongodb account
  - Create or connect to your cluster
  - Go to drivers and get your mongodb uri
5. Run the frontend and backend to your local machine
  - Create a new account and login
  - Authorize your spotify account and see your own data
  - Start rating your tracks and listen to track previews
## What's Inside
**Folder Structure**  
-- src <br/>
&emsp;-- assets  
&emsp;-- components   
&emsp;-- hooks  
&emsp;-- pages  
&emsp;-- services  
&emsp;-- stores  
&emsp;-- styles

**Dependencies**
- React/Vite
- React Router
- Axios
- Zustand
- TailwindCSS
- MotionJS

## Functionalities
**Key Functionalities**
- User Authententication
- API Authorization
- Data Hydration and State Management
- Spotify Track Rating
- Track Preview Player

**Accessibility Functionalities** 
- Experimental Page Layout
- Mobile Responsiveness
- Theme Toggle
- Skeleton and Spinners
- Component Animations
