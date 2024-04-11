import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './generic/button/button.component';
import { RouterModule } from '@angular/router';
import { TagComponent } from './generic/tag/tag.component';

@NgModule({
  declarations: [ButtonComponent, TagComponent],
  imports: [CommonModule, RouterModule],
  exports: [ButtonComponent, TagComponent],
})
export class ComponentsModule {}
