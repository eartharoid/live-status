/**
 * @name live-status
 * @author eartharoid <contact@eatharoid.me>
 * @website https://eartharoid.me/
 * @license MIT
 */

var socket = io();

const colours = ['blue', 'purple', 'orange', 'red'];
const activity = ['in a voice call', 'in a video call', 'recording', 'streaming', 'offline'];
let html;


const setDark = () => {
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "./dark-theme.css",
        "ea-data": "dark-theme",
    }).appendTo("head");
};

if (Cookies.get('view_theme') == "dark") {
    setDark()
};

const remove = user => {
	console.log('Removing ' + user)
	socket.emit('setOffline', user);
};

$(() => {
    console.log(`Welcome to the Live Status Live View Panel`);

    socket.emit('loaded', true);

    setTimeout(() => {
        $('.loader').fadeOut(1000);
    }, 500);
});


socket.on('update', (data) => {

    if (data.change === false) {
        return console.log("Ignoring update (no change)")
    }

    console.log(`[SOCKET] (<) Statuses: `);
    console.dir(data.data);

    if (Object.keys(data.data).length === 0) {
        html = `
            <div class="animated slideInUp text-center offline">
                <div>
                    <h3>All users are offline</h3>
                </div>
            </div>
        `;
    } else {
        html = "";
    }


    for (let x in data.data) {
        html += `
        <div class="row animated slideInUp" onClick="remove('${x}')" style="cursor:pointer;">
            <div class="card status-card ${colours[data.data[x]]} z-depth-2">
                <div class="card-body text-center">
                    <h1 class="text-white">${x.toUpperCase()} IS ${activity[data.data[x]].toUpperCase()}</h1>
                </div>
            </div>
        </div>
        `;
    };
    $('#live').html(html);
});

socket.on('settings', (data) => {
    if (data.theme.view == "dark") {
        setDark()
    };
    Cookies.set('view_theme', data.theme.view, {
        expires: 365
    });
    console.log(`Using ${data.theme.view} theme`);
});

socket.on('ping', (data) => {
    socket.emit('isAlive', true);
});
