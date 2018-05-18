/temperature/*:
  file.managed:
    - source:
      - salt://files/temperature/test_temp.py
    - makedirs: true