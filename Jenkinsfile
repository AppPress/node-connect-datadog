library 'jenkins-shared-library'

pipeline {
    options{
        ansiColor('xterm')
        disableConcurrentBuilds()
    }

    agent {
        node {
            label "swarm2"
        }
    }

    environment {
        GITHUB_TOKEN = credentials("github-credentials-token")
        GITHUB_CREDS = credentials("github-credentials")
        GIT_USERNAME = "${env.GITHUB_CREDS_USR}"
        GIT_PASSWORD = "${env.GITHUB_CREDS_PSW}"
    }

    parameters {
        choice(name: 'NEW_VERSION', choices: ['patch', 'minor', 'major'], description: 'The new version to be published')
    }


    stages {
        stage ("Publish") {
            steps {
                writeNpmConfig()
                sh "docker build . -t connect-datadog-publish && docker run -e GITHUB_TOKEN -e GIT_USERNAME -e GIT_PASSWORD -e NEW_VERSION=${params.NEW_VERSION} connect-datadog-publish"
            }
        }
    }

    post {
        fixed {
            script {
                shared.notifyTeams('SUCCESS', 'https://outlook.office.com/webhook/5e7df867-fb74-47ec-ad49-0f69e9067f72@94d278d4-98ce-45e5-98f5-8a7297697dc1/JenkinsCI/f47e4d5b144f42688223d459750b8084/ad74ba70-f060-4706-97c3-22f342f4f121')
            }
        }
        failure {
            script {
                shared.notifyTeams('FAILED', 'https://outlook.office.com/webhook/5e7df867-fb74-47ec-ad49-0f69e9067f72@94d278d4-98ce-45e5-98f5-8a7297697dc1/JenkinsCI/f47e4d5b144f42688223d459750b8084/ad74ba70-f060-4706-97c3-22f342f4f121')
            }
        }
    }

}


def writeNpmConfig() {
 sh """
 echo "//npm.pkg.github.com/:_authToken=$GITHUB_TOKEN" > .npmrc
 echo "@mergermarket:registry=https://npm.pkg.github.com" >> .npmrc
 """
}
