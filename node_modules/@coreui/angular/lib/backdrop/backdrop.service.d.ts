import { RendererFactory2 } from '@angular/core';
import * as i0 from "@angular/core";
export declare class BackdropService {
    private document;
    private rendererFactory;
    private backdropClick;
    backdropClick$: import("rxjs").Observable<boolean>;
    private renderer;
    private unListen;
    constructor(document: Document, rendererFactory: RendererFactory2);
    get scrollbarWidth(): string;
    setBackdrop(type?: string): any;
    clearBackdrop(backdrop: any): any;
    onClickHandler(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BackdropService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BackdropService>;
}
