/root/.aws/config:
  file.managed:
    - source:
      - salt://files/.aws/config
    - makedirs: true

/root/.aws/credentials:
  file.managed:
    - source:
      - salt://files/.aws/credentials
    - makedirs: true

/pi/.aws/config:
  file.managed:
    - source:
      - salt://files/.aws/config
    - makedirs: true

/pi/.aws/credentials:
  file.managed:
    - source:
      - salt://files/.aws/credentials
    - makedirs: true