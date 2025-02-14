# Video Processor API

This project is part of a video processing solution, and consists in a application built with Node.js, TypeScript, and Prisma. It is responsible for video uploading videos and start processing flow by sending the process request to the messaging queue.

Table of Contents
- Architecture overview
- Installation
- Usage
- Scripts
- Environment Variables
- Project Structure
- License

## Architecture overview

### General overview
![image](https://github.com/user-attachments/assets/52c2524f-07f1-481d-94e3-c3ea4d522682)

### Video processor api Endpoints overview
![image](https://github.com/user-attachments/assets/341757c0-fa93-4a14-a2fe-8b74ba0a52cb)

## Installation

1. Clone the repository:
``` bash
git clone https://github.com/your-username/video-processor.git
cd video-processor
```

2. Install dependencies:
``` bash
yarn install
```

3. Set up the environment variables:
  Create a .env file in the root directory and add the following variables:
```env
DATABASE_URL=mysql://your-string-conection
VIDEO_PROCESSOR_QUEUE_URL=https://your-sqs-queue
CLOUD_ACCESS_KEY=your-cloud-access-key
CLOUD_SECRET_KEY=your-cloud-secret-key
CLOUD_STORAGE_BUCKET=your-bucket
CLOUD_REGION=your-cloud-region
AUTH_PROVIDER_CLIENT_ID=your-auth-provider-client-id
AUTH_PROVIDER_USER_POOL_ID=your-auth-provider-user-pool-id
```

4. Generate Prisma client:
```bash
yarn db:generate
```

5. Run database migrations:
```bash
yarn db:migrate
```

6. Seed the database:
```bash
yarn db:seed
```

## Usage

To start the application in development mode:
```bash
yarn dev
```

To build the application:
```bash
yarn build
```

To start the application in production mode:
```bash
yarn start
```

## Scripts
```
yarn dev: Start the application in development mode.
yarn db:generate: Generate Prisma client.
yarn db:format: Format Prisma schema.
yarn db:seed: Seed the database.
yarn db:migrate: Run database migrations and generate Prisma client.
yarn db:create: Create a new migration.
yarn start: Run database migrations, seed the database, and start the application.
yarn build: Build the application.
yarn test: Run tests with coverage.
yarn test:coverage: Run tests with coverage using c8.
yarn test:bdd: Run BDD tests using Cucumber.
```
## Environment Variables

The application requires the following environment variables:
```env
DATABASE_URL: The database connection string.
VIDEO_PROCESSOR_QUEUE_URL: The URL of the SQS queue for video processing.
CLOUD_ACCESS_KEY: The access key for cloud storage.
CLOUD_SECRET_KEY: The secret key for cloud storage.
CLOUD_STORAGE_BUCKET: The name of the cloud storage bucket.
CLOUD_REGION: The region of the cloud storage.
AUTH_PROVIDER_CLIENT_ID: The client ID for the authentication provider.
AUTH_PROVIDER_USER_POOL_ID: The user pool ID for the authentication provider.
```
## Project Structure
```
.
├── .dockerignore
├── .env
├── .github/
│   └── workflows/
├── .gitignore
├── coverage/
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── lcov-report/
│   └── lcov.info
├── docker-compose.yml
├── Dockerfile
├── infra/
│   ├── .terraform/
│   ├── main.tf
│   └── terraform.tfstate
├── jest.config.js
├── k8s/
│   ├── config-map.yaml
│   ├── deployment.yaml
│   ├── hpa.yaml
│   ├── namespace.yaml
│   └── service.yaml
├── package.json
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   ├── seed.ts
│   └── seeders/
├── src/
│   ├── data/
│   ├── domain/
│   ├── infra/
│   ├── main/
│   └── presentation/
├── tests/
├── tsconfig.build.json
└── tsconfig.json
```

## License
This project is licensed under the MIT License. See the LICENSE file for details.
