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

install adafruit git package:
  git.latest:
    - name: https://github.com/adafruit/Adafruit_Python_MCP9808.git
    - target: /adafruit

setup adafruit git package:
  cmd.run:
    - name: python setup.py install
    - cwd: /adafruit
