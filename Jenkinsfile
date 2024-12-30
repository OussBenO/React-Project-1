pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'oussb9/vite-react-app'
    }
    stages {
        stage('Checkout') {
            steps {
                // Checkout code from GitHub repository
                git branch: 'main', url: 'https://github.com/OussBenO/React-Project-1'
            }
        }
        stage('Build') {
            steps {
                // Install dependencies and build the project
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Unit Tests') {
            steps {
                // Run unit tests
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                // Build Docker image
                sh """
                    docker build -t $DOCKER_IMAGE:latest .
                """
            }
        }
        stage('Docker Push') {
            steps {
                // Push Docker image to DockerHub
                sh """
                    echo \$DOCKERHUB_CREDENTIALS_PSW | docker login -u \$DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker push $DOCKER_IMAGE:latest
                """
            }
        }
        stage('Deploy to Remote Server') {
            steps {
                // Deploy image to remote server
                echo 'Deploying to remote server...'
                // Add specific deployment steps here
            }
        }
    }
    post {
        always {
            // Cleanup Docker images after the build
            sh 'docker rmi $DOCKER_IMAGE:latest'
            // Remove dangling images to free up space
            sh 'docker image prune -f'
        }
    }
}
