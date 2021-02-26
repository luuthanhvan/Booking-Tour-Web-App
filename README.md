# Installation development tools
- Ubuntu or Windows
- Install XAMPP
- Install a code editor such as Atom or VSCode
- Install Node.js on Linux: https://www.geeksforgeeks.org/installation-of-node-js-on-linux/

# Preparation
- Create a .env file in the root directory of this project. Add environment-specific variables on new lines in the form of NAME=VALUE

      HOSTNAME:[your_host_name]
      PORT:[your_port]
      USERNAME:[your_database_username]
      PASSWORD:[your_database_password]
      DATABASE:[your_database_name]
      DB_PORT:[your_database_port]
      SECRET_KEY:[your_secret_key_used_to_session]
      
- Open XAMPP and create a database named booking_tour_database for example. Then, create the tables following the images in src/public/database directory

# Build and Run
1. npm install
2. npm start # run this command in terminal 1
3. npm run scss # run this command in terminal 2
