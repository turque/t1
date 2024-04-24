pipeline {
  agent any

  environment {
    TAG_VERSION = "${env.BUILD_ID}.0"
  }

  stages {
    stage('Checkout source') {
      steps {
        git url: 'https://github.com/fernandokoj3/k8s-fair-api.git', branch: 'main'
      }
    }

    stage('Build Image') {
      steps {
        script {
          dockerapp = docker.build("koj3/fair-api:$TAG_VERSION",
            '-f ./Dockerfile .'
          )
        }
      }
    }

    stage('Push Image') {
      steps {
        script {
          // Doing login at dockerhub
          docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            dockerapp.push('latest')
            dockerapp.push("$TAG_VERSION")
          }
        }
      }
    }

    stage('Deploy on kubernetes') {
      steps {
        script {
          withEnv(["VERSION=${TAG_VERSION}"]) {
            sh '''
              grep -rl {{TAG_VERSION}} .kubernetes | xargs sed -i "s#{{TAG_VERSION}}#$VERSION#g"
            '''
          }
          withKubeConfig([credentialsId: "kubeconfig"]) {
            sh 'kubectl apply -f .kubernetes/ -R'
          }
        }
      }
    }
  }
}
