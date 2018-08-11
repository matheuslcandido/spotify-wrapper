import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Album', () => {
  let spotify;
  let stubedFetch;
  let promise;

  beforeEach('', () => {
    spotify = new SpotifyWrapper({
      token: 'foo-TVa_aCUS_owjck_49e_c5QwbqRVY_emINn0n7uWKGELN6OR9mO5ROtCYJPc8ZUc'
    });

    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.resolves({ json: () => ({ album: 'name' }) });
  });

  afterEach('', () => {
    stubedFetch.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(spotify.album.getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(spotify.album.getAlbums).to.exist;
    });

    it('should have getTracks method', () => {
      expect(spotify.album.getTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = spotify.album.getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = spotify.album.getAlbum('59jhRMBpmQKFKMija2A8PM');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8PM');

      const album2 = spotify.album.getAlbum('59jhRMBpmQKFKMija2A8MN');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8MN');
    });

    it('should return the JSON data from the promise', () => {
      const album = spotify.album.getAlbum('59jhRMBpmQKFKMija2A8PM');
      album.then((data) => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = spotify.album.getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const albums = spotify.album.getAlbums(['59jhRMBpmQKFKMija2A8PM', '59jhRMBpmQKFKMija2A8MN']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=59jhRMBpmQKFKMija2A8PM,59jhRMBpmQKFKMija2A8MN');

      const albums2 = spotify.album.getAlbums(['59jhRMBpmQKFKMija2A8PN', '59jhRMBpmQKFKMija2A8MO']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=59jhRMBpmQKFKMija2A8PN,59jhRMBpmQKFKMija2A8MO');
    });

    it('should return the JSON data from the promise', () => {
      const albums = spotify.album.getAlbums(['59jhRMBpmQKFKMija2A8PM', '59jhRMBpmQKFKMija2A8MN']);
      albums.then(data => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = spotify.album.getTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const tracks = spotify.album.getTracks('59jhRMBpmQKFKMija2A8PM');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8PM/tracks');

      const tracks2 = spotify.album.getTracks('59jhRMBpmQKFKMija2A8PN');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8PN/tracks');
    });

    it('should return the JSON data from the promise', () => {
      const AlbumTracks = spotify.album.getTracks('59jhRMBpmQKFKMija2A8PM');
      AlbumTracks.then(data => {
        expect(data).to.be.eql({ album: 'name'});
      });
    });
  });
});
