/**
 * @name live-status
 * @author eartharoid <contact@eatharoid.me>
 * @website https://eartharoid.me/
 * @license MIT
 */

var socket = io();

const colours = ['blue', 'purple', 'orange', 'red'];
const activity = ['in a voice chat', 'in a video chat', 'recording', 'streaming', 'offline'];
let html;

$(() => {
    console.log(`Welcome to the Live Status Live View Panel`);

    socket.emit('loaded', true)
});


socket.on('update', (data) => {

    if(data.change === false) {
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
        <div class="row animated slideInUp">
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

socket.on('ping', (data) => {
    socket.emit('isAlive', true);
});