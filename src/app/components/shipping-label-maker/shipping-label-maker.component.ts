import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-shipping-label-maker",
  templateUrl: "./shipping-label-maker.component.html",
  styleUrls: ["./shipping-label-maker.component.scss"]
})
export class ShippingLabelMakerComponent implements OnInit {
  steps = ["reciever-address", "sender-address", "weight", "shipping-option", "confirm"];

  constructor() {}

  ngOnInit() {}
}
