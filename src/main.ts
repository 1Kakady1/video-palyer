import './style.sass';
import { VideoPlayer } from './app/index';

const video = new VideoPlayer('.player-conrainer', './assets/images/icons', 50);
video.playerInit();
