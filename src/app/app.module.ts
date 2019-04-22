import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SharedModule } from "./shared/shared.module";
import { ShippingLabelMakerComponent } from "./components/shipping-label-maker/shipping-label-maker.component";
import { SenderAddressComponent } from "./components/sender-address/sender-address.component";
import { RecieverAddressComponent } from "./components/reciever-address/reciever-address.component";
import { WeightComponent } from "./components/weight/weight.component";
import { ShippingOptionComponent } from "./components/shipping-option/shipping-option.component";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    ShippingLabelMakerComponent,
    SenderAddressComponent,
    RecieverAddressComponent,
    WeightComponent,
    ShippingOptionComponent,
    ConfirmComponent
  ],
  imports: [BrowserModule, AppRoutingModule, SharedModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

//using templete-driven forms as the forms are simple enough and easier to use ngmodel with.
