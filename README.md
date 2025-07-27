# PERSONAL HOMEPAGE 2025

This is the repository for my personal homepage, which is built using Next.js and NestJS.
The homepage is designed to showcase my projects, blog posts, and other personal content.
The homepage is hosted on Railway and uses Supabase for the database.

## Technologies Used

- **TypeScript**: For both frontend and backend development, ensuring type safety and better developer experience.
- **Tailwind CSS**: For styling the frontend, providing a modern and responsive design.
- **Prisma**: As the ORM for database interactions, simplifying data management and migrations.
- **PostgreSQL**: As the database, providing a reliable and scalable data storage solution
- **Next.js**: For the frontend, providing a fast and responsive user interface.
- **NestJS**: For the backend, offering a robust API to handle requests and manage data.
- **Vite**: For building the frontend, ensuring a smooth development experience with fast hot module replacement.
- **Supabase**: As the database solution, providing real-time capabilities and easy integration.
- **Docker**: For containerization, making it easy to deploy and manage the application.

## Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/personal-homepage-2025.git
   cd personal-homepage-2025
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Set up the environment variables:
   Create a `.env` file in the root directory and add the necessary environment variables. You can use the `.env.example` file as a reference.

4. Start the development server:
   ```bash
   pnpm dev
   ```
   will start both the website, admin and backend servers. The website will be available at `http://localhost:4200`, admin at `http://localhost:4300` and backend at `http://localhost:5000`.

## Run in Docker

To run the application in Docker, you can use the provided `docker-compose.yml` file. Make sure you have Docker and Docker Compose installed.

1. Copy the `env.example` file to `.env` in the root directory and update the environment variables as needed.

2. Run the following command to start the application:

   ```bash
   docker-compose up --build
   ```

3. The application will be available under addresses configured in `.env` file.

## Orchestration with Docker Swarm

To deploy the application using Docker Swarm, you can use the provided `docker.compose.stack.yml` file. Make sure you have Docker Swarm initialized.

1. Copy the `env.example` file to `.env` in the root directory and update the environment variables as needed.

2. Run the following command to deploy the application:

   ```bash
   env $(cat .env.prod | xargs) envsubst < docker-compose.stack.yml | docker stack deploy -c - --detach=true ph

   ```

3. The application will be available under addresses configured in swarm nodes parameters. Especially, variables `PUBLIC_URL`, `FRONTEND_URL` and `ADMIN_URL` should be set to the public addresses of the respective services in order to be accessible from outside the swarm and to meet CORS policy. Details are depending on your infrastructure.

4. Moreover, you can use the `visualizer` service to monitor the Docker Swarm cluster.

For example, if you want to test this setup with **[Play with Docker](https://labs.play-with-docker.com/)**, use current session url as _"localhost"_ in `.env.prod` file.

**Note**: The `docker.compose.stack.yml` file is designed to be run with minimal configuration. It uses hardcoded environment variables, which should be adjusted in production use, especially secrets, ie. `JWT_SECRET`.

## Orchestration with Kubernetes

**Note**: This is development version of the application, which is designed to be run in a Kubernetes cluster. For production use, using some key vault service is recommended to manage secrets instead of hardcoding them in the Kubernetes manifests.

To deploy the application using Kubernetes, you can use the provided `kubernetes` directory. Make sure you have a Kubernetes cluster set up and `kubectl` configured.

1. Prepare secrets for the application. You can create a secret with the following command:

   ```bash
   kubectl create secret generic app-credentials --from-literal=db_username=[your-postgres-username] --from-literal=db_password=[your-postgres-password] --from-literal=db_url=postgresql://[your-postgres-username]:[your-postgres-password]@app-db.ph.svc.cluster.local:5432/postgres?schema=public -n ph
   ```

   If you want to display applied secrets in convenient way, you can use the following command:

   ```bash
   kubectl get secret app-credentials -o json | jq -r '.data | to_entries[] | "\(.key): \(.value | @base64d)"'
   ```

   or edit credential directly in your editor:

   ```bash
   kubectl edit secret app-credentials -n ph
   ```

   This opens the secret in your default editor. The values are base64-encoded—edit them as needed, encoding new values to base64 first. For example, you can use the following command to encode a value:

   ```bash
   echo -n "your-value" | base64
   ```

2. Run the following command to initialize the app namespace:

   ```bash
   kubectl apply -f namespace.yml
   ```

3. If you want to use external database, please update environment variables in `kubernetes/website.yml`, `kubernetes/admin.yml`, and `kubernetes/backend.yml` files accordingly.

4. If you want to use the built-in PostgreSQL database, you can apply the `kubernetes/app-db.yml` file:

   ```bash
   kubectl apply -f kubernetes/app-db.yml
   ```

   This will create a PostgreSQL deployment and service in the `ph` namespace.

5. When creating database or after every change in the database schema, you need to run migrations. You can do this by applying the job in `kubernetes/app-migrator.yml` file:

   ```bash
   kubectl apply -f kubernetes/app-migrator-job.yml
   ```

   This will run the Prisma migrations in the `ph` namespace.

6. When db is ready, then is time to deploy other dependent apps:

   ```bash
   kubectl apply -f kubernetes/app.yml -f kubernetes/website.yml -f kubernetes/admin.yml
   ```
