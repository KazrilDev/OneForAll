const { EventEmitter } = require('events');

const connection = require('../database/db');

class StateManager extends EventEmitter{   
    constructor(opts){
        super(opts);
this.setMaxListeners(40)
        connection
            .then((connection) => this.connection = connection)
            .catch((err) => console.log(err));
    } 

}

module.exports = new StateManager();