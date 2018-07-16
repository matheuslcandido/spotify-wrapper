import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
global.fetch = require('node-fetch');

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album.js'

describe('Album', () => {
  let fetchStub;
  let promise;

  beforeEach('', () => {
    fetchStub = sinon.stub(global, 'fetch');
    fetchStub.resolves();
  });

  afterEach('', () => {
    fetchStub.restore();
  });

  describe('smoke tests', () => {
    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbums method', () => {
      expect(getAlbums).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });
  });

  describe('getAlbum', () => {
    it('should call fetch method', () => {
      const album = getAlbum();
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('59jhRMBpmQKFKMija2A8PM');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8PM');

      const album2 = getAlbum('59jhRMBpmQKFKMija2A8MN');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8MN');
    });

    it('should return the JSON data from the promise', () => {
      fetchStub.resolves({ body: 'json' });
      getAlbum('59jhRMBpmQKFKMija2A8MN')
        .then(data => {
          expect(data).to.be.eql({ body: 'json' });
        });
    });
  });

  describe('getAlbums', () => {
    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const albums = getAlbums(['59jhRMBpmQKFKMija2A8PM', '59jhRMBpmQKFKMija2A8MN']);
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=59jhRMBpmQKFKMija2A8PM,59jhRMBpmQKFKMija2A8MN');

      const albums2 = getAlbums(['59jhRMBpmQKFKMija2A8PN', '59jhRMBpmQKFKMija2A8MO']);
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=59jhRMBpmQKFKMija2A8PN,59jhRMBpmQKFKMija2A8MO');
    });

    it('should return the JSON data from the promise', () => {
      fetchStub.resolves({ body: 'json' });
      getAlbums(['59jhRMBpmQKFKMija2A8PM', '59jhRMBpmQKFKMija2A8MN'])
        .then(data => {
          expect(data).to.be.eql({ body: 'json' });
        });
    });
  });

  describe('getAlbumsTracks', () => {
    it('should call fetch method', () => {
      const tracks = getAlbumTracks();
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call with the correct URL', () => {
      const tracks = getAlbumTracks('59jhRMBpmQKFKMija2A8PM');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8PM/tracks');

      const tracks2 = getAlbumTracks('59jhRMBpmQKFKMija2A8PN');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/albums/59jhRMBpmQKFKMija2A8PN/tracks');
    });

    it('should return the JSON data from the promise', () => {
      fetchStub.resolves({ body: 'json' });
      getAlbumTracks('59jhRMBpmQKFKMija2A8PM')
        .then(data => {
          expect(data).to.be.eql({ body: 'json' });
        });
    });
  });
});
