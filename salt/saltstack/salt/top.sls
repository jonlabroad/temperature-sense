base:
  '*':
    - i2c
    - aws
    - firewall
  'G@dev:mcp9808':
    - temperature.mcp9808
  'G@dev:si7021':
    - temperature.si7021