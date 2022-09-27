FROM node:lts-stretch as build

# Set the working directory
WORKDIR /usr/local/app

# Add the source code to app
COPY ./ /usr/local/app/

# Install all the dependencies
RUN npm install

#RUN apt-get update -yqq && \
#    apt-get install -yqq --no-install-recommends openjdk-8-jre-headless && \
#    rm -rf /var/lib/apt/lists/*

#RUN npm config set unsafe-perm true && \
#    npm install -g sonarqube-scanner && \
#    sonar-scanner --version

# Generate the build of the application
RUN npm run build

RUN cd dist
RUN ls -la

#RUN sonar-scanner \
#  -Dsonar.projectKey=frontend \
#  -Dsonar.sources=. \
#  -Dsonar.host.url=http://216.48.180.77:9000 \
#  -Dsonar.login=fa6f112eccfcabb3c176b6fb808d24b068c688bb

# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/SmartCityWebApp /usr/share/nginx/html
