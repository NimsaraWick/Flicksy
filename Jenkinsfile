pipeline{
    agent any 

    parameters{
        choice(name:'Environment', choices:['PROD','DEV','QA'], description:'Select the environment to deploy to')
    }
    stages {
        stage ('check the ENV'){
            steps{
                script {
                    if (params.Environment == 'PROD'){
                        echo "Deployment in prod"
                    }
                    else if (params.Environment == 'DEV'){
                        echo "deployment in dev"
                    }
                }
            }
        }

        stage ('SCM Checkout'){
            steps{
                retry(3){
                    git branch: 'CICD', url: 'https://github.com/NimsaraWick/Flicksy'
                    
                }
            }
        }
        stage ('Build Docker Image') {
            steps{
                bat 'docker build -t nimsarawick/flicksy:%BUILD_NUMBER% .'
            }
        }
        stage ('Login to Docker Hub'){
            steps{
                withCredentials([string(credentialsId: 'flicksy_dockerhub_id', variable: 'flicksy_secret_txt')]) {
                    script{
                        bat "docker login -u nimsarawick -p ${DOCKER_PASS}"
                        // bat "echo %DOCKER_PASS% | docker login -u nimsarawick --password-stdin"
                    }
                }
            }
        }
        stage('push image'){
            steps{
                bat "docker push nimsarawick/flicksy:%BUILD_NUMBER%"
            }
        }
    }
    post{
        success{
            echo 'build successs!'
        }
        failure{
            echo 'build failed!'
        }
        always{
            bat 'docker logout'
            echo 'great keep it up!'
        }
    }
}