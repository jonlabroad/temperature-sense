/temperature/si7021/test_temp.py:
  file.managed:
    - source:
      - salt://files/temperature/si7021/test_temp.py
    - makedirs: true

/temperature/si7021/log_temp.py:
  file.managed:
    - source:
      - salt://files/temperature/si7021/log_temp.py
    - makedirs: true