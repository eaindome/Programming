# Base Image
FROM node:19-alpine  

# Create app directory
COPY package*.json /usr/app/
# Set the working directory.
COPY src /usr/app/

# cd into the working directory.
WORKDIR /usr/app

# Run the command inside your image filesystem.
RUN npm install

# start app
CMD ["node", "server.js"]

