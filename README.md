# Home Temperature Sensors
Take the temp!
## Setup ##
Download/install/setup NOOBS on SD card: https://www.raspberrypi.org/downloads/noobs/
Login, configure wifi (TODO)
Recommended: Change the default pi user and password immediately (TODO)
Change the hostname in both files to something unique
```sh
nano /etc/hostname
nano /etc/hosts
```
Reboot
Recommended: Install firewall and allow Salt ports
```sh
apt-get install -y ufw
ufw allow 4505
ufw allow 4506
```
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
The Salt Minion should be setup now
