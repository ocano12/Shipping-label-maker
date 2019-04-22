import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from "@angular/core";
import { StepsService } from "../../../services/steps.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ShippingInfoService } from "../../../services/shipping-info.service";

@Component({
  selector: "app-wizard",
  templateUrl: "./wizard.component.html",
  styleUrls: ["./wizard.component.scss"]
})
export class WizardComponent implements OnInit {
  @Input() steps;
  @Output() complete = new EventEmitter<object>();

  data: number;
  title: any;
  submitFlag: any;
  getStep: Subscription;

  constructor(
    private stepsService: StepsService,
    private router: Router,
    private shippingService: ShippingInfoService
  ) {}

  ngOnInit() {
    this.stepsService.getTitle().subscribe(title => {
      this.title = title;
    });

    this.stepsService.getStep().subscribe(res => {
      this.data = res.steps;
    });
  }

  next(): void {
    this.stepsService.submit();
    //subscribe to the getSubmit to see if the form can be submitted or if it has errors
    this.stepsService.getSubmit().subscribe(data => {
      this.submitFlag = data;
    });
    //if the flag is true (meaning no errors) then go ahead with the next step logic.
    if (this.submitFlag) {
      this.changeStepLogic(1);
    }
  }

  previous(): void {
    this.changeStepLogic(-1);
  }

  //meat and potatoes of how i manage my step state
  changeStepLogic(delta: number): void {
    this.stepsService.changeStep(this.data, delta);
    this.getStep = this.stepsService.getStep().subscribe(res => {
      this.data = res.steps;
    });
    this.router.navigate([this.steps[this.data]]);
  }

  //confirm
  confirm() {
    let shippingInfo = this.shippingService._shippingInfo;
    this.complete.emit(shippingInfo);
  }
}

//destory all subscribes in router components
