import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specilityToImage'
})
export class SpecilityToImagePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
