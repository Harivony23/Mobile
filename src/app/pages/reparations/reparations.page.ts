import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { Timestamp } from '@angular/fire/firestore';
import { forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { RepairService } from '../../services/repair.service';
import { AuthService } from '../../services/auth';
import { CarService } from '../../services/car.service';
import { Repair } from '../../models/repair.model';

import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-reparations',
  templateUrl: './reparations.page.html',
  styleUrls: ['./reparations.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class ReparationsPage implements OnInit {
  repairs: (Repair & { carName?: string })[] = [];

  private repairService = inject(RepairService);
  private authService = inject(AuthService);
  private carService = inject(CarService);

  constructor() {
    addIcons({ add });
  }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    this.repairService
      .getUserRepairs(user.uid)
      .pipe(
        switchMap((repairs) => {
          if (repairs.length === 0) return of([]);
          // Create an array of observables to fetch car data for each repair
          const repairsWithCars$ = repairs.map((r) =>
            this.carService.getCar(r.carId).pipe(
              map((car) => ({
                ...r,
                carName: car
                  ? `${car.marque} ${car.modele}`
                  : 'Voiture inconnue',
                createdAt:
                  r.createdAt instanceof Timestamp
                    ? r.createdAt.toDate()
                    : r.createdAt,
              })),
            ),
          );
          // Wait for all observables to complete
          return forkJoin(repairsWithCars$);
        }),
      )
      .subscribe((data) => {
        this.repairs = data;
      });
  }

  getStatusColor(status: Repair['status']) {
    switch (status) {
      case 'done':
        return 'success';
      case 'accepted':
        return 'primary';
      case 'in_progress':
        return 'warning';
      case 'pending':
        return 'medium';
      case 'cancelled':
        return 'danger';
      default:
        return 'medium';
    }
  }

  getStatusLabel(status: Repair['status']) {
    return {
      pending: 'En attente',
      accepted: 'Acceptée',
      in_progress: 'En cours',
      done: 'Terminée',
      cancelled: 'Annulée',
    }[status];
  }
}
