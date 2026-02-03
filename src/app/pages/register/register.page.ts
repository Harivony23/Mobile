import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { UserProfile } from '../../models/user.model';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonicModule, RouterModule, FormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {
  email = '';
  password = '';
  name = '';

  private auth = inject(AuthService); // Use existing service
  private firestore = inject(Firestore);
  private router = inject(Router);

  async register() {
    try {
      const credential = await this.auth.register(this.email, this.password);
      if (credential.user) {
        const userProfile: UserProfile = {
          uid: credential.user.uid,
          email: this.email,
          displayName: this.name,
          role: 'user'
        };
        await setDoc(doc(this.firestore, 'users', credential.user.uid), userProfile);
        this.router.navigateByUrl('/home');
      }
    } catch (e) {
      console.error('Registration failed', e);
    }
  }
}
