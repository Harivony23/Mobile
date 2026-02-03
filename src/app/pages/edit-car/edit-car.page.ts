import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.page.html',
  styleUrls: ['./edit-car.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class EditCarPage implements OnInit {
  car: any = {
    marque: '',
    modele: '',
    immatriculation: '',
    annee: 2024,
    proprietaire: ''
  };
  carId: string | null = null;

  private route = inject(ActivatedRoute);
  private carService = inject(CarService);
  private navCtrl = inject(NavController);
  private toastCtrl = inject(ToastController);

  ngOnInit() {
    this.carId = this.route.snapshot.paramMap.get('id');
    if (this.carId) {
      this.carService.getCar(this.carId).subscribe(data => {
        this.car = data;
      });
    }
  }

  async save() {
    if (this.carId) {
      await this.carService.updateCar(this.carId, this.car);
      const toast = await this.toastCtrl.create({
        message: 'Voiture mise à jour',
        duration: 2000
      });
      toast.present();
      this.navCtrl.back();
    }
  }
}
