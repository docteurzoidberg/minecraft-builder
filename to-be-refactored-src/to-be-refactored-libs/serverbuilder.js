var ServerBuilder = {name: "server"};

var fs = require("fs-extra");

ServerBuilder.clean = function(modpack, builddir) {
    
    var modpackname = modpack.name;
    var outputdir = builddir || `build/${modpackname}/${modpack.version}/${this.name}`;

    if(fs.existsSync(outputdir)) {
        console.log(`Cleaning ${modpackname} - ${this.name} > deleting ${outputdir}...`);
        try{
            fs.removeSync(outputdir);
        }
        catch(err) {
            console.error(`Cleaning ${modpackname} - ${this.name} > unable to delete ${outputdir}: ${err.message}`);
            throw err;
        }
    };
}

ServerBuilder.build = function(modpack, builddir) {

    var self = this;

    
    var outputdir = builddir || `build/${modpack.name}/${modpack.version}/${this.name}`;
    var modpackdir = `modpacks/${modpack.name}/`;

    if(!fs.existsSync(modpackdir)) {
        console.error(`Building ${modpack.name} - ${this.name} > Error: ${modpackdir} does not exists`);
    }

    //Copy modpacks/{modpack.name}/common/* to {outputdir}/server/
    if(fs.existsSync(`modpacks/${modpack.name}/common`)) {
        console.log(`Building ${modpack.name} - ${this.name} > copying modpacks/${modpack.name}/common/* to ${outputdir}/`);
        try {
            fs.copySync(`modpacks/${modpack.name}/common/`, `${outputdir}/`);
            console.log(`Building ${modpack.name} - ${this.name} > common files copied.`);
        } catch(err) {
            return console.error(err);
        }
    }

    //Copy modpacks/{modpack.name}/server/* to {outputdir}/server/
    if(fs.existsSync(`modpacks/${modpack.name}/${this.name}`)) {
        console.log(`Building ${modpack.name} - ${this.name} > copying modpacks/${modpack.name}/${this.name}/* to ${outputdir}/`);
        try {
            fs.copySync(`modpacks/${modpack.name}/${this.name}/`, `${outputdir}/`);
            console.log(`Building ${modpack.name} - ${this.name} > server files copied.`)
        } catch(err) {
            return console.error(err);
        }
    }

    //Patch version 
    if(modpack.server && modpack.server.templates) {
        modpack.server.templates.forEach(function(file) {

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

module.exports = ServerBuilder;