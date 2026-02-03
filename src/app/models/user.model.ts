export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role?: 'user' | 'admin'; // helpful for later
  fcmToken?: string; // for notifications
}
