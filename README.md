# Group2-CNT5517

Dependencies (install on raspberry pi):
sudo apt-get nodejs
sudo apt-get npm
sudo apt-get install apache2

Unzip all of the repo's files into raspberry pi's /var/www/html/ folder

Start the backend (on pi) with: node nodeserver.js
Start the website server if apache is not running (on pi) with: sudo service apache2 restart

Access the site on your computer at http://10.254.254.64/
