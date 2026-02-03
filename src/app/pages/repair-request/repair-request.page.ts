import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

import { CarService } from '../../services/car.service';
import { RepairService } from '../../services/repair.service';
import { AuthService } from '../../services/auth';
import { InterventionService } from '../../services/intervention.service';

import { Car } from '../../models/car.model';
import { Intervention } from '../../models/intervention.model';
import { Repair } from '../../models/repair.model';

@Component({
  standalone: true,
  selector: 'app-repair-request',
  templateUrl: './repair-request.page.html',
  imports: [CommonModule, FormsModule, IonicModule]
})
export class RepairRequestPage implements OnInit {

  cars: Car[] = [];
  interventions: Intervention[] = [];

  selectedCarId = '';
  selectedInterventionId = '';

  private carService = inject(CarService);
  private repairService = inject(RepairService);
  private authService = inject(AuthService);
  private interventionService = inject(InterventionService);
  private router = inject(Router);

  ngOnInit() {
    this.carService.getCars().subscribe(cars => {
      this.cars = cars;
    });

    this.interventionService.getInterventions().subscribe(data => {
      this.interventions = data;
    });
  }

  async submitRequest() {
    const user = this.authService.getCurrentUser();
    if (!user || !this.selectedCarId || !this.selectedInterventionId) return;

    const intervention = this.interventions.find(
      i => i.id === this.selectedInterventionId
    );
    if (!intervention) return;

    const repair: Repair = {
      carId: this.selectedCarId,
      userId: user.uid,

      interventionId: intervention.id,
      interventionName: intervention.name,
      price: intervention.price,
      duration_minutes: intervention.duration_minutes,

      status: 'pending',
      createdAt: new Date()
    };

    await this.repairService.addRepair(repair);
    this.router.navigateByUrl('/home');
  }
}
