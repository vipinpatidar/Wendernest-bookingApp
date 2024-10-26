# Wandernest - Full Stack MERN App

## Live At

https://wandernest-booking-vipin.netlify.app/

Wandernest is a full-stack MERN (MongoDB, Express.js, React, Node.js) hotel booking application that allows users to search and book hotel rooms according to their desired dates. The frontend is built with Vite React, providing a fast and modern user interface. Users can explore hotel images, check reviews, add their own hotels, and update them. The app supports filtering and searching hotels and places based on various criteria.

## Features

- Hotel Booking: Users can search and book hotel rooms based on their desired dates.
- Hotel Details: View hotel images and check reviews before booking.
- Hotel Management: Users can add their own hotels or update existing ones.
- Filtering and Searching: Filter hotels based on criteria like location, amenities, and price range.

## Installation

### Using Docker

<details>
<summary><code>client/Dockerfile</code></summary>

```Dockerfile

    ARG NODE_VERSION=20.11.0

   # Use the official Node.js 20-alpine as a base image
   FROM node:${NODE_VERSION}-alpine

   # Create app directory
   WORKDIR /app

   # Copy package.json and package-lock.json to take advantage of caching
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Build the Vite app for production
   # RUN npm run build

   # Expose the port that Vite will use
   EXPOSE 5173

   # Start the Vite development server
   CMD ["npm", "run", "dev"]

```

</details>
<details>
<summary><code>api/Dockerfile</code></summary>

```Dockerfile


   ARG NODE_VERSION=20.11.0

   FROM node:${NODE_VERSION}-alpine

   # Set working directory
   WORKDIR /app

   # Copy package.json and package-lock.json
   COPY package*.json ./

   # Install dependencies
   RUN npm install

   # Copy the rest of the application code
   COPY . .

   # Expose the application port
   EXPOSE 8080

   # Start the backend server
   CMD ["npm", "start"]

```

</details>

#### add a .env file in client directory with environment variables like

      #VITE_SERVER_URL=http://localhost:3000

#### add a .env file in api directory with environment variables like

         #PORT=8080
         #MONGODB_URL=your mongodb url
         #JWT_SECRET=jwt secret key

<details>
<summary><code>docker-compose.yaml</code></summary>

```dockerfile

# specify the version of docker-compose
version: "3.8"

# define the services/containers to be run
services:
  # define the frontend service
  # we can use any name for the service. A standard naming convention is to use "web" for the frontend
  web:
    # we use depends_on to specify that service depends on another service
    # in this case, we specify that the web depends on the api service
    # this means that the api service will be started before the web service
    depends_on:
      - api
    # specify the build context for the web service
    # this is the directory where the Dockerfile for the web service is located
    build: ./client
    # specify the ports to expose for the web service
    # the first number is the port on the host machine
    # the second number is the port inside the container
    ports:
      - 5173:5173
    # specify the environment variables for the web service
    # these environment variables will be available inside the container
    env_file:
      - ./client/.env

      # add a .env file in the client directory with environment variables like
      #VITE_SERVER_URL=http://localhost:3000

    # this is for docker compose watch mode
    # anything mentioned under develop will be watched for changes by docker compose watch and it will perform the action mentioned
    develop:
      # we specify the files to watch for changes
      watch:
        # it'll watch for changes in package.json and package-lock.json and rebuild the container if there are any changes
        - path: ./client/package.json
          action: rebuild
        - path: ./client/package-lock.json
          action: rebuild
        # it'll watch for changes in the client directory and sync the changes with the container real time
        - path: ./client
          target: /app
          action: sync

  # define the api service/container
  api:
    # api service depends on the db service so the db service will be started before the api service
    depends_on:
      - db

    # specify the build context for the api service
    build: ./api

    # specify the ports to expose for the api service
    # the first number is the port on the host machine
    # the second number is the port inside the container
    ports:
      - 3000:3000

    # specify environment variables for the api service
    # for demo purposes, we're using a local mongodb instance
    env_file:
      - ./api/.env

      # add a .env file in the api directory with environment variables like
      #PORT=3000
      #MONGODB_URL=your mongodb url
      #JWT_SECRET=jwt secret key

    # establish docker compose watch mode for the api service
    develop:
      # specify the files to watch for changes
      watch:
        # it'll watch for changes in package.json and package-lock.json and rebuild the container and image if there are any changes
        - path: ./api/package.json
          action: rebuild
        - path: ./api/package-lock.json
          action: rebuild

        # it'll watch for changes in the api directory and sync the changes with the container real time
        - path: ./api
          target: /app
          action: sync

  # define the db service
  db:
    # specify the image to use for the db service from docker hub. If we have a custom image, we can specify that in this format
    # In the above two services, we're using the build context to build the image for the service from the Dockerfile so we specify the image as "build: ./frontend" or "build: ./backend".
    # but for the db service, we're using the image from docker hub so we specify the image as "image: mongo:latest"
    # you can find the image name and tag for mongodb from docker hub here: https://hub.docker.com/_/mongo
    image: mongo:latest

    # specify the ports to expose for the db service
    # generally, we do this in api service using mongodb atlas. But for demo purposes, we're using a local mongodb instance
    # usually, mongodb runs on port 27017. So we're exposing the port 27017 on the host machine and mapping it to the port 27017 inside the container
    ports:
      - 27017:27017

    # specify the volumes to mount for the db service
    # we're mounting the volume named "bookingAppDB" inside the container at /data/db directory
    # this is done so that the data inside the mongodb container is persisted even if the container is stopped
    volumes:
      - bookingAppDB:/data/db

# define the volumes to be used by the services
volumes:
  bookingAppDB:

```

</details>

#### Creating Images and container from .yaml file

1.  Running in watch mode

    docker-compose watch

2.  Without watch mode

    docker-compose up

3.  Stop and Remove containers

    docker-compose down

### Prerequisites

- Node.js and npm installed globally.
- MongoDB instance.

## Backend Setup

1. Clone the repository:
   git clone https://github.com/yourusername/wandernest.git
2. Navigate to the backend directory:
   cd wandernest/backend
3. Install dependencies:
   npm install

4.Create a .env file in the backend directory and add the following variables:

MONGODB_URL=your_mongodb_connection_url
JWT_SECRET=your_jwt_secret
PORT=your_preferred_port_number

5. Start the backend server:npm start

## Frontend Setup

1. Navigate to the frontend directory:
   cd wandernest/frontend

2. Install dependencies:
   npm install

3. Create a .env file in the frontend directory and add the following variable:
   VITE_API_URL=http://localhost:your_backend_port

- Replace your_backend_port with the port number you specified in the backend setup.

4. Start the frontend development server:npm run dev

## Usage

- Open your browser and go to http://localhost:your_frontend_port.

- Replace your_frontend_port with the port number specified in the frontend setup.

- Explore hotels, view images, and read reviews.

- Book hotel rooms according to your desired dates.

- If you're a hotel owner, add your hotels or update existing ones.

- Use filtering and searching features to find hotels and places based on your preferences.

Happy travels with Wandernest! 🏨🌟
