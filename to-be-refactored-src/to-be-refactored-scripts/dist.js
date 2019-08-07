#!/usr/bin/node

var fs = require("fs-extra");
var archiver = require('archiver');


function zipBuild(modpack, name) {

    var sourceDir = `build/${modpack.name}/${modpack.version}/${name}`;
    var targetZip = `dist/${modpack.name}.${name}.${modpack.version}.zip`;

    // create a file to stream archive data to.
    var output = fs.createWriteStream(targetZip);
    var archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function() {
        console.log(`Dist> ${targetZip} done, ${archive.pointer()} total bytes`);
        //console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on('end', function() {
        //console.log('Data has been drained');
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on('warning', function(err) {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });

    // good practice to catch this error explicitly
    archive.on('error', function(err) {
        throw err;
    });


    console.log(`Dist> Zipping ${sourceDir} to ${targetZip}`);

    // pipe archive data to the file
    archive.pipe(output);
    archive.directory(sourceDir, false);
    archive.finalize();
}


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

    if(modpack.client.zip) 
        zipBuild(modpack, "client");
    
    if(modpack.server.zip) 
        zipBuild(modpack, "server");
});