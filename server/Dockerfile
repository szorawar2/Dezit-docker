# ---- Build React Client ----
FROM node:22 AS client-build
WORKDIR /client
COPY ./client .  
RUN npm install
RUN npm run build

# Use official Node.js image
FROM node:22

# Create app directory
WORKDIR /app/server

# Copy package.json and install dependencies
COPY ./server/package*.json ./
RUN npm install

# Copy app source
COPY ./server .

COPY --from=client-build /client/dist /app/client/dist

# Expose port
EXPOSE 5000

# Start the app
CMD ["node", "index.js"]
