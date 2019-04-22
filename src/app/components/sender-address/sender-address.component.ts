import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { StepsService } from "../../services/steps.service";
import { ShippingInfoService } from "../../services/shipping-info.service";
import { Validators } from "@angular/forms";

@Component({
  selector: "app-sender-address",
  templateUrl: "./sender-address.component.html",
  styleUrls: ["./sender-address.component.scss"]
})
export class SenderAddressComponent implements OnInit {
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private stepService: StepsService,
    private shippingService: ShippingInfoService
  ) {}

  senderForm = this.formBuilder.group({
    name: ["", Validators.required],
    street: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    zipCode: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5)]]
  });

  ngOnInit() {
    this.stepService.setTitle("Sender Information");
    this.getFormValues();
    this.stepService.submitForm.subscribe(value => {
      if (value === true) {
        this.onSubmit();
        // should put focus() on input
      }
    });
  }

  //gets the value of the shippingInfo object. This is used mainly when the user navigates back on the wizard
  getFormValues() {
    let senderInfo = this.shippingService.getSenderAddress();
    for (let key in senderInfo) {
      this.senderForm.patchValue({
        [key]: senderInfo[key]
      });
    }
  }

  //same as reciever component
  get f() {
    return this.senderForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.senderForm.invalid) {
      this.noSubmit();
      return;
    }
    this.shippingService.setSenderAddress(this.senderForm.value);
    this.stepService.setSubmit(true);
  }

  noSubmit() {
    this.stepService.setSubmit(false);
  }
}
