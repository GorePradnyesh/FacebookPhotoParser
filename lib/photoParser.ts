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

interface FacebookAsset{
    id:string;
    created_time: string;
    name?: string;
    source?: string;
    updated_time?: string;
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


//var userToken = 'CAACEdEose0cBAEmw3YHdexF7d4f9SS7sJEzqJ86PBxypDaRDt19rdDZAN8T1vBMRloyIMPtSxqrtHSvk5GHHnZA17FsAtNoHuW1OJomY6wsmrGIuV2EGydfk7hG2HNuqCMrgkvZBg1v6M1rZA55xsk5YkpyBl7lEYZAElfz3PAZBWz8TP5qUuGNMc1U3c8nO7a9G078YRbS1pHkL6e2IJj';
//getTaggedPhotoList(userToken, onAssetGet);
//getUploadedPhotoList(userToken, onAssetGet);
//getUploadedVideoList(userToken, onAssetGet);

function onAssetGet(error, data){
    if(error){
        console.log(error);
    }
}
