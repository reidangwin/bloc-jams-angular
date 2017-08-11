(function () {
    function SongPlayer(Fixtures) {

        /**
         * @desc Object which contains song properties and play/pause functions
         * @type {Object}
         */
        var SongPlayer = {};

        /**
         * @function getSongIndex
         * @desc Gets the index of the currently playing song
         * @param {Object} song
         * @return {number} index of currently playing song in current album
         */
        var getSongIndex = function (song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };


        /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

        /**
         * @function playSong
         * @desc Plays current song and sets the song's playing property to true
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

        /**
         * @desc Object which contains current album info
         * @type {Object}
         */
        SongPlayer.currentAlbum = Fixtures.getAlbum();

        /**
         * @desc Current song object
         * @type {Object}
         */
        SongPlayer.currentSong = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject)     {
                SongPlayer.stopSong(song)
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

        /**
         * @function SongPlayer.play
         * @desc If currently selected song is different from the one currently playing or paused, change the song and play,
         *       if it is the same, but just paused, play the same song.
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
         * @function SongPlayer.pause
         * @desc Pause currently playing song
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
         * @function SongPlayer.stopSong
         * @desc Stop currently playing song
         * @param {Object} song
         */
        SongPlayer.stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };

        /**
         * @function SongPlayer.previous
         * @desc Decrements the current song index, sets, and plays the song
         */
        SongPlayer.previous = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                SongPlayer.stopSong(song)
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
         * @function SongPlayer.next
         * @desc Increments the current song index, sets, and plays the song
         */
        SongPlayer.next = function () {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex > SongPlayer.currentAlbum.songs.length - 1 ) {
                SongPlayer.stopSong(song);
            } else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }


    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();