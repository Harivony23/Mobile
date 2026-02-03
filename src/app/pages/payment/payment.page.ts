import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { RepairService } from '../../services/repair.service';
import { doc, updateDoc, Firestore } from '@angular/fire/firestore';
import { addIcons } from 'ionicons';
import { cardOutline } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
  imports: [CommonModule, IonicModule]
})
export class PaymentPage implements OnInit {
  repairId: string | null = null;
  
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private toastCtrl = inject(ToastController);
  private navCtrl = inject(NavController);

  constructor() {
    addIcons({ cardOutline });
  }

  ngOnInit() {
    this.repairId = this.route.snapshot.paramMap.get('id');
  }

  async pay() {
    if (this.repairId) {
      // Mock payment success
      const repairDoc = doc(this.firestore, `repairs/${this.repairId}`);
      await updateDoc(repairDoc, { status: 'paid' });
      
      const toast = await this.toastCtrl.create({
        message: 'Paiement effectué avec succès !',
        duration: 2000
      });
      toast.present();
      this.navCtrl.back();
    }
  }
}
