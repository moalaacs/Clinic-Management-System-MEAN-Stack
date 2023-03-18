import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'specilityToImage'
})
export class SpecilityToImagePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case "Surgical": return "surgery"
      case "Pediatrics": return "infant"
      case "Women's Health": return "women"
      case "Cardiology": return "healthy-heart"
      case "Neurology": return "brain"
      case "Dental": return "tooth"
      case "Physical Therapy": return "exercise"
      case "Radiologic": return "x-ray"
      case "Dermatology": return "spots"
      default: return ""
    }
  }

}
