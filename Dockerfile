# get the base node image
FROM node:alpine as builder

# set the working dir for container
WORKDIR /chiendo123/ui-admin-edustar

# copy the json file first
COPY ./package.json /chiendo123/ui-admin-edustar

# install npm dependencies
RUN npm install -f

# copy other project files
COPY . .
EXPOSE 3000

# build the folder
CMD [ "npm", "run", "start" ]