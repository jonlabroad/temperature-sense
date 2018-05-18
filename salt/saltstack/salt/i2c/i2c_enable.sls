enable i2c on raspberry pi:
  file.append:
    - name: /etc/modules
    - text:
      - i2c-bcm2708
      - i2c-dev

enable i2c part 2 on raspberry pi:
  file.append:
    - name: /boot/config.txt
    - text:
      - dtparam=i2c1=on
      - dtparam=i2c_arm=on

#remove blacklisted spi-bcm2708:
#  file.line:
#    - name: /etc/modprobe.d/raspi-blacklist.conf
#    - match: blacklist spi-bcm2708
#    - mode: delete
#    - quiet: true

#remove blacklisted i2c-bcm2708:
#  file.line:
#    - name: /etc/modprobe.d/raspi-blacklist.conf
#    - match: blacklist i2c-bcm2708
#    - mode: delete
#    - quiet: true