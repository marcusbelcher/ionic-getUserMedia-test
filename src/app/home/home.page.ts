import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  @ViewChild('videoContainer') videoContainer;
  private video: HTMLVideoElement;

  constructor(private platform: Platform, private androidPermissions: AndroidPermissions) {
    this.video = document.createElement('video');
    this.video.width = 640;
    this.video.height = 480;
    this.video.setAttribute('autoplay', '');
    
    if (this.platform.is('cordova')) {
      this.platform.ready().then(() => {
        this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
          result => console.log('Has permission?', result.hasPermission),
          err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
        );

        this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]);
      });
    }
  }

  ngAfterViewInit() {
    this.videoContainer.nativeElement.appendChild(this.video);
    this.initWebRTC();
  }

  initWebRTC() {
    const constraints = {
      video: true,
      audio: false
    };

    const handleSuccess = (stream: MediaStream) => {
      (<any>window).stream = stream; // make stream available to browser console
      this.video.srcObject = stream;
    };

    const handleError = (error: any) => {
      const p = document.createElement('p');
      p.innerHTML = 'navigator.getUserMedia error: ' + error.name + ', ' + error.message;
      this.videoContainer.nativeElement.appendChild(p);
    };

    navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
  }
}
