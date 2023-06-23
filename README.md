# NextJS (React Framework) Todo App with Firebase Auth and Firestore

## Installation
```bash
npm i
```
## Running

For running locally, create a `.env.local` on the root with the following values

```
FIREBASE_API_KEY=<From your firebase config>
FIREBASE_AUTH_DOMAIN=<From your firebase config>
FIREBASE_PROJECT_ID=<From your firebase config>
FIREBASE_STORAGE_BUCKET=<From your firebase config>
FIREBASE_MESSAGING_SENDER_ID=<From your firebase config>
FIREBASE_APP_ID=<From your firebase config>
```

To get the values for your own firebase connection:

1. Go to [Firebase Console](https://console.firebase.google.com/u/0/).
2. Create a project
![Name it however you want](image.png)
1. Add a web app to your project
![Name it however you want](image-1.png)
1. Register app
![Copy these values](image-2.png)

The values on red are the ones you need to put on your env file.

## Todo Demo

1. Dark/Light Mode (Not logged in)
![Dark Mode](dark.png)

![Light Mode](light.png)
   
2. Login (only Google OAuth)
![OAUTH](OAuth.png)
   
3. Home
![Read](TODO-LIST.png)
4. Creation
![Create](Create.png)
![Create](Created.png)
![Create](Toast-Create.png)
5. Deletion
![Delete](Delete.png)
![Delete](Deleted.png)
6. Update
![Toggle](Toggle.png)
![Update](Update.png)
![Update](Updated.png)