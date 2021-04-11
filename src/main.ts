import './style.sass';
import { VideoPlayer } from './app/index';

const video = new VideoPlayer('.player-conrainer');
const video2 = new VideoPlayer('.player-conrainer-2');

video.playerInit();
video2.playerInit();
