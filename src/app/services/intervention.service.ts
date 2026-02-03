import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Intervention } from '../models/intervention.model';

@Injectable({
  providedIn: 'root'
})
export class InterventionService {
  private firestore = inject(Firestore);

  getInterventions(): Observable<Intervention[]> {
    const ref = collection(this.firestore, 'interventions');
    return collectionData(ref, { idField: 'id' }) as Observable<Intervention[]>;
  }
}
