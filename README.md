# Chat App

The app provides users with a chat interface and options to share images and their locations.

## Key Features ##
- User Registeration: A page where users can enter their name and choose a background color for the chat screen before joining the chat. 
- Chat display: A page displaying the conversation, as well as an input field and submit button.
- Additional Communication Features: The chat must provide users with two additional communication features: sending images and location data.
- Data Storage: Data gets stored online and offline.

## User Stories ##
- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

## Tech Stack ##
- React Native
- Gifted Chat
- Expo
- Firebase & Firestore
    - Firebase Authentication for anonymous sign-in
    - Firestore Database for storing messages
    - Firebase Storage for storing images
## Setting up ##
### Environment Setup ###
install node and expo
    $ npm install node 
    $ npm install -g expo-cli
### Database ###
- using firebase as a database for the chat and the images
    https://firebase.google.com/
### Set up ###
- Clone the GitHub repository https://github.com/chrisdvadashanta/Chat-Application/archive/refs/heads/main.zip
- "app.js" file: replace the existing "firebaseConfig" object with the configuration object obtained from       Firebase.
- Start the project with:
$ expo start
- use the Expo Go app to run the mobile app with XCode or AndroidStudio on you Device or on a mobile Device by scanning the Code from the expo start command.