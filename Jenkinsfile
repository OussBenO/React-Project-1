pipeline {
    agent any
    environment {
        DOCKER_IMAGE = 'oussb9/vite-react-app:latest' 
        DOCKER_CREDENTIALS_ID = 'dockerhub-credentials' 
        NODE_VERSION = '18' 
    }
    stages {
        stage('Checkout Code') {
            steps {
                echo 'Vérification du code source...'
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installation des dépendances...'
                sh '''
                    # Vérification et installation de NVM si nécessaire
                    if [ ! -d "$HOME/.nvm" ]; then
                        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
                    fi
                    . ~/.nvm/nvm.sh
                    nvm install ${NODE_VERSION}
                    nvm use ${NODE_VERSION}
                    npm install
                    node -v
                    npm -v
                '''
            }
        }
        stage('Lint Code') {
            steps {
                echo 'Analyse du code...'
                sh '''
                    . ~/.nvm/nvm.sh && nvm use ${NODE_VERSION}
                    npm run lint
                '''
            }
        }
        stage('Build App') {
            steps {
                echo 'Construction de l\'application...'
                sh '''
                    . ~/.nvm/nvm.sh && nvm use ${NODE_VERSION}
                    npm run build
                '''
            }
        }
        stage('Build Docker Image') {
            steps {
                echo 'Construction de l\'image Docker...'
                sh '''
                    docker build -t ${DOCKER_IMAGE} .
                    docker --version
                    docker images
                '''
            }
        }
        stage('Push Docker Image to DockerHub') {
            steps {
                echo 'Push de l\'image Docker sur DockerHub...'
                withDockerRegistry([credentialsId: "${DOCKER_CREDENTIALS_ID}", url: '']) {
                    sh 'docker push ${DOCKER_IMAGE}'
                }
            }
        }
        stage('Deploy to Remote Server') {
            steps {
                echo 'Déploiement sur le serveur distant...'
                sshagent(['remote-server-credentials']) {
                    sh '''
                        ssh -v user@remote-server-address
                        ssh user@remote-server-address << EOF
                        docker pull ${DOCKER_IMAGE}
                        docker stop vite-react-app || true
                        docker rm vite-react-app || true
                        docker run -d -p 3000:3000 --name vite-react-app ${DOCKER_IMAGE}
                        EOF
                    '''
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline exécutée avec succès !'
        }
        failure {
            echo 'Échec de la pipeline.'
        }
    }
}
