/temperature/mcp9808/test_temp.py:
  file.managed:
    - source:
      - salt://files/temperature/mcp9808/test_temp.py
    - makedirs: true

/temperature/mcp9808/log_temp.py:
  file.managed:
    - source:
      - salt://files/temperature/mcp9808/log_temp.py
    - makedirs: true