import { Component, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { SplitBehaviourDirective, Position } from '../splitContainer/splitBehaviour.directive';

/**
 * A horizontal, draggable divider element between resizable content areas within a split container.
 * This component and its creation is managed by a split container.
 **/
@Component({
    selector: 'splitter',
    template: `
        <div #splitter class="splitter" 
            (mousedown)="onMouseDown($event)" 
            (document:mouseup)="onMouseUp($event)" 
            (document:mousemove)="onMouseMove($event)"></div>
    `,
    host: { 'style': 'position:relative' },
    styles: [`
        .splitter {
            flex: 0 0 auto;
            width: 10px;
            height:100%;
            cursor: col-resize;

            background-image:url('split-horizontal.svg');
            background-position:50% 50%;
            background-repeat:no-repeat;

            /* Needed for height:100% without having an explicit height given to the parent */
            position:absolute;
        }
    `]
})
export class SplitterComponent {
    private startX: number;

    private startWidth: number;

    private dragging: boolean;

    @ViewChild('splitter')
    private element: ElementRef;

    private _splitBehaviour: SplitBehaviourDirective;

    @Output()
    public positionChanged: EventEmitter<Position> = new EventEmitter();

    constructor() {
        this.dragging = false;
    }

    public set splitBehaviour(value: SplitBehaviourDirective) {
        this._splitBehaviour = value;
    }

    public get splitBehaviour() {
        return this._splitBehaviour;
    }

    private onMouseDown(e: MouseEvent): void {
        this.dragging = true;
        this.startX = e.clientX;
        this.startWidth = this.splitBehaviour.getElementWidth();
    }

    private onMouseUp(e: MouseEvent): void {
        this.dragging = false;
    }

    private onMouseMove(e: MouseEvent): void {
        if(this.dragging) {

            this.positionChanged.emit(new Position(this.startWidth + e.clientX - this.startX, e.pageY));
        }
    }

    private onMouseLeave(e: MouseEvent): void {
        this.dragging = false;
    }
}