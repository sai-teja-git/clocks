import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import moment from "moment-timezone"
import { TextFilterPipe } from './pipes/filter.pipe';
import { CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    FormsModule,
    TextFilterPipe,
    DragDropModule
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
    sessionStorage.setItem("theme", value)
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

  clearAllZones() {
    this.savedZones = [];
    this.updateLocalStorage()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.zonesToReorder, event.previousIndex, event.currentIndex);
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
