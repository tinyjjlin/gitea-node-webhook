'use strict'

const exec = require('child_process').exec

const secret = 'tiny'

function webhook(args, callback) {
    let header = args.header;
    let body = args.body;
    let cmd = args.execScript;
    let allowEvent = {
        push: true
    }
    // check
    if (!header['x-gitea-event'] || !header['x-gogs-event'] || body['secret'] !== secret) {
        console.error('event error!')
        callback(false,'event error');
        return;
    }
    // push and master
    if (header['x-gitea-event'] === 'push' && body['ref'] === 'refs/heads/master') {
        //execute script
        console.log('execute script file:' + cmd)
        exec('echo jjlin', function (err, stdout, stderr) {
            if (err) {
                console.error('execute script failed!\n' + err);
                callback(false,'execute script failed!');
                return;
            }
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + typeof stderr);
            console.log('execute script.............')
            let result = 'script exec result:' +stdout
            callback(true,result);
            return;
        });

    } else {
        console.error('not execute webhook!');
        callback(false,'not execute webhook!')
        return;
    }
}

module.exports = webhook;