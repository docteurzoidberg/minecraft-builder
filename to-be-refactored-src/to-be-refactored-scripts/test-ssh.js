var ssh = require("../lib/ssh");

function onStdout(chunk) {
    console.log('ssh> stdout> ', chunk.toString('utf8'))
};

function onStderr(chunk) {
    console.log('ssh> stderr> ', chunk.toString('utf8'))
};

async function checkJavaInstalled() {
    //TODO
    return false;
}

async function checkScreenInstalled() {
    //TODO
    return false;
}

async function checkJavaRunning() {
    var data = "";
    var gotErrors = false;

    await ssh.client.exec("ps -elf", [], {
        cwd: "/root/server",
        onStdout: function(chunk) {
            data+= chunk.toString('utf8');
        },
        onStderr: function(chunk) {
            gotErrors=true;
            console.error('ssh> stderr> ', chunk.toString('utf8'));
        }
    });
    //.then(function() {
        if(gotErrors) 
            throw new Error("error while getting processes");

        var isJavaRunning = false; 
        data.split('\n').forEach(function(line) {
            if(line.indexOf("java") > 0) {
                isJavaRunning = true;
                return;
            }
            //console.log("line> " + line);
        });
        return isJavaRunning;
        //cb(false, isJavaRunning);
    //});
}

async function sshConnect() {
    await ssh.connect();
}

sshConnect().then(function() {
    checkJavaRunning().then(function(isJavaRunning) {
        console.log("Java running: " + isJavaRunning.toString()); 
        ssh.client.dispose();
    });
    //
});


    /*
    ssh.client.exec("tail -f logs/latest.log", [], {
        cwd: "/root/server",
        onStdout,
        onStderr
    }).then(function() {
        ssh.client.exec("screen -S minecraft -p 0 -X stuff \"say pwet^M\"", [], {
            cwd: "/root/server",
            onStdout,
            onStderr
        });
    });
    */
    /*
    ssh.client.exec("script /dev/null", [], {
        cwd: "/root/server",
        onStdout,
        onStderr
    }).then(function() {
        ssh.client.exec("screen -r minecraft", [], {
            cwd: "/root/server",
            onStdout,
            onStderr
        }).then(function() {
            ssh.client.exec("screen -S minecraft -p 0 -X stuff \"say pwet^M\"", [], {
                cwd: "/root/server",
                onStdout,
                onStderr
            });
        });
    });
    */
    
