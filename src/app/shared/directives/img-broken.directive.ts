import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'img[appImgBroken]'
})
export class ImgBrokenDirective {
  @Input() customImg: string = 'http://josecostaros.es/wp-content/uploads/2013/04/hola_mundo-676x450.jpg'
  @HostListener('error') handleError(): void{
    const elNative = this.elHost.nativeElement;
    elNative.src = this.customImg;
  }

  constructor(private elHost: ElementRef) { 
  }

}
