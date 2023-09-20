FROM node:18-alpine
COPY . /monitoring-app
WORKDIR /monitoring-app

# Install npm modules
RUN npm i 

EXPOSE 3000:3000

# Start server
CMD ["node", "index.js"]
