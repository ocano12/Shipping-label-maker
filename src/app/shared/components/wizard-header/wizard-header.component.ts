import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-wizard-header",
  templateUrl: "./wizard-header.component.html",
  styleUrls: ["./wizard-header.component.scss"]
})
export class WizardHeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
}
