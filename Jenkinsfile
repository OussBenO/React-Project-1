pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "oussb9/vite-react-app"  // Remplacez par votre dépôt DockerHub
    }

    stages {
        stage('Checkout Code') {
            steps {
                echo 'Cloning repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }

        stage('Lint Code') {
            steps {
                echo 'Running ESLint to check code quality...'
                sh 'npm run lint'
            }
        }

        stage('Build App') {
            steps {
                echo 'Building the React app with Vite...'
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                sh "docker build -t $DOCKER_IMAGE:latest ."
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                echo 'Pushing Docker image to DockerHub...'
                withCredentials([string(credentialsId: 'dockerhub-password', variable: 'DOCKER_PASSWORD')]) {
                    sh "echo $DOCKER_PASSWORD | docker login --username oussb9 --password-stdin"
                    sh "docker push $DOCKER_IMAGE:latest"
                }
            }
        }

        stage('Deploy to Remote Server') {
            steps {
                echo 'Deploying the app to a remote server...'
                sh 'scp docker-compose.yml user@remote-server:/path/to/deploy'
                sh 'ssh user@remote-server "docker-compose up -d"'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed. Check logs for details.'
        }
    }
}
