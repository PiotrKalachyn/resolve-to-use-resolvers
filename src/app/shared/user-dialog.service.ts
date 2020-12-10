import { Injectable } from "@angular/core";
import { Observable, Subject, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { PendingSubscription } from "./pending-subscription";

const NOTIFICATION_TIMESPAN = 3000;

@Injectable()
export class UserDialogService {
  private notifications: { message: string }[] = [];
  private notifications$ = new Subject<string[]>();
  private pendingSubscriptions: PendingSubscription[] = [];
  private pendingSubscriptions$ = new Subject<PendingSubscription[]>();

  constructor() {}

  modalAlert(message: any) {
    const alertString =
      typeof message === "string" ? message : JSON.stringify(message);
    alert(alertString);
  }

  getNotifications(): Observable<string[]> {
    return this.notifications$
      .asObservable()
      .pipe(map(strings => strings || []));
  }

  notify(message: string) {
    const newNotification = { message };
    this.notifications.push(newNotification);
    this.broadcastNotifications();
    setTimeout(() => {
      this.notifications = this.notifications.filter(
        item => item !== newNotification
      );
      this.broadcastNotifications();
    }, NOTIFICATION_TIMESPAN);
  }

  addPendingSubscription(subscription: Subscription, description?: string) {
    if (!subscription.closed) {
      this.pendingSubscriptions.push({
        subscription,
        description
      });
      this.recheckPendingSubscriptions();
    }
  }

  getPendingSubscriptions(): Observable<PendingSubscription[]> {
    return this.pendingSubscriptions$.asObservable();
  }

  recheckPendingSubscriptions() {
    this.pendingSubscriptions = this.pendingSubscriptions.filter(
      ps => !ps.subscription.closed
    );
    this.broadcastPendingSubscriptions();
  }

  private broadcastNotifications() {
    this.notifications$.next(this.notifications.map(n => n.message));
  }

  private broadcastPendingSubscriptions() {
    this.pendingSubscriptions$.next(this.pendingSubscriptions);
  }
}
