# live-status
Tell your family when you are in a voice/video call or are recording/streaming with this simple web application, made with Node, designed for Pi.

## Features
- Light and Dark theme (change `theme` in `config.js`)
- [Animated](https://imgur.com/gallery/UZOyKdE) live-updating viewing page (no need to refresh)
- Material design
- Mobile support
- Easy to use (and relatively easy to set up on an old laptop)
- Multi-user
- No unnecessary password authentication (just enter your name)
- Remembers your name
- Simple and clean interface
- 4/5 modes
- (Kind of) simple to add more modes

## The idea
As many people are either working or learning from home due to COVID-19, I decided to make a system to allow you to have a screen showing who is currently active (in a call).

## Development
- **Day 1:** Design, Node.JS web server, and basic frontend
- **Day 2:** Websockets, live view page, mostly finished
- **Day 3:** Bugfixing, finishing client-side javascript, new login popup
- **Day 4:** Setting up the Raspberry Pi & touchscreen, adding dark theme

## The code
*It's pretty bad, sorry for using jQuery in 2020 - although it works well and quickly*

## How to install
You could install this on an old Windows laptop if you wanted (just download and unzip the code and install [node.js](https://nodejs.org/en/ "node.js")), but I chose to have it hosted on a Raspberry Pi Model 3B, paired with the official 7" touchscreen which would open the `/view` page in kiosk mode at startup.

*(I'm going to assume if you already own a Pi you know what you're doing to some extent)*
#### What I did: 
- Flash [Raspbian](https://www.raspberrypi.org/downloads/ "Raspbian")
- Spend 4 hours trying to get WiFi to work (eventually used [this script](http://downloads.fars-robotics.net/wifi-drivers/install-wifi "this script"))
- [Rotate the touch screen](https://raspberrypiprojects.com/raspberry-pi-rotate-touch-screen/ "Rotate the touch screen")
- [Install Node and NPM](https://www.instructables.com/id/Install-Nodejs-and-Npm-on-Raspberry-Pi/ "Install Node and NPM")
- Install PM2 with NPM
- Git clone this repository
- Run `sudo pm2 startup`, `cd` into the cloned repo, run `sudo pm2 start .` (Appears you need to run as sudo if you want to use port 80)
- [Set up Chromium as kiosk and autolaunch](https://pimylifeup.com/raspberry-pi-kiosk/ "Set up Chromium as kiosk and auto-launch") 
- [Adjust the brightness](https://lb.raspberrypi.org/forums/viewtopic.php?t=214086#p1318236 "Adjust the brightness") (down to 50, from 255)
- You may want to change `./public/logo.png` and `./public/favicon.ico` (search PNG to ICO converter)

## Live status options
- Voice-only call/chat
- Video call/chat 
- Recording
- Streaming

## Adding more status options
- Add another [button](https://mdbootstrap.com/docs/jquery/components/buttons/ "button") in `./views/index.html` with a unique ID
- Add another [event listener](https://github.com/eartharoid/live-status/blob/master/public/index.js#L104 "event listener") in `./public/index.js` (`.on('click')`)
- Edit `colours`, `textColours` and `activity` arrays in `./public/index.js`
- Edit `colours` and `activity` arrays in `./public/view.js`
- Edit `activity` array in `./index.js`

## Screenshots
#### Control Panel (http://raspberrypi.local/)
Control panel - login (enter name)
[![Control panel - login (enter name)](https://i.imgur.com/cnB573U.png "Control panel - login (enter name)")](https://i.imgur.com/cnB573U.png "Control panel - login (enter name)")


Control panel with dark theme, inactive
[![Control panel with dark theme](https://i.imgur.com/2JSu72j.png "Control panel with dark theme, inactive")](https://i.imgur.com/2JSu72j.png "Control panel with dark theme")


Control panel with dark theme, in a voice chat
[![Control panel with dark theme, in a voice chat](https://i.imgur.com/UCYjI0M.png "Control panel with dark theme, in a voice chat")](https://i.imgur.com/UCYjI0M.png "Control panel with dark theme, in a voice chat")

#### Live View (http://localhost/view)

Live View page in dark theme, no active users
[![Live View page in dark theme, no active users](https://i.imgur.com/CLnW3iH.png "Live View page in dark theme, no active users")](https://i.imgur.com/CLnW3iH.png "Live View page in dark theme, no active users")

Live View page in dark theme
[![Live View page in dark theme](https://i.imgur.com/wFKQvD9.png "Live View page in dark theme")](https://i.imgur.com/wFKQvD9.png "Live View page in dark theme")

### Animation
[![GIF of Live View page](https://i.imgur.com/UZOyKdE.gifv "GIF of Live View page")](https://i.imgur.com/UZOyKdE.gifv "GIF of Live View page")


