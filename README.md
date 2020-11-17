# Group2-CNT5517

Dependencies (install on raspberry pi):

- sudo apt-get nodejs

- sudo apt-get npm

- sudo apt-get install apache2


cd into raspberry pi's /var/www folder, delete the existing html folder and run: git clone https://github.com/ar4757/Group2-CNT5517.git html 

to copy this repo's files into raspberry pi's /var/www/html/ folder. This will allow you to work on the project on your raspberry pi and commit changes from there.


Start the backend (on pi) with: node nodeserver.js

Start the website server if apache is not running (on pi) with: sudo service apache2 restart

(Optional) Run the Atlas thing architecture to generate tweets of your own

Access the site on your computer at http://10.254.254.64/
