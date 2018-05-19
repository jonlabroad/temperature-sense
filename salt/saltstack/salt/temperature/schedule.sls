python /temperature/log_temp.py 2>&1 > /temperature/log_temp.log:
  cron.present:
    - user: root
    - minute: '*/5'

cron:
  service.running:
    - reload: true