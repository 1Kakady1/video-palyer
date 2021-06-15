import './style.sass';
import {  VideoPlayer, VideoUtils} from './app/index';

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

interface IStackVideo{
  [key: string]: VideoPlayer
}

const videoStack: IStackVideo = {};
const videoList = document.querySelectorAll(".video-list .player-container");
const utils = new VideoUtils();

videoList.forEach((item)=>{

  const videoSubtitles = item.querySelectorAll("video track"); 
  const videoPlayer = new VideoPlayer({
    videoContainer: `.${(item as HTMLDivElement).dataset.name}`,
    iconsFolder: './assets/images/icons',
    volumeValue: 1,
    subtitle: !!videoSubtitles.length,
    timeTrackOffset: 20
  });

  videoPlayer.playerInit();
  videoStack[(item as HTMLDivElement).dataset.name || "unknown"]= videoPlayer;

});

utils.eventChangeStor(function(e){
  const info = localStorage.getItem(utils.storeKey);
  if(info && e.detail !== info){
    const data = JSON.parse(info)
    videoStack[data.name].pause();
  }
})