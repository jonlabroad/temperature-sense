python /temperature/si7021/log_temp.py 2>&1 > /temperature/si7021/log_temp.log:
  cron.present:
    - user: root
    - minute: '*/5'

cron:
  service.running:
    - reload: true