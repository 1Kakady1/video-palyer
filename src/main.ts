import './style.sass';
import { VideoPlayer } from './app/index';

const video = new VideoPlayer({
  videoContainer: '.player-conrainer',
  iconsFolder: './assets/images/icons',
  volumeValue: 50,
  subtitle: true,
});

video.playerInit();
