import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ModalMessage } from "./modal-message";

@Injectable({ providedIn: "root" })
export class ModalDialogService {
  private modalMessage$ = new Subject<ModalMessage>();

  constructor() {}

  getModalMessage(): Observable<ModalMessage> {
    return this.modalMessage$.asObservable();
  }

  show(message: string, buttonText = "OK") {
    this.modalMessage$.next({ message, buttonText, isError: false });
  }

  showError(error: any, buttonText = "OK") {
    const message = typeof error === "string" ? error : JSON.stringify(error);
    this.modalMessage$.next({ message, buttonText, isError: true });
  }
}
