import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  collectionData,
  query,
  where,
  orderBy
} from '@angular/fire/firestore';
import { Repair } from '../models/repair.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RepairService {
  private firestore = inject(Firestore);
  private repairsRef = collection(this.firestore, 'repairs');

  // Create a new repair request
  addRepair(repair: Repair) {
    return addDoc(this.repairsRef, repair);
  }

  // Get repairs for a specific user
  getUserRepairs(userId: string): Observable<Repair[]> {
    const q = query(
      this.repairsRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Repair[]>;
  }
}
