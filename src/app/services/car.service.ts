import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import { Car } from '../models/car.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private carsRef;

  constructor(private firestore: Firestore) {
    this.carsRef = collection(this.firestore, 'cars');
  }

  // 🔹 READ
  getCars(): Observable<Car[]> {
    return collectionData(this.carsRef, { idField: 'id' }) as Observable<Car[]>;
  }

  getCar(id: string): Observable<Car> {
    const carDoc = doc(this.firestore, `cars/${id}`);
    return docData(carDoc, { idField: 'id' }) as Observable<Car>;
  }

  // 🔹 CREATE
  addCar(car: Car) {
    return addDoc(this.carsRef, car);
  }

  // 🔹 UPDATE
  updateCar(id: string, car: Car) {
    const carDoc = doc(this.firestore, `cars/${id}`);
    return updateDoc(carDoc, { ...car });
  }

  // 🔹 DELETE
  deleteCar(id: string) {
    const carDoc = doc(this.firestore, `cars/${id}`);
    return deleteDoc(carDoc);
  }
}
