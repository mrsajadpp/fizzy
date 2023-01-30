var express = require('express');
var ytdl = require('ytdl-core');
const Spotify = require('spotifydl-core').default
var ffmpeg = require('fluent-ffmpeg');
let path = require('path');
let fs = require('fs');
let http = require('http');
let request = require('request');
//ffmpeg.setFfmpegPath("/app/vendor/ffmpeg/bin");
var data = require('../database/data');
var validUrl = require('valid-url');
const { getVideoDurationInSeconds } = require('get-video-duration');
var modules = require('../modules/modules')
var router = express.Router();

const credentials = {
  clientId: '53f1f7aa238a41678b2bc2f79b0f9080',
  clientSecret: '51cb947e5f7047569bd383e78109e019'
}

const spotify = new Spotify(credentials)

router.get('/', (req, res, next) => {
  try {
    res.render('home', { title: 'Home', description: 'Social video downloader powered by "Trace inc".', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
});

router.get('/spotify', (req, res, next) => {
  try {
    res.render('spotify', { title: 'Spotify', description: 'Spotify music downloader.', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
});

router.get('/instagram', (req, res, next) => {
  try {
    res.render('instagram', { title: 'Instagram', description: 'Instagram video downloader.', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
});

router.get('/youtube', (req, res, next) => {
  try {
    res.render('youtube', { title: 'YouTube', description: 'YouTube video downloader.', user: req.session.user });
  } catch (err) {
    console.error(err)
  }
});

router.post('/api/instagram/download', (req, res, next) => {
  try {
    if (req.body.url.startsWith('http://instagram.com/') || req.body.url.startsWith('https://instagram.com/') || req.body.url.startsWith('https://www.instagram.com/') || req.body.url.startsWith('http://www.instagram.com/')) {
      if (req.body.type === 'mp3') {
        modules.getDirUrl(req.body.url).then((url) => {
          getVideoDurationInSeconds(url).then((duration) => {
            res.writeHead(200, {
              "Content-Disposition": "attachment;filename=Instagram - " + new Date() + " - | Fizzy - fizzy.traceinc.in.mp3",
              'Content-Type': 'audio/mp3',
              'Content-Length': duration
            });
            ffmpeg(url).toFormat("mp3").on("error", (err) => console.log(err)).pipe(res)
          })
        })
      } else {
        if (req.body.type === 'mp4') {
          modules.getDirUrl(req.body.url).then( async (url) => {
              res.writeHead(200, {
                "Content-Disposition": "attachment;filename=Instagram - " + new Date() + " - | Fizzy - fizzy.traceinc.in.mp4",
                'Content-Type': 'video/mp4'
              });
              request(url).pipe(res);
          })
        }
      }
    } else {
      res.redirect('/instagram')
    }
  } catch (err) {
    console.error(err)
  }
})

router.post('/api/youtube/download', async (req, res, next) => {
  try {
    if (ytdl.validateURL(req.body.url)) {
      if (req.body.type === 'mp3') {
        res.header('Content-Disposition', 'attachment; filename="YouTube - ' + new Date() + '- | Fizzy - fizzy.traceinc.in.mp3"');
        let video = await ytdl(req.body.url, { format: 'mp3', filter: 'audioandvideo', quality: 'highest' });
        ffmpeg(video).toFormat("mp3").on("error", (err) => console.log(err)).pipe(res)
      } else {
        if (req.body.type === 'mp4') {
          res.header('Content-Disposition', 'attachment; filename="YouTube - ' + new Date() + '- | Fizzy - fizzy.traceinc.in.mp4"');
          ytdl(req.body.url, { format: 'mp4', filter: 'audioandvideo', quality: 'highest' }).pipe(res);
        }
      }
    } else {
      res.redirect('/youtube')
    }
  } catch (err) {
    console.error(err)
  }
})

router.post('/api/spotify/download', async (req, res, next) => {
  try {
    if (req.body.url.startsWith('https://open.spotify.com/') || req.body.url.startsWith('http://open.spotify.com/')) {
      res.header('Content-Disposition', 'attachment; filename="Spotify - ' + new Date() + '| Fizzy - fizzy.traceinc.in.mp3"');
      let song = await spotify.downloadTrack(req.body.url);
      res.write(song, 'binary');
      res.end();
    } else {
      res.redirect('/spotify')
    }
  } catch (err) {
    console.error(err)
  }
})

router.get('/robots.txt', (req, res, next) => {
  try {
    res.sendFile(path.resolve(__dirname, 'seo', 'robots.txt'));
  } catch (err) {
    console.error(err)
  }
})


module.exports = router;
