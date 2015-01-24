var readline = require('readline');
var fs = require('fs');
var google = require('googleapis');
var OAuth2Client = google.auth.OAuth2;
var plus = google.plus('v1');
var drive = google.drive('v2');

var googleAppSecrets = JSON.parse(fs.readFileSync('../../declarations/GoogleAppSecrets.json', 'utf8'));

var CLIENT_ID = googleAppSecrets.ClientId,
    CLIENT_SECRET = googleAppSecrets.ClientSecret,
    REDIRECT_URL = googleAppSecrets.RedirectUrl,
    SCOPE = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.readonly'];

var oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);


var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getAccessToken(oauth2Client, callback) {
    // generate consent page url
    var url = oauth2Client.generateAuthUrl({
        access_type: 'offline', // will return a refresh token
        scope: SCOPE // can be a space-delimited string or an array of scopes
    });

    console.log('Visit the url: ', url);

    rl.question('Enter the code here:', function(code) {
        // request access token
        oauth2Client.getToken(code, function(err, tokens) {
            if(err){
                console.log(err);
                return;
            }
            console.log(JSON.stringify(tokens));
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            oauth2Client.setCredentials(tokens);
            callback();
        });
    });
}

function handleResponse(err, response) {
    if(err){
        console.log("ERROR:", err);
    }else{
        console.log('inserted:', response.id);
    }
}

function printResponse(err, response){
    if(err){
        console.log("ERROR:", err);
    }else{
        console.log('inserted:', response);
    }
}

function saveResponse(err, response){
    if(err){
        console.log("ERROR:", err);
    }else{
        var responseString = JSON.stringify(response, undefined, 2);
        var filename = process.argv[2]
        fs.writeFileSync(filename, responseString);
        console.log("write to file complete");
    }
}

function insertFile(fileObject){
    // retrieve an access token
    getAccessToken(oauth2Client, function() {
        drive.files.insert(fileObject, handleResponse)
    });
}

function listFiles(){
    getAccessToken(oauth2Client, function(){
        drive.files.list({auth: oauth2Client}, saveResponse);
    });
}

function getFile(getFileObject){
    getAccessToken(oauth2Client, function(){
        drive.files.get(getFileObject, printResponse);
    })
}

var getFileObject = {
    fileId: '0B4R0_oRoHKYjUkRXVXlLbmdxcTQ',
    acknowledgeAbuse: true,
    auth: oauth2Client
};

var testFileObject = {
    resource: {
        title: 'myTestFile',
        mimeType: 'text/plain'
    },
    media: {
        mimeType: 'text/plain',
        body: 'Hello World updated with metadata'
    },
    auth: oauth2Client
};




var filePath = '../../declarations/tokens.json';
var credentials = {};
if(fs.existsSync(filePath)) {
    var tokenObject = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if(tokenObject.refresh_token){
        credentials.refresh_token = tokenObject.refresh_token;
        console.log(credentials.refresh_token)
    }
}
//insertFile(testFileObject);
listFiles();
//getFile(getFileObject);
