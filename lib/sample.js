var FB = require('fb')

var accessToken = 'CAALFo4MHdZA8BALYbqhhz0MGsTUOIKMOxsIayMpM8mYRZCZB6YJGmKRAbI9qjh63WZBOl5koOpsofHWrK9iHBXqYttSGt2nZAGYuuZCTlZBRpKYZCVdFZCPo72dNRWp3pZAuWK5NGd2hCV1a9qRo72ps9gCsE80yibnkc0tmqDAJ5zOZCDkd2B5ZBuiZA7JmkXAiHhOZAl4k7uudjPx5xSCv4p5Mh7'

//FB.setAccessToken('access_token');

FB.setAccessToken(accessToken);

/*var body = 'My first post using facebook-node-sdk';
FB.api('me/feed', 'post', { message: body}, function (res) {
    if(!res || res.error) {
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log('Post Id: ' + res.id);
});*/


FB.api('me/videos/uploaded', 'get', {}, function (res) {
    if(!res || res.error) {
        console.log("error")
        console.log(!res ? 'error occurred' : res.error);
        return;
    }
    console.log(res);
});
