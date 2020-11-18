# Group2-CNT5517

Dependencies (install on raspberry pi)
```javascript
sudo apt-get nodejs
sudo apt-get npm
sudo apt-get install apache2
```

Cloning the repo
```javascript
cd /var/www
rm -rf html
git clone https://github.com/ar4757/Group2-CNT5517.git html
```

Running:

Run the Atlas thing architecture
```javascript
./Atlas
```

Connect to the smart space and add the multicast IP routing
```javascript
sudo systemctl start openvpn-client@vss
sudo ip route add 232.0.0.0/8 dev tap0
```

Start the backend
```javascript
node nodeserver.js
```

Start the website server if apache is not running (on pi)
```javascript
sudo service apache2 restart
```

Access the site on your computer at http://10.254.254.64/
