# 2018-03-10 Hackathon CI/CD @Cinteo - DRONE


## Short introduction

Most used jenkins before. And want to get in touch with drone, and some didn’t find the other groups 🤷‍♂️. Some where totally new and haven’t ever worked with. 

## What we are going to build?

* Create an AWS EC2 instance as a Docker host
* Ubuntu as a base
* Open Ports: 22, 443, 80
* Public IP: 18.197.25.150 

## Get into the AWS machine

Login to the machine and attach to the existing tmux session:

    ssh -i ~/.ssh/id_rsa.drone-workshop ubuntu@18.197.25.150
	tmux attach


## Install docker

Install the docker community version, follow the guide on: 
[https://docs.docker.com/install/linux/docker-ce/ubuntu/]

* Set up repository
* Install needed packages
* get the PGP key
* Install latest repo version

Finally install docker-ce:

	apt install docker-ce

Validate the installation by running 
    
    sudo docker run hello-world

Or you can your user to the docker group 
    
    sudo usermod -aG docker $USER

Expect this output:





Docker in a nutshell:



Everything in docker runs as root, you need to prefix your commands with `sudo` therefore.
Install the nginx docker image:

    sudo docker pull nginx

nginx is a shorthand for: https://hub.docker.com/_/nginx/

Show your installed images:

    docker images 

or 

    docker image ls

Try the image: 

    sudo docker run --name some-nginx -d -p 8080:80 nginx

If the port 8080 is open on your firewall you can see the nginx running: http://18.197.25.150:8080 (replace public ip with _amazon_instance_ip) 

Stop the container:

    sudo docker stop some-nginx

# Finally Drone:

Installation Docs: https://docs.drone.io/installation/ 

## Steps 

Expose the right parameters in the compose Yaml

    version: '2'

    services:
        drone-server:
            image: drone/drone:0.8

            ports:
                - 80:8000
                - 9000
            volumes:
                - /var/lib/drone:/var/lib/drone/
            restart: always
            environment:
                - DRONE_OPEN=true
                # here we used the Public IP of the EC2 instance
                - DRONE_HOST=${DRONE_HOST}
                - DRONE_GITHUB=true
                - DRONE_GITHUB_CLIENT=${DRONE_GITHUB_CLIENT}
                - DRONE_GITHUB_SECRET=${DRONE_GITHUB_SECRET}
                # this is shared with the agent
                - DRONE_SECRET=${DRONE_SECRET} 
        drone-agent:
            image: drone/agent:0.8

            command: agent
            restart: always
            depends_on:
                - drone-server
            volumes:
                - /var/run/docker.sock:/var/run/docker.sock
            environment:
                - DRONE_SERVER=drone-server:9000
                # this is the one used in the master
                - DRONE_SECRET=${DRONE_SECRET}


Create a OAuth Application on Github https://github.com/settings/developers

Put the SECRET key and CLIENT KEY in your docker-compose environment variables:

    sudo docker-compose pull
    sudo docker-compose up -d


Go to http://18.197.25.150 (replace public ip with _amazon_instance_ip)
Click **Authorize** and drone has access to your Github account

If you run Drone locally, https://ngrok.com/ helps to connect with Github.


Try this node example:

    pipeline:
     build:
       image: node:latest
       commands:
         - npm install
         - npm run test

To make this work type: 

    npm init -y
    npm i --save yarn express

Add node_modules to .gitignore and push your changes to GIT.

Create pipelines:

    pipeline: 
        test:
            image: ... 
            Commands:
            Command 1
        build:
            Image: ... 
            ... 

Run steps concurrently with groups:

    workspace:
    base: /go
    path: src/github.com/cicd-hackathon-stgt/droneio

    pipeline:
    test:
      group: go
      image: golang:1.6
      commands:
        - go test -v -race

    build:
      group: go
      image: golang:1.10
      commands:
        - go build -v

    execute:
      image: golang
      commands:
        - ./droneio

Create a dockerfile:

> repo is no the git repo, it’s the docker image URL

Use when as condition, for example when: branch: master (docs: http://docs.drone.io/step-conditions/) 

Dockerfile: 

    FROM alpine:3.7

    COPY ./droneio /app/droneio

    ENTRYPOINT ["/app/droneio"]

.drone.yml

    workspace:
        base: /go
        path: src/github.com/cicd-hackathon-stgt/droneio
    pipeline:
        test:     
            group: go
            image: golang:1.10
            commands:
                - sleep 10
                - go test -v -race

            build:
                group: go
                image: golang:1.10
                commands:
                    - sleep 10
                    - go build -v
            docker:
                image: plugins/docker
                repo: cicd-hackathon-stgt/droneio
                tags: [ latest ]

            execute:
                image: golang
                commands:
                    - ./droneio

You can find plugins like the docker plugin at http://plugins.drone.io/.

To add secret go to http://18.197.25.150/cicd-hackathon-stgt/droneio/settings/secrets

And use them in your `.drone.yml` file:

    docker:
      image: plugins/docker
      repo: cicd-hackathon-stgt/droneio
      tags: [ latest ]
      secrets: [ docker_username, docker_password ]
 
## Interesting Plugins

http://plugins.drone.io/drone-plugins/drone-s3/

http://plugins.drone.io/drone-plugins/drone-slack/

http://plugins.drone.io/drone-plugins/drone-downstream/

## Pipeline examples from Matthias Loibl

https://github.com/drone/drone/blob/master/.drone.yml

https://github.com/go-gitea/gitea/blob/master/.drone.yml

https://github.com/metalmatze/alertmanager-bot/blob/master/.drone.yml

https://github.com/metalmatze/digitalocean_exporter/blob/master/.drone.yml

http://plugins.drone.io/drillster/drone-volume-cache/



/var/lib/drone on the host contains the sqlite database with all persisted data. You can also use MySQL or other sql databases.





