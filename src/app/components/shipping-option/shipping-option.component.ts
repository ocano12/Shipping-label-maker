import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { StepsService } from "../../services/steps.service";
import { ShippingInfoService } from "../../services/shipping-info.service";

enum ShippingOption {
  Ground = 1,
  Priority = 2
}

@Component({
  selector: "app-shipping-option",
  templateUrl: "./shipping-option.component.html",
  styleUrls: ["./shipping-option.component.scss"]
})
export class ShippingOptionComponent {
  form: FormGroup;
  shippingOptions = [];
  shippingRate = 0.4;
  shippingCost = 0;
  default: "Select";

  constructor(
    private formBuilder: FormBuilder,
    private stepService: StepsService,
    private shippingService: ShippingInfoService
  ) {
    this.form = this.formBuilder.group({
      shippingOptions: ["select"] //known bug I was not able to get a default value selected using the form builder
    });

    this.shippingOptions = this.getShippingOption();
    this.form.controls["shippingOptions"].setValue(this.default, { onlySelf: true });
    // this.form.controls.shippingOptions.patchValue(this.shippingOptions[0].id);
  }

  ngOnInit() {
    this.stepService.setTitle("Shipping Option");
    this.getValues();
    //subsribes to see if the form should submit or not
    this.stepService.submitForm.subscribe(value => {
      if (value === true) {
        this.onSubmit();
      }
    });
  }

  //calculate the shipping cost depending on the value selected
  calculateShippingCost(value) {
    let weightInfo = this.shippingService.getWeight();
    if (value == 1) {
      var permium = 1;
    } else {
      permium = 1.5;
    }
    this.shippingCost = weightInfo.weight * this.shippingRate * permium;
  }

  getShippingOption() {
    let options = this.convertEnumToArray();
    return options;
  }

  //converted the Shipping Option Enum into an array to manipulate and access easier
  convertEnumToArray() {
    let map: { id: number; name: string }[] = [];

    for (var n in ShippingOption) {
      if (typeof ShippingOption[n] === "number") {
        map.push({ id: <any>ShippingOption[n], name: n });
      }
    }
    return map;
  }

  getValues() {
    let shippingOptionInfo = this.shippingService.getShippingOption();
    console.log(shippingOptionInfo);

    for (let key in shippingOptionInfo) {
      this.form.patchValue({
        [key]: shippingOptionInfo[key]
      });
    }
  }

  onSubmit() {
    this.shippingService.setShippingOption(this.form.value);
  }
}
