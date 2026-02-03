import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Car } from '../../models/car.model';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cars',
  templateUrl: './cars.page.html',
  styleUrls: ['./cars.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule]
})
export class CarsPage implements OnInit {

  cars: Car[] = [];

  constructor(private carService: CarService) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }

  deleteCar(id: string | undefined) {
    if (id) {
      this.carService.deleteCar(id);
    }
  }
}
