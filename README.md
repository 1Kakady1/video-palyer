## Clone starter

To get started, you should run command:

```shell script
git clone https://github.com/1Kakady1/video-palyer.git
```
[Demo](https://1kakady1.github.io/video-player/)

## Install dependencies

After clone project, you should install dependencies:

```shell script
yarn install
```

## Development

For development, you can use the command that runs webpack dev server:

```shell script
yarn run serve
```

## Build 

For build your application, run command:

```shell script
yarn run build
```

Init:
```
const video = new VideoPlayer({
  videoContainer: '.player-conrainer',
  iconsFolder: './assets/images/icons',
  volumeValue: 50,
  subtitle: true,
  timeTrackOffest: 2
});

video.playerInit();
```
### Constructor:
| Params      | Description |
| ----------- | ----------- |
| videoContainer      | The class of the container where the video is placed |
| iconsFolder      | Link to icons for the ui |
| volumeValue      | Initial volume value (default: 0) |
| subtitle      | Whether to include subtitles (default: false)|
| timeTrackOffest      | Fast forward and rewind for n seconds (default: 3)|

### Public functions:

| Function     | Description |
| ----------- | ----------- |
| playerInit     | init player and create UI |
| unMount     | remove events and UI |
| controls     | get controls element |
| isVideoPlay     | check is play video (return true/false) |
| videoElement    | get video element |
| userAgent     | get bowser name |
| fadeIn    | show element ({ el, display = 'block', time = 10, callback = undefined }) |
| fadeOut    |hide element ({ el, time = 10, callback = undefined }) |

## UI classes

```
enum UiClasses {
  play = 'videoPlay',
  stop = 'videoStop',
  pause = 'videoPause',
  start = 'videoStart',
  fullscreen = 'videoFullscreen',
  fullscreenCancel = 'videoFullscreenCancel',
  buffer = 'playerBufferedAmount',
  progress = 'playerProgressAmount',
  track = 'playerTrack',
  volume = 'videoVolume',
  rangeVolume = 'videoVolumeRange',
  labelValue = 'palyer-volume-label',
  volumeProgressContainer = 'palyerVolumeContainer',
  videoPlayerControls = 'videoPlayerControls',
  videoContainerOverlay = 'overlayVideoContainer',
  videoOverlayBtn = 'overlayVideoBtn',
  trackTime = 'palyertrackTime',
  trackTimeFull = 'palyertrackTimeFull',
  subtitleBtn = 'palyerSubtitleBtn',
  subtitleItem = 'palyerSubtitleItem',
  subtitleList = 'palyersubtitleList',
  video = "playerVideo",
}
```
