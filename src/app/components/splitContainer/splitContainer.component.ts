import { Component, ContentChildren, QueryList, ComponentFactoryResolver, ViewContainerRef, AfterContentInit } from '@angular/core';

import { SplitterComponent } from '../splitter/splitter.component';
import { SplitBehaviourDirective, SplitBehaviour, Position } from './splitBehaviour.directive';

/**
 * Hosts resizable content areas divided by a draggable border (splitter). 
 * 
 * The split container defined flex attributes to allow the horizontal arrangement of child content areas.
 * On initialization, it will query all child elements in the light DOM annotated by the split-behaviour directive
 * and separate them by splitters.
 * As the splitBehaviour directive manages concrete content area resizing, dragging events of the splitter (positionChanged) are subscribed
 * and propagated to the directive.
 **/
@Component({
    selector: 'split-container',
    template: `
        <div class="split-container">
            <ng-content></ng-content>
        </div>
    `,
    styles: [`
        .split-container {
            display: flex;
            flex-direction: row;
            flex-wrap: no-wrap;
            flex-grow: 1;
            height:100%;
        }
    `]
})
export class SplitContainerComponent implements AfterContentInit {
    @ContentChildren(SplitBehaviourDirective, {read: ViewContainerRef})
    private panesVcr: QueryList<ViewContainerRef>;

    @ContentChildren(SplitBehaviourDirective)
    private panes: QueryList<SplitBehaviourDirective>;

    constructor(private resolver: ComponentFactoryResolver) {
    }

    public ngAfterContentInit(): void {
        let splitterFactory = this.resolver.resolveComponentFactory(SplitterComponent);

        let paneDirectives = this.panes.toArray();
        this.panesVcr.map((vcr, idx) => {
            if(paneDirectives[idx].behaviour == SplitBehaviour[SplitBehaviour.fixed]) {
                let splitter = vcr.createComponent(splitterFactory);
                splitter.instance.splitBehaviour = paneDirectives[idx];
                splitter.instance.positionChanged.subscribe((pos: Position) => {
                    paneDirectives[idx].changePosition(pos);
                });
            }
        });
    }
}