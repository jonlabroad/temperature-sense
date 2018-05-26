python /temperature/mcp9808/log_temp.py 2>&1 > /temperature/mcp9808/log_temp.log:
  cron.present:
    - user: root
    - minute: '*/5'

cron:
  service.running:
    - reload: true