import { Component, inject } from '@angular/core';
import { CarService } from '../../services/car.service';
import { AuthService } from '../../services/auth';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-add-car',
  templateUrl: './add-car.page.html',
  imports: [FormsModule, IonicModule]
})
export class AddCarPage {

  car = {
    marque: '',
    modele: '',
    immatriculation: '',
    annee: 2024,
    proprietaire: ''
  };

  private carService = inject(CarService);
  private authService = inject(AuthService);
  private navCtrl = inject(NavController);

  async save() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.car.proprietaire = user.uid;
      await this.carService.addCar(this.car);
      this.navCtrl.back();
    } else {
      console.error('User not logged in');
    }
  }
}
