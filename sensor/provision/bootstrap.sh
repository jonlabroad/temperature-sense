#!/bin/bash

# This script must be copied to the sensor and run
apt-get install -y git

git clone https://github.com/jonlabroad/temperature-sense.git
cd temperature-sense
./sensor/provision.sh