import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero-section',
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css']
})
export class HeroSectionComponent {
  carouselItems = [
    {
      id: 1,
      image: '../../../assets/images/Nurse_strength_quotes-1024x554.jpg',
      description: 'Image 1 description'
    },
    {
      id: 2,
      image: '../../../assets/images/benyamin-bohlouli-e7MJLM5VGjY-unsplash.jpg',
      description: 'Image 2 description'
    },
    {
      id: 3,
      image: '../../../assets/images/hospital-profession-people-medicine-concept-group-happy-doctors-hospital_380164-96293.avif',
      description: 'Image 3 description'
    }
  ];

  numberOfClinics = 10;
  numberOfDoctors = 50;
  numberOfPatients = 1000;

  constructor() { }
}


