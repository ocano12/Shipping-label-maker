import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { componentNeedsResolution } from "@angular/core/src/metadata/resource_loading";

@Injectable({
  providedIn: "root"
})
export class ShippingInfoService {
  //initial state of the shippingInfo object
  initialState = {
    to: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    from: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipCode: ""
    },
    weight: "",
    shippingOption: ""
  };

  public _shippingInfo = new BehaviorSubject<any>(this.initialState);
  constructor() {}

  //Most of these are just getters and setters in order to grab and manipulate the shippingInfo object throughout the app

  //in charge of getting the reciver information from the form
  getRecieverAddress() {
    return this._shippingInfo.value["to"];
  }

  //setting reciver information
  setRecieverAddress(shippingInfoReciever) {
    this._shippingInfo.next({
      ...this._shippingInfo.value,
      to: shippingInfoReciever
    });
  }

  getSenderAddress() {
    return this._shippingInfo.value["from"];
  }

  setSenderAddress(shippingInfoSender) {
    this._shippingInfo.next({
      ...this._shippingInfo.value,
      from: shippingInfoSender
    });
  }

  getWeight() {
    return this._shippingInfo.value["weight"];
  }

  setWeight(shippingInfoWeight) {
    this._shippingInfo.next({
      ...this._shippingInfo.value,
      weight: shippingInfoWeight
    });
  }

  getShippingOption() {
    return this._shippingInfo.value["shippingOption"];
  }

  setShippingOption(shippingInfoOptions) {
    this._shippingInfo.next({
      ...this._shippingInfo.value,
      shippingOption: shippingInfoOptions
    });
  }
}
