## App Context
I developed a song rating app where users can rate the songs from their spotify account data, even listen to song previews. In able to get data from spotify, I used the Spotify API to require users authorization this will enable the app to get the data or songs that will be rated by the users.

## Key Functionalities
**App Functionalities**
- Stateless Token-Based Authentication using JSON Web Token
- OAuth 2.0 Authorization
- Data Hydration and State Management
- Spotify Track Rating
- Track Preview Player

**Accessibility Functionalities** 
- Experimental Page Layout
- Mobile Responsiveness
- Theme Toggle
- Skeleton and Alerts
- Component Animations

## What's Inside
**Dependencies**
| Package | Purpose |
| --- | --- |
| `@tailwindcss/vite` | High Performance Development |
| `axios` | HTTP Client |
| `react-router-dom` | Dynamic Client-Side Routing |
| `tailwindCSS` | Utility First Styling |
| `zustand` | State Management |
| `motionJS` | UI Animation |

**Folder Structure**  
```
src/
├── assets         # Images 
├── components     # Reusable and standalone components
├── hooks          # Component and states event handlers
├── pages          # Individual routes screens or UI
├── services       # Axios instance and HTTP requests
├── stores         # Zustand state management
├── styles         # Stateful component styles
```

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
