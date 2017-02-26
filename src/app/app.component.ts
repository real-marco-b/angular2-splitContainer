import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <split-container>
      <div class="navigation" split-behaviour="fixed">
        Navigation
      </div>

      <div class="content" split-behaviour="dynamic">
        Content
      </div>
    </split-container>
  `,
})
export class AppComponent  { name = 'Angular'; }
