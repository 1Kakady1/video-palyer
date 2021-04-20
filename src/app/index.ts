type status = 'remove' | 'insert';

interface IElementsReturn {
  status: status;
  class: string;
  ui: string[];
}

interface IUi {
  [key: string]: HTMLElement | null;
}

interface IVideoPlayerElementsCreate {
  [key: string]: IElementsReturn;
}

interface IVideoPlayerUI {
  unMount: () => void;
  controls: (container: HTMLDivElement | null, isUnmount?: boolean) => IElementsReturn;
  createUI: () => IVideoPlayerElementsCreate;
}

interface IFactoryEvent {
  [key: string]: (event: MouseEvent, el: HTMLElement) => void;
}

declare global {
  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    mozFullScreenElement?: Element;
    msFullscreenElement?: Element;
    webkitFullscreenElement?: Element;
    pictureInPictureEnabled?: any;
  }

  interface HTMLDivElement {
    mozRequestFullScreen(): Promise<void>;
    webkitRequestFullscreen(): Promise<void>;
    mozRequestFullScreen(): Promise<void>;
    msRequestFullscreen(): Promise<void>;
  }
}

export enum UiClasses {
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
}

enum FadeTime {
  fullscreen = 30,
  controls = 25,
  volume = 20,
}

interface IFade {
  el: HTMLElement;
  display?: string;
  time?: number;
  callback?: () => void;
}

interface IVolumeClasses {
  btn: string;
  volume: string;
  range: string;
}
interface IVideoPlayerUIParam {
  volumeValue: number;
  icons: string;
}

class VideoPlayerUI implements IVideoPlayerUI {
  private container: HTMLDivElement | null;
  private volumeValue: number;
  private icons: string;

  constructor(videoContainer: HTMLDivElement | null, param: IVideoPlayerUIParam) {
    this.container = videoContainer;
    this.volumeValue = param.volumeValue;
    this.icons = param.icons;
    this.controls = this.controls.bind(this);
    this.volume = this.volume.bind(this);
    this.overlayPlay = this.overlayPlay.bind(this);
  }

  unMount = (): void => {
    this.controls(this.container, true);
    this.overlayPlay(true);
  };

  volume({ btn, volume, range }: IVolumeClasses) {
    return `
      <div class="player-btn-pp palyer-volume-container">

        <div class="palyer-volume-range-wrap ${range}" style="display: none;">
          <input type="range" class="input-player-range ${volume}" value="${this.volumeValue}" name="volume" min="0" max="100">
          <div class="palyer-volume-label">
            ${this.volumeValue}%
          </div>
        </div>
       
        <button class="${btn} contarols-btn">
           <img src="${this.icons}/volume.svg" alt="volume"> 
        </button>
      </div>
    `;
  }

  fullscreen = (on: string, off: string) => {
    return `
        <div class="player-btn-pp">
            <button class="${on} contarols-btn">
              <img src="${this.icons}/fullscreen.svg" alt="fullscreen on">
            </button>
            <button class="${off} contarols-btn" style="display: none;">
              <img src="${this.icons}/fullscreen-off.svg" alt="fullscreen off">
            </button>
          </div>
    `;
  };

  play(play: string, pause: string) {
    return `
      <div class="player-btn-pp">
        <button class="${play} contarols-btn">
          <img src="${this.icons}/play.svg" alt="play">
        </button>
        <button class="${pause} contarols-btn" style="display: none;">
          <img src="${this.icons}/pause.svg" alt="pause">
        </button>
      </div>
    `;
  }

  track(container: string, progress: string, buffer: string, time: string, timeFull: string) {
    return `
        <div class="player-track-container">
          <div class="player-track-time">
            <span class="${time}">00.00</span>
            <span class="player-track-time_sp">/</span>
            <span class="${timeFull}">00.00</span>
          </div>
          <div class="player-track ${container}" >
          </div>
          <div class="player-buffered">
            <span class="player-buffered-amount ${buffer}"></span>
          </div>
          <div class="player-progress">
            <span class="player-progress-amount ${progress}"></span>
          </div>
        </div>
      `;
  }

