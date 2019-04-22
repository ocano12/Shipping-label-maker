import { Injectable, EventEmitter } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

interface Step {
  steps: number;
}

interface Title {
  title: string;
}

interface Submit {
  submit: boolean;
}

@Injectable({
  providedIn: "root"
})
export class StepsService {
  private intialTitle: Title = { title: "" };
  private _title = new BehaviorSubject<Title>(this.intialTitle);
  private intialSteps: Step = { steps: 0 };
  private _steps = new BehaviorSubject<Step>(this.intialSteps);
  private initalSubmit: Submit = { submit: false };
  private _submit = new BehaviorSubject<Submit>(this.initalSubmit);
  submitForm: EventEmitter<boolean> = new EventEmitter();
  // readonly steps$ = this._steps.asObservable();
  constructor() {}

  getStep(): Observable<Step> {
    return this._steps.asObservable();
  }

  //grabs the new step state
  changeStep(currentStep: number, deltaStep: number): void {
    this._steps.next({ steps: currentStep + deltaStep });
  }

  //get the title of each component to the card header
  getTitle(): Observable<Title> {
    return this._title.asObservable();
  }

  //sets the above getter
  setTitle(title) {
    this._title.next(title);
  }

  //this allows my app to know if the wizard should submit the form or not into the shippinginfo objec
  getSubmit(): Observable<Submit> {
    return this._submit.asObservable();
  }

  //setter for above
  setSubmit(submit) {
    this._submit.next(submit);
  }

  //allows the next button to send a message to the form in order to let the form know it should submit because the wizard is moving on
  submit() {
    this.submitForm.next(true);
  }
}

//move event emitter out of service
