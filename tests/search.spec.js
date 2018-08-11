import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
chai.use(sinonChai);
global.fetch = require('node-fetch');

import spotifyWrapper from '../src/index';

describe('Search', () => {
  let spotify;
  let fetchStub;
  let promise;

  beforeEach('', () => {
    spotify = new spotifyWrapper({
      token: 'BQDtvX3sBFzpDXwmciyKns5Y5zbagETOrxC9XZDNEmwSFe4MM6LusfDepmsUP57RMisjGTKsb7MUWEbL1Pe2oYtWiWi11ZM5sR616nwqiuvbHyFb-TVa_aCUS_owjck_49e_c5QwbqRVY_emINn0n7uWKGELN6OR9mO5ROtCYJPc8ZUc',
    });

    fetchStub = sinon.stub(global, 'fetch');
    promise = fetchStub.resolves({ json: () => ({ search: 'name' }) });
  });

  afterEach('', () => {
    fetchStub.restore();
  });

  describe('smoke tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });

    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });

    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });

    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Incubus');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = spotify.search.artists('Muse');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist')
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums('Rogerio');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Rogerio');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rogerio&type=album');
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks('Saudade');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Saudade');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Saudade&type=track');
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const playlists = spotify.search.playlists('Rockzera');
      expect(fetchStub).to.have.been.calledOnce;
    });

    it('should call fetch function with the correct URL', () => {
      const playlists = spotify.search.playlists('Rockzera');
      expect(fetchStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Rockzera&type=playlist');
    });
  });
});
