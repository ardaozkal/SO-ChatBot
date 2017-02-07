module.exports = function (bot) {
    'use strict';

    var hammers = {
        STOP: '[HAMMERTIME!](https://www.youtube.com/watch?v=otCpCn0l4Wo)',
        STAHP: '[HAMMAHTIME!](https://www.youtube.com/watch?v=iu0orqfyv8M)',
        HALT: 'HAMMERZEIT!',
        STOY: 'ZABIVAT\' VREMYA!',
        SISTITE: 'MALLEUS TEMPUS!',
	DUR: 'CEKIC ZAMANI'
    };
    
    var delays = {
    	LOL: { time: 30 * 60 * 60, last 0 } // Delay thity minutes.
    }

    // /(STOP|STAHP|...)[\.!\?]?$/
    var re = new RegExp(
        '(' +
            Object.keys(hammers).map(RegExp.escape).join('|') +
        ')[\\.!?]?$'
    );

    bot.IO.register('input', function STOP (msgObj) {
        var sentence = msgObj.content.toUpperCase(),
            res = re.exec(sentence);

        if (res) {
            if (res[1] in delays) {
            	if(delays[res[1]].last > Date.now() - delays[res[1]].time)
            	    return;
            	
            	delays[res[1]].last = Date.now();
            }
            
            bot.adapter.out.add(hammers[res[1]], msgObj.room_id);
        }
    });

};
