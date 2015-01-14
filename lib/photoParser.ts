/// <reference path="../declarations/node.d.ts" />
var fb = require('fb');

//https://developers.facebook.com/docs/graph-api/reference/v2.2/video/
//https://developers.facebook.com/docs/graph-api/reference/v2.2/photo/

function getTaggedPhotoList(userToken:string, callback:any){
    getPhotoList('me/photos', userToken, callback);
}

function getUploadedPhotoList(userToken:string, callback:any){
    getPhotoList('me/photos/uploaded', userToken, callback);
}

/**
 * Gets the list of photos for the given category
 * @param userToken
 * @param callback
 */
function getPhotoList(apiPath:string, userToken: string, callback: any){
    fb.setAccessToken(userToken);
    fb.api(apiPath, 'get', {}, function(response){
        if(!response || response.error){
            callback(!response ? 'error occurred' : response.error)
        }
        var photos: FacebookPhoto[] = response.data;
        for(var photoIndex=0; photoIndex< photos.length; photoIndex++){
            console.log(photos[photoIndex].id, photos[photoIndex].images[0])
        }
    });
}

function getTaggedVideoList(userToken:string, callback:any){
    getVideoList('me/videos', userToken, callback);
}

function getUploadedVideoList(userToken:string, callback:any){
    getVideoList('me/videos/uploaded', userToken, callback);
}

function getVideoList(apiPath: string, userToken: string, callback:any){
    fb.setAccessToken(userToken);
    fb.api(apiPath, 'get', {}, function(response) {
        if (!response || response.error) {
            callback(!response ? 'error occurred' : response.error)
        }
        var videos: FacebookVideo[] = response.data;
        for(var vIndex = 0; vIndex< videos.length; vIndex++){
            var video: FacebookVideo = videos[vIndex]
            console.log(video.name, video.id, video.source);
        }
    });
}

function getAsset(assetId: string, userToken:string, callback: GetAssetFunc){
    fb.setAccessToken(userToken);
    fb.api(assetId, 'get', {}, function(response: FacebookAsset){
        if (!response || response.error) {
            callback(!response ? 'error occurred' : response.error)
        }
        callback(null, response);
    })
}

interface FacebookAsset{
    id:string;
    created_time: string;
    name?: string;
    source?: string;
    updated_time?: string;
    error?: any;
}

interface FacebookPhoto extends FacebookAsset{
    images: FacebookImage[];
}

interface FacebookPhotos{
    data?: FacebookPhoto[];
    error?: any;
}

interface FacebookImage{
    height: number;
    width:  number;
    source: string;
}

interface FacebookVideo extends FacebookAsset{
    format: FacebookVideoFormat;
}

interface FacebookVideos {
    data: FacebookVideo[]
}

interface FacebookVideoFormat {
    filter?: string;
    height: number;
    width: number;
}


interface GetAssetFunc{
    (err:any, asset?: FacebookAsset): void;
}

var userToken = 'CAACEdEose0cBANboYerlmRilW35ltUOk2FHbuKfZBuwP7TmsxS5mn2HoL2PYgAEuBaPWGeo4zMW6tUdoVrxdg6CEMKpuk4GZCvBclVOdiiNzB1giC0KlLL4D53u9utPt5UPkyjDH3TL4fN37rWDkaBZANtF14mBmaD5mOp78puaHYrNgLgWjSi7dRN6M0YCV8ULwsmr9jUSzOvtJsWX';
//getTaggedPhotoList(userToken, onAssetGet);
//getUploadedPhotoList(userToken, onAssetGet);
//getUploadedVideoList(userToken, onAssetGet);

function onAssetGet(error, data){
    if(error){
        console.log(error);
    }
}


//getAsset("10151395267365137", userToken , onGetVideo);
function onGetVideo(error, video:FacebookVideo){
    if(error){
        console.log(error.message)
    }else{
        console.log(video.name, video.id, video.source);
    }
}

//getAsset("10154777299020137", userToken, onGetPhoto);
function onGetPhoto(error, photo: FacebookPhoto){
    if(error){
        console.error(error.message)
    }else{
        console.log(photo.id, photo.source);
    }
}

