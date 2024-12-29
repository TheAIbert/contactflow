FROM node:alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install 
COPY . .
RUN npm run build

FROM node:alpine as run
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
COPY --from=build /app/package-lock.json ./
RUN npm install --only=production
EXPOSE 5173
CMD [ "npm", "run", "preview" ]

