# Node.js - React - SockJS chat

A simple chat application featuring Node.js as the backend server, SockJS for
handling socket connections and React on the frontend handling view updates.

Setup:

    $ npm install -g concurrently webpack-dev-server
    $ npm install

For running development server:

    $ npm run-script watch

Browse to http://localhost:3000/
Note: Node.js is running on port 8080, requests from the client are proxied by webpack-dev-server
