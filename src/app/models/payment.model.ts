export interface Payment {
  id: string;
  userId: string;
  repairId: string;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  method: string; // e.g., 'credit_card', 'mock'
  createdAt: any; // Timestamp
}
