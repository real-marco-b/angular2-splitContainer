import { Directive, ElementRef, Renderer, Input, OnInit } from '@angular/core';

export class Position {
    constructor(public x: number, public y: number) {
    }
}

export enum SplitBehaviour {
    fixed,
    dynamic
}

/**
 * Marks an element as content area inside a resizable split container.
 * The input value of the directive can either be 'fixed' or 'dynamic' and describes the way
 * the content area is expected to resize within the split container space. 
 * - A fixed element is expected to have an explicitly defined size, which can be resized by the user through a split element
 * - A dynamic elment is expected to fill up the space next to fixed elements.
 * 
 * Initially, the directive will set CSS flexbox attributes to stack them horizontally.
 * It also serves as a data provider to expose the element width of the hosting content area, which is most likely a div.
 * Last but not least, the directive takes care of resizing the host element.
 * 
 * @example 
 * <div style="width:100px" split-behaviour="fixed">
 * </div>
 **/
@Directive({
    selector: '[split-behaviour]'
})
export class SplitBehaviourDirective implements OnInit {
    private _behaviour: SplitBehaviour;

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    @Input('split-behaviour')
    public set behaviour(value: string) {
        this._behaviour = SplitBehaviour[value];
    }

    public get behaviour(): string {
        return SplitBehaviour[this._behaviour];
    }

    public changePosition(vector: Position) {
        this.renderer.setElementStyle(this.el.nativeElement, 'width', `${vector.x}px`);
    }

    public getElementWidth(): number {
        let paddingL = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("padding-left"));
        let paddingR = parseInt(window.getComputedStyle(this.el.nativeElement, null).getPropertyValue("padding-right"));
        return <number>this.el.nativeElement.offsetWidth - paddingL - paddingR;
    }

    public ngOnInit() {
        if(this._behaviour.valueOf() == SplitBehaviour.fixed.valueOf()) {
            this.renderer.setElementStyle(this.el.nativeElement, 'flex', '0 0 auto');
        }
        else if(this._behaviour.valueOf() == SplitBehaviour.dynamic.valueOf()) {
            this.renderer.setElementStyle(this.el.nativeElement, 'flex', '1 1 auto');
        }
        this.renderer.setElementStyle(this.el.nativeElement, 'overflow', 'auto');
    }
}