  overlayPlay(isUnmount?: boolean): IElementsReturn {
    const className = 'overlay-play';
    const uiClasses = {
      container: UiClasses.videoContainerOverlay,
      btn: UiClasses.videoOverlayBtn,
    };

    if (!isUnmount && this.container) {
      const overlay = `
        <div class="${className} ${uiClasses.container}">
            <div class="play-icon ${uiClasses.btn}"></div>
        </div>
      `;

      this.container.insertAdjacentHTML('beforeend', overlay);

      return {
        status: 'insert',
        class: className,
        ui: Object.values(uiClasses),
      };
    }

    const el = this.container?.querySelector(`.${className}`);
    el?.remove();
    return {
      status: 'remove',
      class: className,
      ui: [],
    };
  }

  controls(container: HTMLDivElement | null, isUnmount?: boolean): IElementsReturn {
    if (!container) {
      throw new Error('Not found container in controls element');
    }

    const className = 'videoPlayerControls';
    const uiClasses = {
      play: UiClasses.play,
      pause: UiClasses.pause,
      fullscreen: UiClasses.fullscreen,
      fullscreenCancel: UiClasses.fullscreenCancel,
      buffer: UiClasses.buffer,
      progress: UiClasses.progress,
      track: UiClasses.track,
      volume: UiClasses.volume,
      rangeVolume: UiClasses.rangeVolume,
      rangeVolumeContainer: UiClasses.volumeProgressContainer,
      videoPlayerControls: UiClasses.videoPlayerControls,
      trackTime: UiClasses.trackTime,
      timeFull: UiClasses.trackTimeFull,
    };

    if (isUnmount) {
      const el = this.container?.querySelector(`.${className}`);
      el?.remove();
      return {
        status: 'remove',
        class: className,
        ui: [],
      };
    }

    const constrols = `
      <div class="video-player-controls ${className}" style="display: none">
        <div class="player-btn-left">
          ${this.play(uiClasses.play, uiClasses.pause)}
        </div>

        ${this.track(uiClasses.track, uiClasses.progress, uiClasses.buffer, uiClasses.trackTime, uiClasses.timeFull)}

        <div class="player-btn-right">
          ${this.fullscreen(uiClasses.fullscreen, uiClasses.fullscreenCancel)}
          ${this.volume({ btn: uiClasses.volume, volume: uiClasses.rangeVolume, range: uiClasses.rangeVolumeContainer })}
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', constrols);

    return {
      status: 'insert',
      class: className,
      ui: Object.values(uiClasses),
    };
  }

  createUI = (): IVideoPlayerElementsCreate => {
    return {
      controls: this.controls(this.container),
      overlayPLay: this.overlayPlay(),
    };
  };
}

export class VideoPlayer {
  private video: HTMLVideoElement | null;
  private videoContainer: HTMLDivElement | null;
  private controlsUI!: IUi;
  private isPlay: boolean = false;
  private isFullScreen: boolean = false;
  private isVolume: boolean = false;
  private navigator = window.navigator;
  private volumeValue: number;
  private iconsFolder: string;
  private mX: number = 0;
  private mY: number = 0;
  //private mouseTimer?: Timeout;

  constructor(videoContainer: string = '#player-conrainer', iconsFolder: string, volumeValue?: number) {
    this.videoContainer = document.querySelector(videoContainer);
    this.video = this.videoContainer?.querySelector('video') || null;
    this.volumeValue = volumeValue || 100;
    this.iconsFolder = iconsFolder;
    this.checkSelectors();

    if (!this.checkSelectors() && this.videoContainer) {
      const ui = new VideoPlayerUI(this.videoContainer, { volumeValue: this.volumeValue, icons: this.iconsFolder });
      const uiList = ui.createUI();
      const container = this.videoContainer;
      Object.keys(uiList).forEach((key: string) => {
        uiList[key].ui.forEach((i: string) => {
          this.controlsUI = { ...this.controlsUI, [i]: container.querySelector('.' + i) };
        });
      });
    }

    this._onClickControls = this._onClickControls.bind(this);
    this._onChangePip = this._onChangePip.bind(this);
    this._onChangeFullScreen = this._onChangeFullScreen.bind(this);
    this.fadeOutIN = this.fadeOutIN.bind(this);
    this._onChangeProgessVideo = this._onChangeProgessVideo.bind(this);
    this._onChangeVolume = this._onChangeVolume.bind(this);
    //this._onMouse = this._onMouse.bind(this);
  }

  get videoElement() {
    return this.video;
  }

  get controls() {
    return this.controlsUI;
  }

  get isVideoPlay() {
    return this.isPlay;
  }

  get isVideoFullScreen() {
    return this.isFullScreen;
  }

  unMount = (): void => {
    const ui = new VideoPlayerUI(this.videoContainer, { volumeValue: this.volumeValue, icons: this.iconsFolder });
    ui.unMount();
    this._onClickControls(true)();
    this._onChangeFullScreen(true)();
    this._onChangeProgessVideo(true)();
    this._onChangeVolume(true)();
    //this._onMouse(true)();
  };

  checkSelectors = (): boolean => {
    if (!this.video) {
      console.error('video selctor not found', this.video);
      return true;
    }

    if (!this.videoContainer) {
      console.error('video container selector not found', this.videoContainer);
      return true;
    }

    return false;
  };

  private secondsToHms(d: number) {
    d = Number(d);
    const h = Math.floor(d / 3600);
    const m = Math.floor((d % 3600) / 60);
    const s = Math.floor((d % 3600) % 60);
    const zero = (a: number) => {
      return a > 9 ? a : '0' + a;
    };
    return {
      h,
      m,
      s,
      time: `${zero(m)}:${zero(s)}`,
    };
  }
  private _onMouse(unMount: boolean = false) {
    const onmousemove = (e: MouseEvent) => {
      if (this.isVideoPlay) {
        this.mX = e.clientX;
        this.mY = e.clientY;
      }
    };

    if (this.videoContainer && !unMount) {
      this.videoContainer.addEventListener('mousemove', onmousemove);
    }

    return () => {
      this.videoContainer?.removeEventListener('mousemove', onmousemove);
    };
  }

  private _onClickControls(unMount: boolean = false) {
    const click = (e: MouseEvent) => {
      const event = e.target as HTMLElement;
      const keys = Object.keys(this.controlsUI);
      const controlEvents: IFactoryEvent = {
        [UiClasses.play]: () => {
          this.isPlay = true;
          this.fadeOutIN(UiClasses.pause, UiClasses.play, FadeTime.controls);
          this.video?.play();
        },

        [UiClasses.pause]: () => {
          this.isPlay = false;
          this.fadeOutIN(UiClasses.play, UiClasses.pause, FadeTime.controls);
          this.video?.pause();
        },

        [UiClasses.fullscreen]: () => {
          if (this.video && this.videoContainer) {
            this.isFullScreen = true;
            const video = this.videoContainer;

            if (video.requestFullscreen) {
              video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
              video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
              video.msRequestFullscreen();
            }
            this.fadeOutIN(UiClasses.fullscreenCancel, UiClasses.fullscreen, FadeTime.fullscreen);
          }
        },
        [UiClasses.fullscreenCancel]: () => {
          if (this.video && this.videoContainer) {
            this.isFullScreen = false;
            if (document.exitFullscreen) {
              document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
              document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
            }
            this.fadeOutIN(UiClasses.fullscreen, UiClasses.fullscreenCancel, FadeTime.fullscreen);
          }
        },
        [UiClasses.volume]: () => {
          this.isVolume = !this.isVolume;
          const volume = this.controlsUI[UiClasses.volumeProgressContainer];

          if (this.isVolume) {
            volume &&
              this.fadeIn({
                el: volume,
                display: 'flex',
                time: FadeTime.volume,
              });
          } else {
            volume &&
              this.fadeOut({
                el: volume,
                time: FadeTime.volume,
              });
          }
        },
        [UiClasses.track]: (event) => {
          const track = this.videoContainer?.querySelector('.' + UiClasses.track) as HTMLDivElement;
          const posX = event.offsetX;
          if (this.video) {
            if (!this.isPlay) {
              this.fadeOutIN(UiClasses.pause, UiClasses.play, FadeTime.controls);
            }

            this.video.pause();
            this.video.currentTime = (this.video.duration * posX) / track.offsetWidth;
            this.video.play();
          }
        },
        [UiClasses.videoOverlayBtn]: () => {
          this.fadeOutIN(UiClasses.videoPlayerControls, UiClasses.videoContainerOverlay, 40, {
            callback: () => {
              this.video?.play();
            },
            display: 'flex',
          });
        },
      };

      for (let i = 0; i < keys.length; i++) {
        if (event.matches('.' + keys[i]) && typeof controlEvents[keys[i]] !== 'undefined') {
          const el = this.controlsUI[keys[i]];
          el && controlEvents[keys[i]](e, el);
          break;
        }
      }
    };

    if (!unMount) {
      this.videoContainer?.addEventListener('click', click, false);
    }

    return () => {
      this.videoContainer?.removeEventListener('click', click, false);
    };
  }

  private _onChangePip(unMount: boolean = false) {
    const video = this.video as HTMLVideoElement;

    const onEnterpictureinpicture = () => {
      video.pause();
      this.fadeOutIN(UiClasses.play, UiClasses.pause, FadeTime.controls);
    };
    const onLeavepictureinpicture = () => {
      video.pause();
      this.fadeOutIN(UiClasses.play, UiClasses.pause, FadeTime.controls);
    };

    if (document.pictureInPictureEnabled && !unMount) {
      video.addEventListener('enterpictureinpicture', onEnterpictureinpicture, false);
      video.addEventListener('leavepictureinpicture', onLeavepictureinpicture, false);

      if (this.navigator) {
        //@ts-ignore
        this.navigator.mediaSession.setActionHandler('pause', () => {
          video.pause();
          this.fadeOutIN(UiClasses.play, UiClasses.pause, FadeTime.controls);
        });
        //@ts-ignore
        this.navigator.mediaSession.setActionHandler('play', () => {
          video.play();
          this.fadeOutIN(UiClasses.pause, UiClasses.play, FadeTime.controls);
        });
      }
    }

    return () => {
      video.removeEventListener('enterpictureinpicture', onEnterpictureinpicture, false);
      video.removeEventListener('leavepictureinpicture', onLeavepictureinpicture, false);
    };
  }

  private _onChangeFullScreen(unMount: boolean = false) {
    const onfullscreenchange = () => {
      if (this.isFullScreen) {
        this.isFullScreen = false;
        this.fadeOutIN(UiClasses.fullscreenCancel, UiClasses.fullscreen, FadeTime.fullscreen);
      } else {
        this.isFullScreen = true;
        this.fadeOutIN(UiClasses.fullscreen, UiClasses.fullscreenCancel, FadeTime.fullscreen);
      }
    };

    if (this.video && this.videoContainer && !unMount) {
      // TODO: Add userAgent
      this.videoContainer.addEventListener('webkitfullscreenchange', onfullscreenchange);
      this.videoContainer.addEventListener('mozfullscreenchange', onfullscreenchange);
      this.videoContainer.addEventListener('fullscreenchange', onfullscreenchange);
    }

    return () => {
      this.videoContainer?.removeEventListener('webkitfullscreenchange', onfullscreenchange);
      this.videoContainer?.removeEventListener('mozfullscreenchange', onfullscreenchange);
      this.videoContainer?.removeEventListener('fullscreenchange', onfullscreenchange);
    };
  }

  private _onChangeProgessVideo(unMount: boolean = false) {
    const video = this.video as HTMLVideoElement;

    const videoEnd = () => {
      this.isPlay = false;
      video.pause();
      video.currentTime = 0;

      this.fadeOutIN(UiClasses.videoContainerOverlay, UiClasses.videoPlayerControls, 40, {
        callback: () => {
          this.fadeOutIN(UiClasses.play, UiClasses.pause, 0);
        },
        display: 'flex',
      });
    };

    const videoStart = () => {
      this.isPlay = true;
      this.fadeOutIN(UiClasses.pause, UiClasses.play, FadeTime.controls);
    };

    const timeupdate = () => {
      const duration = video.duration;
      console.log();
      if (duration > 0) {
        const progressUI = this.controlsUI[UiClasses.progress];
        const timeUI = this.controlsUI[UiClasses.trackTime];
        if (progressUI) progressUI.style.width = (video.currentTime / duration) * 100 + '%';
        if (timeUI) timeUI.innerText = this.secondsToHms(video.currentTime).time;
      }
    };

    const progress = () => {
      const duration = video.duration;
      if (duration > 0) {
        for (let i = 0; i < video.buffered.length; i++) {
          if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
            const bufferUI = this.controlsUI[UiClasses.buffer];
            if (bufferUI) bufferUI.style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + '%';
            break;
          }
        }
      }
    };

    const loadedmetadata = () => {
      const timeFullUI = this.controlsUI[UiClasses.trackTimeFull];
      if (timeFullUI) timeFullUI.innerText = this.secondsToHms(video.duration).time;
    };

    if (this.video && !unMount) {
      video.addEventListener('progress', progress, false);
      video.addEventListener('timeupdate', timeupdate, false);
      video.addEventListener('ended', videoEnd, false);
      video.addEventListener('play', videoStart, false);
      video.addEventListener('loadedmetadata', loadedmetadata, false);
    }

    return () => {
      video.removeEventListener('ended', videoEnd, false);
      video.removeEventListener('progress', progress, false);
      video.removeEventListener('timeupdate', timeupdate, false);
      video.removeEventListener('play', videoStart, false);
      video.addEventListener('loadedmetadata', loadedmetadata, false);
    };
  }

  private _onChangeVolume(unMount: boolean = false) {
    const range = this.controlsUI[UiClasses.rangeVolume];
    const volume = (e: any) => {
      const label = this.videoContainer?.querySelector('.' + UiClasses.labelValue) as HTMLDivElement;
      const target = e.target as HTMLInputElement;
      const video = this.video;

      label.textContent = target.value + '%';
      if (video) video.volume = parseInt(target.value) / 100;
    };

    if (!unMount && this.video && range) {
      range.addEventListener('input', volume, false);
    }

    return () => {
      range?.removeEventListener('input', volume, false);
    };
  }

  playerInit = () => {
    if (!this.checkSelectors() && this.video) {
      this._onClickControls();
      this._onChangePip();
      this._onChangeFullScreen();
      this._onChangeProgessVideo();
      this._onChangeVolume();
      // this._onMouse();
      this.video.volume = this.volumeValue / 100;
    }
  };

  fadeIn({ el, display = 'block', time = 10, callback = undefined }: IFade) {
    el.style.opacity = '0';
    el.style.display = display || 'block';

    (function fade() {
      var val: number = parseFloat(el.style.opacity);
      if ((val += time / 1000) < 1.01) {
        el.style.opacity = val.toString();
        requestAnimationFrame(fade);
      } else {
        if (callback !== undefined) {
          callback();
        }
      }
    })();
  }

  fadeOut({ el, time = 10, callback = undefined }: IFade) {
    el.style.opacity = '1';
    (function fade() {
      //@ts-ignore
      if ((el.style.opacity -= time / 1000) < 0) {
        el.style.display = 'none';
        if (callback !== undefined) {
          callback();
        }
      } else {
        requestAnimationFrame(fade);
      }
    })();
  }

  private fadeOutIN(
    showClassEl: string,
    hideClassEl: string,
    time: number,
    param?: {
      callback?: () => void;
      display?: string;
    }
  ) {
    const el = this.controlsUI[hideClassEl];
    const elShow = this.controlsUI[showClassEl];
    const callback = param?.callback;

    el &&
      this.fadeOut({
        el,
        time,
        callback: () => {
          elShow && this.fadeIn({ el: elShow, display: param?.display || 'block', time, callback });
        },
      });
  }
}
