var fs = require("fs-extra");

var ClientBuilder = {
    name: "client"
};



/*

    quels artefacts ?


*/



ClientBuilder.clean = function(modpack, builddir) {


    var outputdir = modpack.client.build.path || `build/${modpack.name}/${modpack.version}/client`;
    //var outputdir = builddir || `build/${modpack.name}/${modpack.version}/client`;
    
    if(fs.existsSync(outputdir)) {
        console.log(`Cleaning ${modpack.name} - client > deleting ${outputdir}...`);
        try{
            fs.removeSync(outputdir);
        }
        catch(err) {
            console.error(`Cleaning ${modpack.name} - client > unable to delete ${outputdir}: ${err.message}`);
            throw err;
        }
    };
}

ClientBuilder.build = function(modpack, builddir) {
    
    var self = this;

    //var clientcustombuildpath = modpack.client && modpack.client.build.path ? modpack.client.buildpath : false;
    var outputdir = modpack.client.build.path || `build/${modpack.name}/${modpack.version}/client`;
    var modpackdir = `modpacks/${modpack.name}/`;

    if(!fs.existsSync(modpackdir)) {
        console.error(`Building ${modpack.name} - client > Error: ${modpackdir} does not exists`);
    }

    //Copy modpacks/{modpack.name}/common/* to {outputdir}/client/
    if(fs.existsSync(`modpacks/${modpack.name}/common`)) {
        console.log(`Building ${modpack.name} - client > copying modpacks/${modpack.name}/common/* to ${outputdir}/`);
        try {
            fs.copySync(`modpacks/${modpack.name}/common/`, `${outputdir}/`);
            console.log(`Building ${modpack.name} - client > common files copied.`);
        } catch(err) {
            return console.error(err);
        }
    }

    //Copy modpacks/{modpack.name}/client/* to {outputdir}/client/
    if(fs.existsSync(`modpacks/${modpack.name}/client`)) {
        console.log(`Building ${modpack.name} - client > copying modpacks/${modpack.name}/client/* to ${outputdir}/`);
        try {
            fs.copySync(`modpacks/${modpack.name}/client/`, `${outputdir}/`);
            console.log(`Building ${modpack.name} - client > client files copied.`)
        } catch(err) {
            return console.error(err);
        }
    }

    //Patch version 
    if(modpack.client && modpack.client.templates) {
        
        modpack.client.templates.forEach(function(file) {

            var templateFile = `${outputdir}/${file}`;

            if(!fs.existsSync(templateFile)) {
                return;
            }

            console.log(`Building ${modpack.name} - ${self.name} > patching ${templateFile}`)

            var templateData = fs.readFileSync(templateFile);
            var replacedData =  templateData.toString('utf8').replace(/\{{VERSION}}/g, modpack.version);
            fs.writeFileSync(templateFile, replacedData); 

        });
    }
};

module.exports = ClientBuilder;