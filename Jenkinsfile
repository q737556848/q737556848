pipeline {
    agent none
    stages {
        stage('Build') { 
            agent {
                docker {
                    image 'node:16-slim'  // 如果没有镜像，会自动下载镜像，寿命短，用完即销毁，不需要我们自己在服务器中主动下载，https://www.jenkins.io/zh/doc/tutorials/build-a-node-js-and-react-app-with-npm/#%E5%B0%86%E4%BD%A0%E7%9A%84%E5%88%9D%E5%A7%8B%E6%B5%81%E6%B0%B4%E7%BA%BF%E5%88%9B%E5%BB%BA%E4%B8%BAjenkinsfile
                    args '-p 3000:3000' 
                }
            }
            steps {
                sh 'npm install pnpm -g' 
                sh 'npm install vite -g'
                sh 'npm install vue-tsc -g'
                sh 'pnpm install'
                sh 'rm -rf ./dist' // 清空防止缓存
                sh 'pnpm build:app'
            }
        }
        stage('Deploy') {
            agent any
            steps {
                // 需要映射jenkins容器的数据卷路径 /home/www_home/html
                sh 'mkdir -p /home/www_home/html/ && cp -r ./app/dist/* /home/www_home/html/'
            }
        }
    }
}