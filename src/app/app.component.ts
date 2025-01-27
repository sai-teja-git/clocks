import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from "moment-timezone"
import { TextFilterPipe } from './pipes/filter.pipe';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    TextFilterPipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  zones = moment.tz.names();
  theme = "light";
  utcTime = moment.utc().format("yyyy-MM-dd HH:mm:ss");
  intervalVariable: any;
  zoneInput = "";
  savedZones: string[] = [];
  zoneToDelete = "";
  zonesToReorder: string[] = [];
  item: any;

  ngOnInit() {
    const sessionTheme = sessionStorage.getItem("theme");
    this.updateTheme(sessionTheme === "dark" ? "dark" : "light");
    this.savedZones = localStorage.getItem("saved_zones") ? JSON.parse(localStorage.getItem("saved_zones") as string) : [];
    this.intervalVariable = setInterval(() => {
      this.utcTime = moment.utc().format("yyyy-MM-dd HH:mm:ss");
    }, 1000)
  }

  ngOnDestroy() {
    try {
      clearInterval(this.intervalVariable)
    } catch { }
  }

  updateTheme(value: string) {
    this.theme = value;
    document.body.setAttribute("data-bs-theme", value)
    document.body.setAttribute("data-app-theme", value)
  }

  addZone(zone: string) {
    console.log('zone', zone)
    this.zoneInput = "";
    if (!this.savedZones.includes(zone)) {
      this.savedZones.push(zone)
      this.updateLocalStorage()
    }
  }

  confirmationToRemoveZone(zone: string) {
    this.zoneToDelete = zone
  }

  removeZone() {
    const index = this.savedZones.indexOf(this.zoneToDelete);
    if (index !== -1) {
      this.savedZones.splice(index, 1)
      this.updateLocalStorage()
    }
  }

  updateLocalStorage() {
    localStorage.setItem("saved_zones", JSON.stringify(this.savedZones))
  }

  openZoneReorder() {
    this.zonesToReorder = localStorage.getItem("saved_zones") ? JSON.parse(localStorage.getItem("saved_zones") as string) : [];
  }

  onDrop(event: any): void {
    console.log('event', event)
    const previousIndex = event.previousIndex;
    const currentIndex = event.currentIndex;

    // const itemToMove = this.zonesToReorder.splice(previousIndex, 1)[0];
    // this.zonesToReorder.splice(currentIndex, 0, itemToMove);
  }

  updateZoneReorder() {
    this.savedZones = this.zonesToReorder;
    this.updateLocalStorage()
    this.zonesToReorder = []
  }

  getTime(zone?: string): moment.Moment {
    if (zone) {
      return moment().tz(zone)
    }
    return moment.utc()
  }

}
