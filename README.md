# Installation development tools
1. OS: Ubuntu or Windows

2. Install XAMPP in Ubuntu
      - Download here https://www.apachefriends.org/index.html
      - Install:
      ```
      cd Downloads # the directory store all download files
      ls 
      chmod 755 xampp-linux-x64-7.4.10-0-installer.run
      ls -al
      sudo ./xampp-linux-x64-7.4.10-0-installer.run # run it to install
      sudo /opt/lampp/manager-linux-x64.run # open xampp
      ```   
      *Note: if the Apache server cannot started, fix
      - Stop the apache service: `sudo /etc/init.d/apache2 stop`
      - Start again: `sudo /opt/lampp/lampp start`
      - Stop: `sudo /opt/lampp/lampp stop`
      
4. Install a code editor such as Atom or VSCode

5. Install Node.js on Ubuntu through nvm (Node Version Manager)
      - Access the nvm repository: https://github.com/nvm-sh/nvm
      - Copy the cURL command in "Install & Update script" and run it in your terminal.
      - See all Node.js version by nvm: `nvm list-remote`
      - Install the a specific Node.js version using nvm: `nvm [node.js version]`. Example, if you want to install node.js version v14.17.0, you will run the command: `nvm v14.17.0`
      - Check the installation
      ```
      node --version # or node -v
      npm --version # or npm -v
      ```

# Preparation
- Create a .env file in the root directory of this project. Add environment-specific variables on new lines in the form of NAME=VALUE
```
HOSTNAME=[your_host_name]
PORT=[your_port]
USERNAME=[your_database_username]
PASSWORD=[your_database_password]
DATABASE=[your_database_name]
DB_PORT=[your_database_port]
SECRET_KEY=[your_secret_key_used_to_session]
```   
- Open XAMPP and create a database named booking_tour_database for example. Then, create the tables following the images in src/public/database directory

# Build and Run
1. npm install
2. npm start # run this command in terminal 1
3. npm run scss # run this command in terminal 2
