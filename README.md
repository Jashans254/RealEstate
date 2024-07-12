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

 