# Home Temperature Sensors
Take the temp!
## Setup ##
Download/install/setup NOOBS on SD card: https://www.raspberrypi.org/downloads/noobs/
Login, configure wifi (TODO)
Recommended: Change the default pi user and password immediately (TODO)
Change the hostname in both files to something unique
```sh
sudo nano /etc/hostname
sudo nano /etc/hosts
```
Reboot
Recommended: Install firewall and allow Salt ports
```sh
sudo apt-get install -y ufw
ufw allow 4505
ufw allow 4506
Install git and checkout this repo :)
``` sh
sudo apt-get update
sudo apt-get install -y git
sudo git clone https://github.com/jonlabroad/temperature-sense.git
```
Run bootstrap script
``` sh
sudo chmod +x sensor/provision/bootstrap.sh
sudo sensor/provision/bootstrap.sh
```
Accept keys on Salt Master
```sh
sudo salt-key --accept [MINION ID]
```
The Salt Minion should be setup now
