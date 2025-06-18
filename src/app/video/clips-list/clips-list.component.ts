import { Component, OnInit, OnDestroy, inject, input } from '@angular/core';
import { ClipService } from '../../services/clip.service';
import { RouterLink } from '@angular/router';
import { FbTimestampPipe } from '../../shared/pipes/fb-timestamp.pipe';

@Component({
  selector: 'app-clips-list',
  imports: [RouterLink, FbTimestampPipe],
  templateUrl: './clips-list.component.html',
  styleUrl: './clips-list.component.css'
})
export class ClipsListComponent implements OnInit, OnDestroy {
  clipService = inject(ClipService);
  scrollable = input(true); //enable infinite scrolling

  constructor() {
    this.clipService.getClips();
  }

  ngOnInit() {
    if (this.scrollable()) {
      window.addEventListener('scroll', this.handleScroll);
    }
  }

  ngOnDestroy() {
    if (this.scrollable()) {
      window.removeEventListener('scroll', this.handleScroll);
    }
    this.clipService.pageClips.set([]); //reset the clips
  }

  handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    const { innerHeight } = window;

    const bottomOfWindow = Math.round(scrollTop) + innerHeight > offsetHeight - 150;

    if(bottomOfWindow) {
      this.clipService.getClips();
    }
  }
}
