import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { SplitContainerComponent } from './components/splitContainer/splitContainer.component';
import { SplitBehaviourDirective } from './components/splitContainer/splitBehaviour.directive';
import { SplitterComponent } from './components/splitter/splitter.component';

@NgModule({
  imports:      [ BrowserModule ],
  entryComponents: [
    SplitterComponent
  ],
  declarations: [ 
    AppComponent,
    SplitContainerComponent,
    SplitterComponent,
    SplitBehaviourDirective
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
