import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'authenticator';
  hoverSound = new Audio('/assets/hover-sound.mp3');

  // Add HostListener to detect mouseenter event
  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event: MouseEvent) {
    this.playHoverSound();
  }

  // Add HostListener to detect mouseleave event
  @HostListener('mouseleave', ['$event'])
  onMouseLeave(event: MouseEvent) {
    this.stopHoverSound();
  }

  playHoverSound() {
    this.hoverSound.play();
  }

  stopHoverSound() {
    this.hoverSound.pause();
    this.hoverSound.currentTime = 0; // Reset audio to the beginning
  }
}
