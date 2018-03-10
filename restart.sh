#!/bin/bash

server=http://18.197.25.150
token=XXX
repo=cicd-hackathon-stgt/droneio

latest=$(DRONE_SERVER=$server DRONE_TOKEN=$token ~/bin/drone build ls $repo --limit 1 --format='{{ .Number }}')
DRONE_SERVER=$server DRONE_TOKEN=$token ~/bin/drone build start $repo $latest
