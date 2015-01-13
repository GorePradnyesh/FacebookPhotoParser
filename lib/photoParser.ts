/// <reference path="../declarations/node.d.ts" />
var fb = require('fb');

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

interface FacebookPhotos{
    data?: FacebookPhoto[];
    error?: any;
}
interface FacebookPhoto{
    id: string;
    created_time?: string;   // make time type
    link: string;
    name?: string;
    images: FacebookImage[];
}

interface FacebookImage{
    height: number;
    width:  number;
    source: string;
}

/*
var userToken = 'CAACEdEose0cBAEmw3YHdexF7d4f9SS7sJEzqJ86PBxypDaRDt19rdDZAN8T1vBMRloyIMPtSxqrtHSvk5GHHnZA17FsAtNoHuW1OJomY6wsmrGIuV2EGydfk7hG2HNuqCMrgkvZBg1v6M1rZA55xsk5YkpyBl7lEYZAElfz3PAZBWz8TP5qUuGNMc1U3c8nO7a9G078YRbS1pHkL6e2IJj';
getTaggedPhotoList(userToken, onPhotoGet);
getUploadedPhotoList(userToken, onPhotoGet);

function onPhotoGet(error, data){
    if(error){
        console.log(error);
    }
}
*/
