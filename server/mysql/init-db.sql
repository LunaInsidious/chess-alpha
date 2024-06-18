CREATE DATABASE IF NOT EXISTS `template`;
CREATE DATABASE IF NOT EXISTS `template_test`;
GRANT ALL PRIVILEGES ON `template`.* TO 'docker'@'%';
GRANT ALL PRIVILEGES ON `template_test`.* TO 'docker'@'%';
FLUSH PRIVILEGES;
