import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { WizardComponent } from "./components/wizard/wizard.component";
import { AppRoutingModule } from "../app-routing.module";
import { WizardHeaderComponent } from './components/wizard-header/wizard-header.component';

@NgModule({
  declarations: [WizardComponent, WizardHeaderComponent],
  imports: [CommonModule, AppRoutingModule],
  exports: [WizardComponent]
})
export class SharedModule {}
