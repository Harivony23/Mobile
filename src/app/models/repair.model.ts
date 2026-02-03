export interface Repair {
  id?: string;

  carId: string;
  userId: string;

  interventionId: string;
  interventionName: string;
  price: number;
  duration_minutes: number;

  status: 'pending' | 'accepted' | 'in_progress' | 'done' | 'cancelled';
  createdAt: Date;
}
