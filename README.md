# phaser3template
heroku deployabe webpacked phaser3 template with socket.io and type checking

This template allows you to easily deploy a phaser3 game with websocket support.
I intend to use this project for multiplayer games and for games that track data (heroku database) for individual players over time. To get started, adjust /src/frontend/front.ts to configure your game and import scenes. Then, add your scenes to the ./scenes folder.


-----------to compile and run---------------------
npm run build-front
npm run build-back
npm run start-server (or 'heroku local web' is using heroku)

-----------to deploy to heroku---------------------
sign up at heroku.com
install heroku cli

then 
git init
git commit -m 'first commit'
heroku create <appname>
git push heroku main (or master)
(later, just do 'npm run deploy')