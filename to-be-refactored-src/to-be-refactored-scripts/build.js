#!/usr/bin/node


/*
TODO:






*/


var fs = require("fs-extra");

var ClientBuilder = require("../lib/clientbuilder");
var ServerBuilder =  require("../lib/serverbuilder");
var LauncherBuilder = {};



fs.readdirSync(`modpacks/`).forEach(folder => {
    
    var modpack = false;

    try {
        modpack = JSON.parse(fs.readFileSync(`modpacks/${folder}/modpack.json`));
    } catch(err) {
    }

    if(!modpack.name || !modpack) {
        //console.error("Modpack name not found or invalid modpack.json");
        return;
    }

    if(modpack.client.build)
        ClientBuilder.clean(modpack);

    if(modpack.server.build)
        ServerBuilder.clean(modpack);

    if(modpack.client.build)
        ClientBuilder.build(modpack);
    
    if(modpack.server.build)
        ServerBuilder.build(modpack);

    console.log(`Building ${modpack.name} > done.`)
});
