!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.spotifyWrapper=t():e.spotifyWrapper=t()}(window,function(){return function(e){var t={};function r(n){if(t[n])return t[n].exports;var u=t[n]={i:n,l:!1,exports:{}};return e[n].call(u.exports,u,u.exports,r),u.l=!0,u.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var u in e)r.d(n,u,function(t){return e[t]}.bind(null,u));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=2)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.API_URL="https://api.spotify.com/v1"},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.toJSON=function(e){return e.json()}},function(e,t,r){"use strict";var n=r(3),u=r(4);e.exports={search:n.search,searchArtists:n.searchArtists,searchAlbums:n.searchAlbums,searchPlaylists:n.searchPlaylists,getAlbum:u.getAlbum,gettAlbums:u.gettAlbums,getAlbumTracks:u.getAlbumTracks}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.searchPlaylists=t.searchTracks=t.searchAlbums=t.searchArtists=t.search=void 0;var n=r(0),u=r(1),s=t.search=function(e,t){return fetch(n.API_URL+"/search?q="+e+"&type="+t).then(u.toJSON)};t.searchArtists=function(e){return s(e,"artist")},t.searchAlbums=function(e){return s(e,"album")},t.searchTracks=function(e){return s(e,"track")},t.searchPlaylists=function(e){return s(e,"playlist")}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getAlbumTracks=t.getAlbums=t.getAlbum=void 0;var n=r(0),u=r(1);t.getAlbum=function(e){return fetch(n.API_URL+"/albums/"+e).then(u.toJSON)},t.getAlbums=function(e){return fetch(n.API_URL+"/albums/?ids="+e).then(u.toJSON)},t.getAlbumTracks=function(e){return fetch(n.API_URL+"/albums/"+e+"/tracks").then(u.toJSON)}}])});
//# sourceMappingURL=spotify-wrapper.umd.js.map