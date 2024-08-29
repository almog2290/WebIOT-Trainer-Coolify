# KneeTherapy System

## Introduction
KneeTherapy is an innovative system designed for real-time monitoring and display of knee training exercises. It aims to assist users in their recovery journey by providing live feedback and analytics on their training sessions.

## Features
- Real-time monitoring of knee training exercises.
- Display of live training sessions.
- Analytics dashboard showcasing the 10 best workouts.
- MVP-based dashboard design for easy navigation and understanding.

## Technology Project
- **Frontend Project**: [Frontend README](./webIOTReactFront/README.md)
- **Backend Project**: [Backend README](./webIOTServerExpressJS/README.md)

## Key Features
- **Automated Cooling**: Automatically adjusts cooling levels based on real-time temperature data.
- **IoT Integration**: Seamlessly connects with IoT devices for efficient monitoring and control.
- **Docker Compose Deployment**: Simplifies the deployment process, making it easy to scale and maintain.

## Technology Stack
- **Docker Compose**: For orchestrating and managing multi-container Docker applications.
- **IoT Devices**: Basic utilizes various IoT devices for monitoring and controlling cooling systems.
- **Coolify**: An essential tool for deploying and managing Dockerized applications with ease, enhancing the project's scalability and deployment efficiency.

## Environment Variables Setup
To properly configure the server, please set environment variables.

#### For kneeTrainerAPI (Backend):
```markdown
BROKER_URL=mqtt://url.com
CLIENT_ID=id_number
USERNAME=user
PASSWORD=1234
KEEPALIVE=300
TOPIC1=/sessionReport
TOPIC2=/sessionLive
```

#### For kneeTrainerClient(Frontend):
```markdown
REACT_APP_API_URL=http://localhost:5000
```

