# Mern-esate project using React (vite)
1. Create a folder named mern-esate(project name)
2. # Install React using vite
 In the terminal run 
> npm create vite@latest client
choose 
React
then
Javascript + SMC (for faster)
3. >cd client
   >npm i (ti install react, react -DOM etc.)

4. # Install Tailwind CSS 
  (a) > npm install -D tailwindcss postcss autoprefixer
  //downloads 2 files "tailwind.config.js" , "postcss.config.js".
  (b) > npx tailwindcss init -p
  Initialize these files

5. # Configure your template paths
  paste this in your "tailwind.config.js" file
/** @type {import('tailwindcss').Config} */
    export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
    }

6. Add the Tailwind directives to your CSS
  (Add the @tailwind directives for each of Tailwind’s layers to your ./src/index.css file.)

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

7. Start your build process
 > npm run dev    

 Now you can use tailwind css by adding its classes.

 crete a pages folder in assets
 pages like "home.jsx" , profile.jsx , about.jsx etc

 now in the client
  >npm i react-router-dom


//Create pages and routes
create header component
create and run the server
connect to the database
//create user model
create test api route
create signup api route
//create a middleware and a function to handle possible errors
1. create middleware in index.js
2. include next in auth.controller.js
3. create a util in api with file "error.js"to handle errors
// complete signup page UI
  "Signup.jsx"
//Add functionality to it
//added a handlesubmit so that we donot lose info . age won't get refreshed.
  