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

interface IVideoPlayerElements {
  unMount: () => void;
  controls: (container: HTMLDivElement | null, isUnmount?: boolean) => IElementsReturn;
  createUI: () => IVideoPlayerElementsCreate;
}

interface IFactoryEvent {
  [key: string]: (el: HTMLElement) => void;
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

export enum ButtonsClasses {
  play = 'videoPlay',
  stop = 'videoStop',
  pause = 'videoPause',
  start = 'videoStart',
  fullscreen = 'videoFullscreen',
  fullscreenCancel = 'videoFullscreenCancel',
  buffer = 'playerBufferedAmount',
  progress = 'playerProgressAmount',
  track = 'playerTrack',
}

enum FadeTime {
  fullscreen = 30,
  controls = 25,
}

interface IFade {
  el: HTMLElement;
  display?: string;
  time?: number;
  callback?: () => void;
}

class VideoPlayerElements implements IVideoPlayerElements {
  private container: HTMLDivElement | null;

  constructor(videoContainer: HTMLDivElement | null) {
    this.container = videoContainer;
  }

  unMount = (): void => {
    this.controls(this.container, true);
  };

  controls(container: HTMLDivElement | null, isUnmount?: boolean): IElementsReturn {
    if (!container) {
      throw new Error('Not found container in controls element');
    }

    const className = 'video-player-controls';
    const uiClasses = [
      ButtonsClasses.play,
      ButtonsClasses.pause,
      ButtonsClasses.fullscreen,
      ButtonsClasses.fullscreenCancel,
      ButtonsClasses.buffer,
      ButtonsClasses.progress,
    ];

    if (isUnmount) {
      const el = document.querySelector(`.${className}`);
      el?.remove();
      return {
        status: 'remove',
        class: className,
        ui: uiClasses,
      };
    }

    const constrols = `
      <div class="${className}">
        <div class="player-btn-left">
          <div class="player-btn-pp">
            <button class="${uiClasses[0]} contarols-btn">
              <svg version="1.1"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 163.861 163.861" style="enable-background:new 0 0 163.861 163.861;" xml:space="preserve">
                <path d="M34.857,3.613C20.084-4.861,8.107,2.081,8.107,19.106v125.637c0,17.042,11.977,23.975,26.75,15.509L144.67,97.275
                  c14.778-8.477,14.778-22.211,0-30.686L34.857,3.613z"/>
              </svg>
            </button>
            <button class="${uiClasses[1]} contarols-btn" style="display: none;">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 47.607 47.607" style="enable-background:new 0 0 47.607 47.607;" xml:space="preserve">
                <path d="M17.991,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631C4.729,2.969,7.698,0,11.36,0
                  l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
                <path d="M42.877,40.976c0,3.662-2.969,6.631-6.631,6.631l0,0c-3.662,0-6.631-2.969-6.631-6.631V6.631
                  C29.616,2.969,32.585,0,36.246,0l0,0c3.662,0,6.631,2.969,6.631,6.631V40.976z"/>
              </svg>
            </button>
          </div>
        </div>
        <div class="player-track ${uiClasses[6]}">
          <div class="player-buffered">
            <span class="player-buffered-amount ${uiClasses[4]}"></span>
          </div>
          <div class="player-progress">
            <span class="player-progress-amount playerProgressAmount ${uiClasses[5]}"></span>
          </div>
        </div>
        <div class="player-btn-right">
          <div class="player-btn-pp">
            <button class="${uiClasses[2]} contarols-btn">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 357 357" style="enable-background:new 0 0 357 357;" xml:space="preserve">
                <path d="M51,229.5H0V357h127.5v-51H51V229.5z M0,127.5h51V51h76.5V0H0V127.5z M306,306h-76.5v51H357V229.5h-51V306z M229.5,0v51
                  H306v76.5h51V0H229.5z"/>
              </svg>
            </button>
            <button class="${uiClasses[3]} contarols-btn" style="display: none;">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
                <polygon points="24.586,27.414 29.172,32 32,29.172 27.414,24.586 32,20 20,20 20,32 			"/>
                <polygon points="0,12 12,12 12,0 7.414,4.586 2.875,0.043 0.047,2.871 4.586,7.414 			"/>
                <polygon points="0,29.172 2.828,32 7.414,27.414 12,32 12,20 0,20 4.586,24.586 			"/>
                <polygon points="20,12 32,12 27.414,7.414 31.961,2.871 29.133,0.043 24.586,4.586 20,0 			"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;

    container.insertAdjacentHTML('beforeend', constrols);

    return {
      status: 'insert',
      class: className,
      ui: uiClasses,
    };
  }

  createUI = (): IVideoPlayerElementsCreate => {
    return {
      controls: this.controls(this.container),
    };
  };
}

export class VideoPlayer {
  //https://developer.mozilla.org/ru/docs/Web/Guide/Audio_and_video_delivery/buffering_seeking_time_ranges
  private video: HTMLVideoElement | null;
  private videoContainer: HTMLDivElement | null;
  private controlsUI!: IUi;
  private isPlay: boolean = false;
  private isFullScreen: boolean = false;
  private navigator = window.navigator;

  constructor(videoID: string = '#player-video', videoContainerID: string = '#player-conrainer') {
    this.video = document.querySelector(videoID);
    this.videoContainer = document.querySelector(videoContainerID);

    const ui = new VideoPlayerElements(this.videoContainer);
    const uiList = ui.createUI();

    Object.keys(uiList).forEach((key: string) => {
      uiList[key].ui.forEach((i: string) => {
        this.controlsUI = { ...this.controlsUI, [i]: document.querySelector('.' + i) };
      });
    });

    this._onClickControls = this._onClickControls.bind(this);
    this._onChangePip = this._onChangePip.bind(this);
    this._onChangeFullScreen = this._onChangeFullScreen.bind(this);
    this.fadeOutIN = this.fadeOutIN.bind(this);
    this._onChangeProgessVideo = this._onChangeProgessVideo.bind(this);
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
    const ui = new VideoPlayerElements(this.videoContainer);
    ui.unMount();
    this._onClickControls(true)();
    this._onChangeFullScreen(true)();
    this._onChangeProgessVideo(true)();
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

  private _onClickControls(unMount: boolean = false) {
    const click = (e: Event) => {
      const event = e.target as HTMLElement;
      const keys = Object.keys(this.controlsUI);

      const controlEvents: IFactoryEvent = {
        [ButtonsClasses.play]: (el: HTMLElement) => {
          this.isPlay = true;
          this.fadeOutIN(ButtonsClasses.pause, ButtonsClasses.play, FadeTime.controls);
          this.video?.play();
        },

        [ButtonsClasses.pause]: (el: HTMLElement) => {
          this.isPlay = false;
          this.fadeOutIN(ButtonsClasses.play, ButtonsClasses.pause, FadeTime.controls);
          this.video?.pause();
        },

        [ButtonsClasses.fullscreen]: (el: HTMLElement) => {
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
            this.fadeOutIN(ButtonsClasses.fullscreenCancel, ButtonsClasses.fullscreen, FadeTime.fullscreen);
          }
        },
        [ButtonsClasses.fullscreenCancel]: (el: HTMLElement) => {
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
            this.fadeOutIN(ButtonsClasses.fullscreen, ButtonsClasses.fullscreenCancel, FadeTime.fullscreen);
          }
        },
      };

      for (let i = 0; i < keys.length; i++) {
        if (event.matches('.' + keys[i])) {
          const el = this.controlsUI[keys[i]];
          el && controlEvents[keys[i]](el);
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
      this.fadeOutIN(ButtonsClasses.play, ButtonsClasses.pause, FadeTime.controls);
    };
    const onLeavepictureinpicture = () => {
      video.pause();
      this.fadeOutIN(ButtonsClasses.play, ButtonsClasses.pause, FadeTime.controls);
    };

    if (document.pictureInPictureEnabled && !unMount) {
      video.addEventListener('enterpictureinpicture', onEnterpictureinpicture, false);
      video.addEventListener('leavepictureinpicture', onLeavepictureinpicture, false);

      if (this.navigator) {
        //@ts-ignore
        this.navigator.mediaSession.setActionHandler('pause', () => {
          video.pause();
          this.fadeOutIN(ButtonsClasses.play, ButtonsClasses.pause, FadeTime.controls);
        });
        //@ts-ignore
        this.navigator.mediaSession.setActionHandler('play', () => {
          video.play();
          this.fadeOutIN(ButtonsClasses.pause, ButtonsClasses.play, FadeTime.controls);
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
        this.fadeOutIN(ButtonsClasses.fullscreenCancel, ButtonsClasses.fullscreen, FadeTime.fullscreen);
      } else {
        this.isFullScreen = true;
        this.fadeOutIN(ButtonsClasses.fullscreen, ButtonsClasses.fullscreenCancel, FadeTime.fullscreen);
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
      this.fadeOutIN(ButtonsClasses.play, ButtonsClasses.pause, FadeTime.controls, () => {
        video.pause();
        video.currentTime = 0;
      });
    };

    const timeupdate = () => {
      const duration = video.duration;
      if (duration > 0) {
        const progressUI = this.controlsUI[ButtonsClasses.progress];
        if (progressUI) progressUI.style.width = (video.currentTime / duration) * 100 + '%';
      }
    };

    const progress = () => {
      const duration = video.duration;
      if (duration > 0) {
        for (let i = 0; i < video.buffered.length; i++) {
          if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
            const bufferUI = this.controlsUI[ButtonsClasses.buffer];
            if (bufferUI) bufferUI.style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + '%';
            break;
          }
        }
      }
    };

    if (this.video && !unMount) {
      video.addEventListener('progress', progress, false);
      video.addEventListener('timeupdate', timeupdate, false);
      video.addEventListener('ended', videoEnd, false);
    }

    return () => {
      video.removeEventListener('ended', videoEnd, false);
      video.removeEventListener('progress', progress, false);
      video.removeEventListener('timeupdate', timeupdate, false);
    };
  }

  player = () => {
    if (!this.checkSelectors() && this.video) {
      this._onClickControls();
      this._onChangePip();
      this._onChangeFullScreen();
      this._onChangeProgessVideo();
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

  private fadeOutIN(showClassEl: string, hideClassEl: string, time: number, callbackShow?: () => void) {
    const el = this.controlsUI[hideClassEl];
    const elShow = this.controlsUI[showClassEl];
    const callback = callbackShow;

    el &&
      this.fadeOut({
        el,
        time,
        callback: () => {
          elShow && this.fadeIn({ el: elShow, time, callback });
        },
      });
  }
}
