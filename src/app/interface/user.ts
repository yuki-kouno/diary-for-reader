export interface User {
  uid: string;
  email: string;
  name?: string;
  createdAt?: Date;
  avatarURL?: string;
  firstTour?: boolean;
  secondTour?: boolean;
  thirdTour?: boolean;
}
