pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'oussb9/react-project-1:latest'
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials'  // DockerHub credentials ID
        NODE_VERSION = '18'
        GITHUB_CREDENTIALS_ID = 'github-credentials'  // Replace with your actual GitHub credentials ID in Jenkins
    }
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Checking out the source code from GitHub...'
                git credentialsId: "${GITHUB_CREDENTIALS_ID}", url: 'https://github.com/OussBenO/React-Project-1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                script {
                    if (isUnix()) {
                        // For Unix-based agents or WSL
                        sh 'npm install'
                    } else {
                        // For Windows agents
                        bat 'npm install'
                    }
                }
            }
        }

        stage('Build App') {
            steps {
                echo 'Building the application...'
                script {
                    if (isUnix()) {
                        // For Unix-based agents or WSL
                        sh 'npm run build'
                    } else {
                        // For Windows agents
                        bat 'npm run build'
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker image...'
                script {
                    if (isUnix()) {
                        // For Unix-based agents or WSL
                        sh """
                            docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD
                            docker build -t $DOCKER_IMAGE .
                        """
                    } else {
                        // For Windows agents
                        bat """
                            docker login -u %DOCKER_USERNAME% -p %DOCKER_PASSWORD%
                            docker build -t %DOCKER_IMAGE% .
                        """
                    }
                }
            }
        }

        stage('Push Docker Image to DockerHub') {
            steps {
                echo 'Pushing Docker image to DockerHub...'
                script {
                    if (isUnix()) {
                        // For Unix-based agents or WSL
                        sh 'docker push $DOCKER_IMAGE'
                    } else {
                        // For Windows agents
                        bat 'docker push %DOCKER_IMAGE%'
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline complete.'
        }
        success {
            echo 'Pipeline succeeded.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
