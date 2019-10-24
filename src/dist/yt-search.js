/***
 * yt-search
 * https://github.com/talmobi/yt-search
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ytSearch = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
    'use strict';
    
    var _cheerio = require('cheerio');
    var _dasu = require('dasu');
    var _parallel = require('async.parallel');
    
    var _url = require('url');
    
    // used to escape query strings
    var _querystring = require('querystring');
    
    var YT_SEARCH_QUERY_URI = `https://www.youtube.com/results?hl=en&gl=US&category=music&search_query=`
    var ONE_SECOND = 1000;
    var ONE_MINUTE = ONE_SECOND * 60;
    var TIME_TO_LIVE = ONE_MINUTE * 5;
    
    var DEFAULT_OPTS = {
      pageStart: 1,
      pageEnd: 3
    
      /**
       * Exports
       **/
    };module.exports = function (query, callback) {
      search(query, callback);
    };
    module.exports.search = search;
    
    /**
     * Main
     */
    function search(query, callback) {
      var opts = Object.assign({}, DEFAULT_OPTS);
    
      if (!query) {
        return callback(new Error('No query given.'));
      }
    
      if (typeof query === 'string') {
        opts = Object.assign(opts, { query: query });
      } else {
        opts = Object.assign(opts, query);
      }
    
      query = opts.query || opts.search;
    
      next();
    
      function next() {
        var q = _querystring.escape(query).split(/\s+/);
        var uri = YT_SEARCH_QUERY_URI + q.join('+');
    
        var tasks = [];
    
        var _loop = function _loop(i) {
          var pageNumber = i;
          tasks.push(function task(taskDone) {
            findVideos(uri, pageNumber, function (err, videos) {
              if (err) {
                taskDone(err);
              } else {
                taskDone(null, videos);
              }
            });
          });
        };
    
        for (var i = opts.pageStart; i < opts.pageEnd; i++) {
          _loop(i);
        }
    
        _parallel(tasks, function (err, results) {
          if (err) {
            callback(err);
          } else {
            // merge results
            results = [].concat.apply([], results);
    
            var videos = results.filter(videoFilter);
            var playlists = results.filter(playlistFilter);
            var accounts = results.filter(accountFilter);
    
            callback(null, {
              videos: videos,
              playlists: playlists,
              accounts: accounts
            });
          }
        });
      }
    }

    function findVideos(uri, page, callback) {
      uri += '&page=' + page;
      
      var params = _url.parse(uri);
    
      _dasu.req(params, function (err, res, body) {
        if (err) {
          callback(err);
        } else {
          if(res.statusCode >= 300 && res.statusCode <= 399){
            //Follow redirect
          }

          parseResponse(body, callback);
        }
      });
    }
    
    function videoFilter(result) {
      return result.url.indexOf('watch') >= 0 && result.url.indexOf('&list') === -1 && result.url.indexOf('&user') === -1;
    }
    
    function playlistFilter(result) {
      return result.url.indexOf('list') >= 0;
    }
    
    function accountFilter(result) {
      return result.url.indexOf('user') >= 0;
    }
    
    // parse the plain text response body with jsom to pin point song information
    function parseResponse(responseText, callback) {
      // var _time = Date.now();
      var $ = _cheerio.load(responseText);
      // var _delta = Date.now() - _time;
      // console.log("parsing response with cheerio, took: " + _delta + " ms");
      // var titles = $('.yt-lockup-title');
      var contents = $('.yt-lockup-content');
      // console.log("titles length: " + titles.length);
      var songs = [];
    
      for (var i = 0; i < contents.length; i++) {
        var content = contents[i];
        var title = $('.yt-lockup-title', content);
    
        var a = $('a', title);
        var span = $('span', title);
        var duration = parseDuration(span.text());
    
        var href = a.attr('href') || '';
    
        var videoId = href.split('=')[1];
        var image = $('img', content.previousSibling.firstChild);
        var imageURL = image.attr('src');
        if(imageURL === "/yts/img/pixel-vfl3z5WfW.gif") imageURL = image.attr("data-thumb")

        var metaInfo = $('.yt-lockup-meta-info', content);
        var metaInfoList = $('li', metaInfo);
        // console.log(metaInfoList)
        var agoText = $(metaInfoList[0]).text();
        var viewsText = $(metaInfoList[1]).text();
        // console.log(agoText)
        // console.log(viewsText)
        var viewsCount = Number(viewsText.split(' ')[0].split(',').join('').trim());
        var user = $('a[href^="/user/"]', content);
        var userId = (user.attr('href') || '').replace('/user/', '');
        var userName = user.text();
        var channel = $('a[href^="/channel/"]', content);
        var channelId = (channel.attr('href') || '').replace('/channel/', '');
        var channelName = channel.text();
    
        var song = {
          title: a.text(),
          url: href,
          videoId: videoId,
          thumbnail: imageURL,
          seconds: Number(duration.seconds),
          timestamp: duration.timestamp,
          duration: duration,
          ago: agoText,
          views: Number(viewsCount),
    
          author: {
            // simplified details due to YouTube's funky combination
            // of user/channel id's/name (caused by Google Plus Integration)
            name: userName || channelName,
            id: userId || channelId,
            url: user.attr('href') || channel.attr('href'),
    
            // more specific details
            userId: userId,
            userName: userName,
            userUrl: user.attr('href') || '',
    
            channelId: channelId,
            channelName: channelName,
            channelUrl: channel.attr('href') || ''
          }
    
          // console.log( '"' + song.title + '" views: ' + song.views )
    
        };songs.push(song);
      };
    
      // console.log(songs[0]);
    
      callback(null, songs);
    }
    
    function parseDuration(timestampText) {
      var a = timestampText.split(' ');
      var timestamp = a[a.length - 1].replace(/[^:\d]/g, '');
    
      var t = timestamp.split(':');
    
      var seconds = 0;
      var exp = 0;
      for (var i = t.length - 1; i >= 0; i--) {
        if (t[i].length <= 0) continue;
        var number = t[i].replace(/\D/g, '');
        // var exp = (t.length - 1) - i;
        seconds += parseInt(number) * (exp > 0 ? Math.pow(60, exp) : 1);
        exp++;
        if (exp > 2) break;
      };
    
      return {
        toString: function toString() {
          return seconds + ' seconds (' + timestamp + ')';
        },
        seconds: seconds,
        timestamp: timestamp
      };
    }
    
    // run tests is script is run directly
    if (require.main === module) {
      test('superman theme');
    }
    
    function test(query) {
      console.log('doing list search');
      search(query, function (error, r) {
        if (error) throw error;
    
        var videos = r.videos;
        var playlists = r.playlists;
        var accounts = r.accounts;
    
        console.log('videos: ' + videos.length);
        console.log('playlists: ' + playlists.length);
        console.log('accounts: ' + accounts.length);
    
        for (var i = 0; i < 3; i++) {
          var song = videos[i];
          var time = ' (' + song.timestamp + ')';
          console.log(song.title + time);
        }
      });
    }
    
    },{"async.parallel":undefined,"cheerio":undefined,"dasu":undefined,"querystring":undefined,"url":undefined}]},{},[1])(1)
    });