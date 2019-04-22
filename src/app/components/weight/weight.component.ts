import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { StepsService } from "../../services/steps.service";
import { ShippingInfoService } from "../../services/shipping-info.service";

@Component({
  selector: "app-weight",
  templateUrl: "./weight.component.html",
  styleUrls: ["./weight.component.scss"]
})
export class WeightComponent implements OnInit {
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private stepService: StepsService,
    private shippingService: ShippingInfoService
  ) {}

  weightForm = this.formBuilder.group({
    weight: ["", [Validators.required, Validators.pattern("^[0-9]*$")]]
  });

  ngOnInit() {
    this.stepService.setTitle("Weight");
    this.getFormValues();
    this.stepService.submitForm.subscribe(value => {
      if (value === true) {
        this.onSubmit();
        // should put focus() on input
      }
    });
  }

  getFormValues() {
    let weightInfo = this.shippingService.getWeight();

    for (let key in weightInfo) {
      this.weightForm.patchValue({
        [key]: weightInfo[key]
      });
    }
  }

  get f() {
    return this.weightForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.weightForm.invalid) {
      this.noSubmit();
      return;
    }
    this.shippingService.setWeight(this.weightForm.value);
    this.stepService.setSubmit(true);
  }

  noSubmit() {
    this.stepService.setSubmit(false);
  }
}
