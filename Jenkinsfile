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
                shared.notifyTeams('SUCCESS', 'https://outlook.office.com/webhook/5b6e68a5-2765-4cf2-830e-ba10b5658c14@94d278d4-98ce-45e5-98f5-8a7297697dc1/JenkinsCI/c926fddf8b894afaa5b1346071aca307/13e3d529-3a09-4725-a485-38b711eb5cd8')
            }
        }
        failure {
            script {
                shared.notifyTeams('FAILED', 'https://outlook.office.com/webhook/5b6e68a5-2765-4cf2-830e-ba10b5658c14@94d278d4-98ce-45e5-98f5-8a7297697dc1/JenkinsCI/c926fddf8b894afaa5b1346071aca307/13e3d529-3a09-4725-a485-38b711eb5cd8')
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
