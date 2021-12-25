# Setup

### Prerequisites
- You have to have yarn installed:
run `corepack enable`.
(If fails run `npm i -g corepack` and run `corepack enable`)

- you have to have docker and docker-compose

### initial setup
- For best experience open `frontend` and `backend` in separate ide projects

- From backend project run `docker-compose up`, this will start the mongo

- From backend project run once `yarn installPackages`

### running in dev mode
- to start both backend and frontend with dev watch `yarn both:dev`. 

- access `localhost:3000` in browser
