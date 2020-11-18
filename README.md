#Bookmarks

Bookmarks project is a simple app which gives users an option to bookmark their favorite and most useful Github repositories.

It utilizes github’s public rest api (https://docs.github.com/en/free-pro-team@latest/rest/reference) to access organization and repo data. 

It has front and back end applicaitons.

A front end application allows a user to enter the system (no authentication required), search for an organization, and see its public repositories. The frontend application communicates with a backend service which in turn communicates with github’s api. 

The user is able to add/delete repositories to their profile with description to them. 

Results are saved in the backend, either in a mongo db.

Backend app is written with Node.js & Express, uses Mongo & Mongoose. To start the server enter 'npm start' in terminal. Configuration is in .env file.
Front end is written in React.js & Mobx, to start change to front_end directory and enter 'npm start'. 
