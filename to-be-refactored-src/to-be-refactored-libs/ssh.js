var path, node_ssh, ssh, fs

var settings= require('../credentials');

fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')
ssh = new node_ssh()
 
var SSH = {
    settings: settings,
    client: ssh,
    connect: async function() {
        return await ssh.connect(this.settings);
    }
}

module.exports = SSH;





