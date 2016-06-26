module.exports = function (bot) {
    'use strict';

    function timeCommand(args) {
        if (args.content) {
            var reply = args.reply.bind(args);

            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + args.content + "&sensor=false";
            var xhr = new XMLHttpRequest();
            xhr.open('get', url, true);
            xhr.onload = function () {
                var status = xhr.status;
                if (status == 200) {
                    var lat = JSON.parse(xhr.response).results[0].geometry.location.lat;
                    var long = JSON.parse(xhr.response).results[0].geometry.location.lng;
                    var d = new Date();
                    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

                    url = "https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + long + "&timestamp=" + utc / 1000 + "&sensor=false";
                    xhr.open('get', url, true);
                    xhr.onload = function () {
                        var status = xhr.status;
                        if (status == 200) {
                            var offset = JSON.parse(xhr.response).dstOffset + JSON.parse(xhr.response).rawOffset;
                            utc = d.getTime() + (d.getTimezoneOffset() * 60000);
                            var nd = new Date(utc + (1000 * offset));

                            reply(nd.toLocaleString());
                        } else {
                            reply("Error no 1 cc @ardaozkal");
                        }
                    };
                    xhr.send();

                } else {
                    reply("Error no 2 cc @ardaozkal");
                }
            };
            xhr.send();
        }
        else {
            return 'See `/help time` for usage info';
        }
    }

    bot.addCommand({
        name: 'time',
        fun: timeCommand,
        permissions: {
            del: 'NONE'
        },
        async: true,

        description: 'Gets current time: ' +
        '`/time city`'
    });

};
