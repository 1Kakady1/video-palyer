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
  videoContainer: '.player-container',
  iconsFolder: './assets/images/icons',
  volumeValue: 50,
  subtitle: true,
  timeTrackOffset: 2,
  videoPlayerUI: function(videoContainer: HTMLDivElement | null, param: IVideoPlayerUIParam){
    return new MyPlayerUI(videoContainer,{...param})
  }
});

video.playerInit();
```
The video wrappers must contain the date attribute:
```
data-name="video-2"
```
Information about the current video is located in localstorage by the key: <b>player-info</b>
### Constructor:
| Params      | Description |
| ----------- | ----------- |
| videoContainer      | The class of the container where the video is placed |
| iconsFolder      | Link to icons for the ui |
| volumeValue      | Initial volume value (default: 0) |
| subtitle      | Whether to include subtitles (default: false)|
| timeTrackOffset      | Fast forward and rewind for n seconds (default: 3)|
| videoPlayerUI      | creating a custom ui instead of the standard one (doesn't work correctly|
| storeTimeOffset     | Refresh interval for starting the video from a certain point (default: 4) |

### Public functions:

| Function     | Description |
| ----------- | ----------- |
| playerInit     | init player and create UI |
| play     | play video |
| playTo     | play video to time |
| stop     | stop video |
| pause     | pause video |
| unMount     | remove events and UI |
| controls     | get controls element |
| isVideoPlay     | check is play video (return true/false) |
| videoElement    | get video element |


### Utils functions:

| Function     | Description |
| ----------- | ----------- |
| fadeOutIn     | hide old element and show new |
| userAgent     | get browser name |
| fadeIn    | show element ({ el, display = 'block', time = 10, callback = undefined }) |
| fadeOut    |hide element ({ el, time = 10, callback = undefined }) |
| secondsToHms     | convert time |

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
  labelValue = 'player-volume-label',
  volumeProgressContainer = 'playerVolumeContainer',
  videoPlayerControls = 'videoPlayerControls',
  videoContainerOverlay = 'overlayVideoContainer',
  videoOverlayBtn = 'overlayVideoBtn',
  trackTime = 'palyertrackTime',
  trackTimeFull = 'playertrackTimeFull',
  subtitleBtn = 'playerSubtitleBtn',
  subtitleItem = 'playerSubtitleItem',
  subtitleList = 'palyersubtitleList',
  video = "playerVideo",
  doubleTap = 'doubleTap',
  doubleTapLeft = 'doubleTapLeft',
  doubleTapRight= 'doubleTapRight',
  playToTime = "playToTimeBtn",
  playToTimeContainer= 'playToTimeContainer'
}
```
