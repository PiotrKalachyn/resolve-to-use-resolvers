import { Injectable } from "@angular/core";
import { NEVER, Observable, Subject, Subscription } from "rxjs";
import { PendingSubscription } from "./pending-subscription";

@Injectable({ providedIn: "root" })
export class SpinnersService {
  private pendingSubscriptions: PendingSubscription[] = [];
  private pendingSubscriptions$ = new Subject<PendingSubscription[]>();

  constructor() {}

  add(subscription: Subscription, description?: string) {
    if (!subscription.closed) {
      this.pendingSubscriptions.push({
        subscription,
        description
      });
      this.recheck();
    }
  }

  spin(description?: string): Subscription {
    const subscription = NEVER.subscribe();
    this.add(subscription, description);
    return subscription;
  }

  remove(subscription: Subscription) {
    this.pendingSubscriptions = this.pendingSubscriptions.filter(
      ps => ps.subscription !== subscription
    );
    this.recheck();
  }

  getAll(): Observable<PendingSubscription[]> {
    return this.pendingSubscriptions$.asObservable();
  }

  recheck() {
    this.pendingSubscriptions = this.pendingSubscriptions.filter(
      ps => !ps.subscription.closed
    );
    this.broadcast();
  }

  private broadcast() {
    this.pendingSubscriptions$.next(this.pendingSubscriptions);
  }
}
