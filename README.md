# Node.js - React - SockJS chat

A simple chat application featuring Node.js as the backend server, SockJS for
handling socket connections and React on the frontend handling view updates.

## See it in action: [http://chat.trina.si/](http://chat.trina.si/)

## Setup:

    $ npm install -g concurrently webpack-dev-server nodemon
    $ npm install

## For running development server:

    $ npm run-script watch

In development, Node.js is running on port 8080, requests from the client are 
proxied to it by webpack-dev-server running on port 3000.

Browse to: 

    http://localhost:3000/

## For running production server:

    $ npm run-script production
    
With this command, all React files are bundled with webpack and a single Node.js server instance
runs at port 8080, serving the bundled files as static assets.

Browse to: 

    http://localhost:8080/
    
## Docker support

    $ docker-compose up -d

Mounts the files into a container and exposes port 8001.
