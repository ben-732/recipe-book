import { Component, Input } from '@angular/core';
import { TagSummary } from '../../../../generated/models';
// import {TagSummary} from '../../../generated/models';
@Component({
  selector: 'recipe-tag',
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input() tag!: TagSummary;

  @Input() size: 'small' | 'large' = 'small';
}
