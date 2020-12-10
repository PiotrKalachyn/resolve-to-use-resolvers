import { Subscription } from "rxjs";

export interface PendingSubscription {
  subscription: Subscription;
  description: string;
}
