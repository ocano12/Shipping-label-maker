import { Component, OnInit, Input, EventEmitter } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { StepsService } from "../../services/steps.service";
import { ShippingInfoService } from "../../services/shipping-info.service";
import { Validators } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
  selector: "app-reciever-address",
  templateUrl: "./reciever-address.component.html",
  styleUrls: ["./reciever-address.component.scss"]
})
export class RecieverAddressComponent implements OnInit {
  submitted = false;
  submitSubscribe: Subscription;
  constructor(
    private formBuilder: FormBuilder,
    private stepService: StepsService,
    private shippingService: ShippingInfoService
  ) {}

  recieverForm = this.formBuilder.group({
    name: ["", Validators.required],
    street: ["", Validators.required],
    city: ["", Validators.required],
    state: ["", Validators.required],
    zipCode: ["", [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(5)]]
  });

  ngOnInit() {
    this.stepService.setTitle("Reciever Information");
    this.getValues();
    this.submitSubscribe = this.stepService.submitForm.subscribe(value => {
      if (value === true) {
        this.onSubmit();
      }
    });
  }

  //quick access to form controls
  get f() {
    return this.recieverForm.controls;
  }

  //gets the value of the shippingInfo object. This is used mainly when the user navigates back on the wizard
  getValues() {
    let recieverInfo = this.shippingService.getRecieverAddress();
    for (let key in recieverInfo) {
      this.recieverForm.patchValue({
        [key]: recieverInfo[key]
      });
    }
  }

  onSubmit() {
    this.submitted = true;
    //stops the wizard from advancing if there is errors in the form
    if (this.recieverForm.invalid) {
      this.noSubmit();
      return;
    }
    //sends reciver data to the service(store).
    this.shippingService.setRecieverAddress(this.recieverForm.value);
    this.stepService.setSubmit(true);
  }

  //if there are errors in the form I send a false value to the submit.
  noSubmit() {
    this.stepService.setSubmit(false);
  }

  ngOnDestory() {
    this.submitSubscribe.unsubscribe();
  }
}
