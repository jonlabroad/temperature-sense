/var/spool/cron/crontabs/root:
  file.managed:
    - source: salt://files/cron/root

/etc/rsyslog.conf:
  file.append:
    - text:
      - 'cron.*                          /var/log/cron.log'

/etc/init.d/rsyslog restart:
  cmd.run

cron:
  service.running:
    - reload: true