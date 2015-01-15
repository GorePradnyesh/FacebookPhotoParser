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
    SCOPE = 'https://www.googleapis.com/auth/drive.file';

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
            // set tokens to the client
            // TODO: tokens should be set by OAuth2 client.
            console.log("Token:" + tokens.toString());
            console.log("Token:" + tokens.refresh_token);
            oauth2Client.setCredentials(tokens);
            callback();
        });
    });
}

function handleResponse(err, response) {
    if(err){
        console.log(err)
    }else{
        console.log('inserted:', response.id);
    }
}

// retrieve an access token
getAccessToken(oauth2Client, function() {
    drive.files.insert({
        resource: {
            title: 'Test',
            mimeType: 'text/plain'
        },
        media: {
            mimeType: 'text/plain',
            body: 'Hello World updated with metadata'
        },
        auth: oauth2Client
    }, handleResponse)
});