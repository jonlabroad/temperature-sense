install python i2c dependencies:
  pkg.installed:
    - pkgs:
      - build-essential
      - python-dev
      - python-pip
      - python-smbus
      - git

install i2c python packages:
  pip.installed:
    - pkgs:
      - RPi.GPIO
