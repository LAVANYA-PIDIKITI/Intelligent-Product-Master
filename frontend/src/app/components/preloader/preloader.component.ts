import { Component } from '@angular/core';
import{LoaderService} from '../preloader/loader.service';
@Component({
  selector: 'app-preloader',
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css'
})
export class PreloaderComponent {
  constructor(public loader: LoaderService) { }
}
