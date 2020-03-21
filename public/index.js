/**
 * @name live-status
 * @author eartharoid <contact@eatharoid.me>
 * @website https://eartharoid.me/
 * @license MIT
 */

var socket = io();
let name;
let seln = 4;
let selected;
const colours = ['blue', 'purple', 'orange', 'red', 'elegant'];
const textColours = ['blue-text', 'purple-text', 'orange-text', 'red-text', 'text-dark'];
const activity = ['in a voice chat', 'in a video chat', 'recording', 'streaming', 'offline'];

/* while (!name) {
    name = prompt("Welcome to the Live Status Control Panel\n\nPlease enter your name:\n\n", Cookies.get('name')).trim();
};
Cookies.set('name', name, {
    expires: 365
});
console.log(`Updated 'name' cookie: ${name}`); */

const setDark = () => {
    $("<link/>", {
        rel: "stylesheet",
        type: "text/css",
        href: "./dark-theme.css",
        "ea-data": "dark-theme",
    }).appendTo("head");

    $('#btn4').removeClass(`btn-outline-${colours[4]}`);
    colours[4] = "light";
    textColours[4] = "text-white";
    $('#btn4').addClass(`btn-outline-${colours[4]}`);

};

if (Cookies.get('index_theme') == "dark") {
    setDark()
};


const hideCookies = () => {
    Cookies.set('cookies', true, {
        expires: 365
    });
    console.log(`Set 'cookies' cookie`);
};




const update = (num, emit) => {

    if (emit) {
        socket.emit('changeStatus', {
            user: name,
            btn: num
        });
        console.log(`[SOCKET] (>) Button ${num}`);
    };


    if (selected) {
        selected.addClass(`btn-outline-${colours[seln]}`);
        selected.removeClass(`btn-${colours[seln]}`);
        selected.prop('disabled', false);
        $('#status').removeClass(textColours[seln]);
    };
    $('#status').removeClass(textColours[4]);
    $('#status').html(`YOU ARE ${activity[num].toUpperCase()}`);
    $('#status').addClass(textColours[num]);

    if (num == 4) return;

    seln = num;
    selected = $(`#btn${seln}`);
    selected.addClass(`btn-${colours[seln]}`);
    selected.removeClass(`btn-outline-${colours[seln]}`);
    selected.prop('disabled', true);
};




$(() => {

    // ask for name
    $('#nameInput').val(Cookies.get('name'));
    $('#loginModal').modal({
        backdrop: 'static',
        keyboard: false
    });
    $('#nameInput').focus();

    // button events
    $('#btn0').on('click', () => {
        update(0, true);
    });
    $('#btn1').on('click', () => {
        update(1, true);
    });
    $('#btn2').on('click', () => {
        update(2, true);
    });
    $('#btn3').on('click', () => {
        update(3, true);
    });
    $('#btn4').on('click', () => {
        update(4, true);
    });

    $('#hideCookies').on('click', () => {
        hideCookies();
    });

    $('#contineCloseLogin').on('click', () => {
        if (!($('#nameInput').val().length > 1)) return;

        name = $('#nameInput').val();

        Cookies.set('name', name, {
            expires: 365
        });
        console.log(`Updated 'name' cookie: ${name}`);

        $('#loginModal').modal('hide');

        if (!Cookies.get('cookies')) {
            $('#cookieModal').modal()
        };

        console.log(`Welcome to the Live Status Control Panel\nHello, ${name}`);

        $('#hello').html(`Hello, ${name}.`);

        socket.emit('loaded', false);

        setTimeout(() => {
            $('.loader').fadeOut(1000);
        }, 1000);
    });

});




socket.on('update', (data) => {
    update(data.data[name] || data.data[name] == 0 ? data.data[name] : 4, false);
    console.log(`[SOCKET] (<) Statuses: `);
    console.dir(data);
});

socket.on('settings', (data) => {
    if (data.theme.index == "dark") {
        setDark()
    };
    Cookies.set('index_theme', data.theme.index, {
        expires: 365
    });
    console.log(`Using ${data.theme.index} theme`);
});

socket.on('ping', (data) => {
    socket.emit('isAlive', name);
});