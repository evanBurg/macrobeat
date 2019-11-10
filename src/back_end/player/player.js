
var cprocess = require("child_process");
const util = require('util');
const exec = util.promisify(cprocess.exec);

const commands = {
    youtube: {
        play: "--youtube-audio-stream"
    }
}

class Player {
    play(ID, source){
        this.ID = ID;
        this.source = source;

        const command = commands[source]["play"];
        this.process = cprocess.spawn("tizonia", [command, ID]);
    }

    stop() {
        exec('pidof tizonia').then(({stdout: PID}) => {
            exec(`kill ${PID}`);
        });
    }
};

module.exports = Player;