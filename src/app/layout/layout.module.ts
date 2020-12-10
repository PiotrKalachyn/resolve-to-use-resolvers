import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NotificationsComponent } from "./notifications/notifications.component";
import { SpinnersComponent } from "./spinners/spinners.component";
import { ModalMessageComponent } from "./modal-message/modal-message.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    NotificationsComponent,
    SpinnersComponent,
    ModalMessageComponent
  ],
  exports: [NotificationsComponent, SpinnersComponent, ModalMessageComponent]
})
export class LayoutModule {}
