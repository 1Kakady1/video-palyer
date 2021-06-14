import './style.sass';
import {  VideoPlayer } from './app/index';

/*
* Init default video 
*/
/*
const video = new VideoPlayer({
  videoContainer: '.player-container',
  iconsFolder: './assets/images/icons',
  volumeValue: 50,
  subtitle: true,
  timeTrackOffset: 2,
});

video.playerInit();

*/

/*
* 
*init loop
*
*/

const videoStack: VideoPlayer[] = [];
const videoList = document.querySelectorAll(".video-list .player-container");

videoList.forEach((item)=>{

  const videoSubtitles = item.querySelectorAll("video track"); 
  const videoPlayer = new VideoPlayer({
    videoContainer: `.${(item as HTMLDivElement).dataset.name}`,
    iconsFolder: './assets/images/icons',
    volumeValue: 10,
    subtitle: !!videoSubtitles.length,
    timeTrackOffset: 2
  });

  videoPlayer.playerInit();
  videoStack.push(videoPlayer);

})

console.log(videoStack,videoList)
