import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SenderAddressComponent } from "./components/sender-address/sender-address.component";
import { RecieverAddressComponent } from "./components/reciever-address/reciever-address.component";
import { WeightComponent } from "./components/weight/weight.component";
import { ShippingOptionComponent } from "./components/shipping-option/shipping-option.component";
import { ConfirmComponent } from "./components/confirm/confirm.component";

//routes
const routes: Routes = [
  { path: "", component: RecieverAddressComponent },
  { path: "reciever-address", component: RecieverAddressComponent },
  { path: "sender-address", component: SenderAddressComponent },
  { path: "weight", component: WeightComponent },
  { path: "shipping-option", component: ShippingOptionComponent },
  { path: "confirm", component: ConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
