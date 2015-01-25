/// <reference path="../../declarations/node.d.ts" />
import fs                   = require('fs')
var google                  = require('googleapis');
var googleCredentials       = require('./GoogleTokens');


var drive = google.drive('v2');

function getFile(getFileObject){
    googleCredentials.GoogleAPICredentials.initOAuthClient(function(oauthClient){
        console.log("Getting file ");
        getFileObject.auth = oauthClient;
        drive.files.get(getFileObject, printResponse);
    });
}

var getFileObject = {
    fileId: '0B4R0_oRoHKYjUkRXVXlLbmdxcTQ',
    acknowledgeAbuse: true
};

function printResponse(err, response){
    if(err){
        console.log("ERROR:", err);
    }else{
        console.log('inserted:', response);
    }
}

getFile(getFileObject);
