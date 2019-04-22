import { Component, OnInit } from "@angular/core";
import { ShippingInfoService } from "../../services/shipping-info.service";
import { StepsService } from "../../services/steps.service";

@Component({
  selector: "app-confirm",
  templateUrl: "./confirm.component.html",
  styleUrls: ["./confirm.component.scss"]
})
export class ConfirmComponent implements OnInit {
  constructor(private shippingService: ShippingInfoService, private stepService: StepsService) {}
  private summaryArray = [];
  private summaryProps;
  private summary = this.shippingService._shippingInfo.value;

  ngOnInit() {
    //used to grab the keys on the shippingInfo object. This will determine how many card headers I would need dynamically
    this.summaryProps = Object.keys(this.summary);

    for (let prop of this.summaryProps) {
      this.summaryArray.push(this.summary[prop]);
    }
  }
}
