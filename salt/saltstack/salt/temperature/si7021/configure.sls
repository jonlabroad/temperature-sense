install si7021 git package:
  git.latest:
    - name: https://github.com/jonlabroad/Python_SI7021.git
    - target: /si7021

setup si7021 git package:
  cmd.run:
    - name: python setup.py install
    - cwd: /si7021