import { Component, inject, OnInit, Injector } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Messaging, getToken, onMessage } from '@angular/fire/messaging';
import { runInInjectionContext } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {

  private messaging = inject(Messaging);
  private injector = inject(Injector);

  ngOnInit() {
    runInInjectionContext(this.injector, () => {
      this.initFCM();
    });
  }

  async initFCM() {
    try {
      const token = await getToken(this.messaging, {
        vapidKey: 'BNIRB_4pCxlToZSq8uj0z078Mh4VxLaF-Gzj9WVNtWmzJ9Aj34fQBJaBDl57BzhQk_eJVjUcxsFebyJ68imBHII'
      });

      console.log('✅ FCM TOKEN :', token);

      onMessage(this.messaging, (payload) => {
        console.log('🔔 Message reçu (foreground)', payload);
      });

    } catch (error) {
      console.error('❌ FCM init failed', error);
    }
  }
}
