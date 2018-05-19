/temperature/test_temp.py:
  file.managed:
    - source:
      - salt://files/temperature/test_temp.py
    - makedirs: true

/temperature/log_temp.py:
  file.managed:
    - source:
      - salt://files/temperature/log_temp.py
    - makedirs: true