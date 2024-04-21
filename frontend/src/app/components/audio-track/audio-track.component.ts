import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-audio-track',
  templateUrl: './audio-track.component.html',
  styleUrl: './audio-track.component.css'
})
export class AudioTrackComponent {
  @Input() audioSrc: string | undefined;
}
