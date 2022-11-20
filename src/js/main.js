/* eslint-env browser */
var APP_ID = 'com.bitmovin.demo.webapp';
var PLAYER_KEY = 'key';

var player;
var source = {
  // AVC Stream
  // dash : "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
  // RAI 4K
  //dash : "https://raievent10-dash-live.akamaized.net/dash/live/664000/raievent10/manifest.mpd?hdnea=st=1668965114~exp=1668965264~acl=/*~hmac=21026a599c125edde0cb106f8a64bed3f4a94b85104b2da5642d6ee357ccb034",
  // RAI 1
  //dash: 'https://streamcdng3-8e7439fdb1694c8da3a0fd63e4dda518.msvdn.net/raiuno1/hls/rai1_2400/chunklist.m3u8?baseuri=%2Fraiuno1%2Fhls%2F&tstart=0&tend=1669054147&tk2=fb5d047067eb3540cc20f3f653a36b2478cf183a91c1a21cebd3a59f7bb9dd19',
  // BARRE
  //dash: "https://livesim.dashif.org/livesim/testpic_2s/Manifest.mpd",
  // BUNNY 4K
  //dash: "https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd",
  // HEVC Stream
  // dash : "https://bitmovin-a.akamaihd.net/content/multi-codec/hevc/stream.mpd",
  // Widevine Stream
  //dash: 'https://bitmovin-a.akamaihd.net/content/art-of-motion_drm/mpds/11331.mpd',
  // dashif example http://reference.dashif.org/dash.js/latest/samples/drm/widevine.html
  dash: "https://media.axprod.net/TestVectors/v7-MultiDRM-SingleKey/Manifest_1080p.mpd",
  //"httpRequestHeaders": {
      //  "X-AxDRM-Message": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU"
  //}
  drm: {

    widevine: {

      LA_URL: 'https://drm-widevine-licensing.axtest.net/AcquireLicense',

      headers: {

        'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU'

      },

      withCredentials: false,

    },

    playready: {

      LA_URL: 'https://playready.directtaps.net/pr/svc/rightsmanager.asmx?PlayRight=1&ContentKey=EAtsIJQPd5pFiRUrV9Layw==',

      headers: {

        'X-AxDRM-Message': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2ZXJzaW9uIjoxLCJjb21fa2V5X2lkIjoiYjMzNjRlYjUtNTFmNi00YWUzLThjOTgtMzNjZWQ1ZTMxYzc4IiwibWVzc2FnZSI6eyJ0eXBlIjoiZW50aXRsZW1lbnRfbWVzc2FnZSIsImZpcnN0X3BsYXlfZXhwaXJhdGlvbiI6NjAsInBsYXlyZWFkeSI6eyJyZWFsX3RpbWVfZXhwaXJhdGlvbiI6dHJ1ZX0sImtleXMiOlt7ImlkIjoiOWViNDA1MGQtZTQ0Yi00ODAyLTkzMmUtMjdkNzUwODNlMjY2IiwiZW5jcnlwdGVkX2tleSI6ImxLM09qSExZVzI0Y3Iya3RSNzRmbnc9PSJ9XX19.FAbIiPxX8BHi9RwfzD7Yn-wugU19ghrkBFKsaCPrZmU'

      },

      withCredentials: false,

    }

  }

};
window.onload = function () {
  setupControllerEvents();
  setupPlayer();

  var keySystem = webOSDev && webOSDev.DRM.Type.WIDEVINE;
  var webosDrmAgent = getDrmAgent(keySystem);

  // In the app is started shortly after webOS is rebooted the DRM system and CMD
  // might not be fully ready to use for DRM playback. Therefore we should await
  // drmAgents onsuccess callback before we try to load DRM source.
  if (webosDrmAgent) {
    isDrmLoaded(webosDrmAgent)
      .then(function () {
        return loadSource(source);
      })
      .catch(function (e) {
        console.log('Error while loading drm Agent', e);
      });
    return;
  }

  // In case we don't have drmAgent available, just load the source normal way.
  loadSource(source);
};

function setupPlayer () {
  // add all necessary (and loaded) modules to the player core
  bitmovin.player.core.Player.addModule(window.bitmovin.player.polyfill.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player['engine-bitmovin'].default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player['container-mp4'].default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player['container-ts'].default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.mserenderer.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.abr.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.drm.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.xml.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.dash.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.hls.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.style.default);
  bitmovin.player.core.Player.addModule(window.bitmovin.player.webos.default);

  var conf = {
    key: '3bcadad0-20a2-49f1-907c-12923e2a176b',
    playback: {
      autoplay: true,
      preferredTech: [{
        player: 'html5',
        streaming: 'dash'
      }]
    },
    style: {
      ux: false
    },
    tweaks: {
      file_protocol: true,
      app_id: APP_ID,
      BACKWARD_BUFFER_PURGE_INTERVAL: 10
    },
    buffer: {
      video: {
        forwardduration: 30,
        backwardduration: 10
      },
      audio: {
        forwardduration: 30,
        backwardduration: 10
      }
    }
  };

  var container = document.getElementById('player')
  player = new bitmovin.player.core.Player(container, conf);
}

function loadSource(source) {
  player.on(bitmovin.player.core.PlayerEvent.Warning, function (data) {
    console.log('On Warning: ' + JSON.stringify(data));
  });

  player.on(bitmovin.player.core.PlayerEvent.Error, function (data) {
    console.log('On Error: ' + JSON.stringify(data));
  });

  return player
    .load(source)
    .then(function () {
      // Success
      console.log('Successfully created bitmovin player instance');
    })
    .catch(function (err) {
      // Error!
      console.error('Error while creating bitmovin player instance', err);
    });
}

function setupControllerEvents () {
  document.addEventListener('keydown', function (inEvent) {
    var keycode;

    if (window.event) {
      keycode = inEvent.keyCode;
    } else if (inEvent.which) {
      keycode = inEvent.which;
    }
    switch (keycode) {
      case 13:
        tooglePlayPause();
        break;
      case 415:
        // Play Button Pressed
        player.play();
        break;
      case 19:
        // Pause BUtton Pressed
        player.pause();
        break;
      case 412:
        // Jump Back 30 Seconds
        player.seek(player.getCurrentTime() - 30);
        break;
      case 417:
        // Jump Forward 30 Seconds
        player.seek(player.getCurrentTime() + 30);
        break;
      case 413:
        // Unload Player
        player.unload();
        break;
      default:
        console.log('Key Pressed: ' + keycode);
    }
  });
}

function tooglePlayPause () {
  if (player.isPaused()) {
    player.play();
  } else {
    player.pause();
  }
}

function getDrmAgent (keySystem) {
  return webOSDev && keySystem && webOSDev.drmAgent(keySystem);
}

function loadDrm (drmAgent) {
  return new Promise(function (resolve, reject) {
    try {
      drmAgent.load({
        onSuccess: function (res) {
          resolve(res);
        },
        onFailure: function (e) {
          reject(e);
        }
      })
    } catch (e) {
      reject('Error while loading DRM manager', e);
    }
  })
}

function isDrmLoaded (drmAgent) {
  return new Promise(function (resolve, reject) {
    if (!drmAgent) {
      return reject('No drmAgent');
    }

    drmAgent.isLoaded({
      onSuccess: function (response) {
        if (response.loadStatus === true) {
          resolve(response);
        } else {
          loadDrm(drmAgent)
            .then(function (result) {
              resolve(result);
            })
            .catch(function (err) {
              reject(err);
            })
        }
      },
      onFailure: function (err) {
        reject(err);
      }
    })
  })
}
