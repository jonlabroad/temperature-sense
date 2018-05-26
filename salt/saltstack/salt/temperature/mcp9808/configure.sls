install adafruit git package:
  git.latest:
    - name: https://github.com/adafruit/Adafruit_Python_MCP9808.git
    - target: /adafruit

setup adafruit git package:
  cmd.run:
    - name: python setup.py install
    - cwd: /adafruit