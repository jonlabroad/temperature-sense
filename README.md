# Home Temperature Sensors
Take the temp!
## Setup ##
Download/install/setup NOOBS on SD card: https://www.raspberrypi.org/downloads/noobs/
Install NOOBS, setup wifi, enable ssh
Recommended: Change the default pi password immediately
```sh
passwd
```
Change the hostname in both files to something unique
```sh
nano /etc/hostname
nano /etc/hosts
```
Reboot
Install git and checkout this repo :)
``` sh
apt-get update
apt-get install -y git
git clone https://github.com/jonlabroad/temperature-sense.git
```
Run bootstrap script
``` sh
chmod +x sensor/provision/bootstrap.sh
sensor/provision/bootstrap.sh
```
Accept keys on Salt Master
```sh
salt-key --accept [MINION ID]
```
The Salt Minion should be setup now, run highstate
