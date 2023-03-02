import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-i-frame',
  templateUrl: './i-frame.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IFrameComponent {
  @Input() src!: string;

  constructor(public sanitizer: DomSanitizer) {}
}
