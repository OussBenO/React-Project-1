pipeline {
    agent any
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_IMAGE = 'oussb9/vite-react-app'
    }
    stages {
        stage('Checkout') {
            steps {
                // Récupération du code source
                git branch: 'main', url: 'https://github.com/OussBenO/React-Project-1'
            }
        }
        stage('Build') {
            steps {
                // Installation des dépendances et build
                sh 'npm install'
                sh 'npm run build'
            }
        }
        stage('Unit Tests') {
            steps {
                // Exécution des tests unitaires
                sh 'npm test'
            }
        }
        stage('Docker Build') {
            steps {
                // Construction de l'image Docker
                sh """
                    docker build -t $DOCKER_IMAGE:latest .
                """
            }
        }
        stage('Docker Push') {
            steps {
                // Pousser l'image vers DockerHub
                sh """
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    docker push $DOCKER_IMAGE:latest
                """
            }
        }
        stage('Deploy to Remote Server') {
            steps {
                // Déployer l'image sur un serveur distant
                echo 'Deploying to remote server...'
                // Ajouter les étapes spécifiques de déploiement ici
            }
        }
    }
    post {
        always {
            // Clean up Docker images après le build
            sh 'docker rmi $DOCKER_IMAGE:latest'
        }
    }
}
