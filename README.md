# phaser3template
heroku deployabe webpacked phaser3 template with socket.io and type checking

This template allows you to easily deploy a phaser3 game with websocket support.
I intend to use this project for multiplayer games and for games that track data (heroku database) for individual players over time. To get started, adjust /src/frontend/front.ts to configure your game and import scenes. Then, add your scenes to the ./scenes folder.



##  -----------to compile and run---------------------
npm run build-front<br />
npm run build-back<br />
npm run start-server (or 'heroku local web' is using heroku)<br />

## -----------to deploy to heroku---------------------
sign up at heroku.com<br />
install heroku cli<br />

then <br />
git init<br />
git commit -m 'first commit'<br />
heroku create your-appname-here (just make one up)<br />
git push heroku main (or master)<br />
(later, just do 'npm run deploy')<br />