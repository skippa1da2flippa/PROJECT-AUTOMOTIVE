import { Component, OnInit } from '@angular/core';
import {ErrorHandler} from "../../../core/model/errors/error-handler";
import {Router} from "@angular/router";

@Component({
  selector: 'app-vehicle-control-screen',
  templateUrl: './vehicle-control-screen.component.html',
  styleUrls: ['./vehicle-control-screen.component.css']
})
export class VehicleControlScreenComponent extends ErrorHandler implements OnInit {
    public bottomRightButton: boolean = false
    public middleRightButton: boolean = false
    public temperature: number = 20
    public leftLock: boolean = true
    public rightLock: boolean = true
    public leftSeatSwitch: boolean = false
    public rightSeatSwitch: boolean = false


    constructor(public override router: Router) {
      super(router)
    }

    ngOnInit(): void {
    }

    public leftSeatSwitchEvent() {
        this.leftSeatSwitch = !this.leftSeatSwitch
        if (this.leftSeatSwitch) {
            let doc = document.getElementsByClassName("custom_-seat_2022-au")[0]
            doc.setAttribute("class", "custom_-seat_2022-au-lightOn pointer")
        } else {
            let doc = document.getElementsByClassName("custom_-seat_2022-au-1")[0]
            doc.setAttribute("class", "custom_-seat_2022-au pointer")
        }
    }

    public rightSeatSwitchEvent() {
        this.rightSeatSwitch = !this.rightSeatSwitch
        if (this.rightSeatSwitch) {

        } else {

        }
    }

    public bottomRightButtonEvent() {
        this.bottomRightButton = !this.bottomRightButton
    }

    public middleRightButtonEvent() {
        this.middleRightButton = !this.middleRightButton
    }

    public leftLockEvent() {
        this.leftLock = !this.leftLock
        if (this.leftLock) {
            let doc = document.getElementsByClassName("raggruppa-229")[0]
            doc.setAttribute("class", "raggruppa-2900 pointer")
        } else {
            let doc = document.getElementsByClassName("raggruppa-2900")[0]
            doc.setAttribute("class", "raggruppa-229 pointer")
        }
    }

    public rightLockEvent() {
        this.rightLock = !this.rightLock
        if (this.rightLock) {
            let doc = document.getElementsByClassName("raggruppa-231")[0]
            doc.setAttribute("class", "raggruppa-1500 pointer")
        } else {
            let doc = document.getElementsByClassName("raggruppa-1500")[0]
            doc.setAttribute("class", "raggruppa-231 pointer")
        }
    }

    public raiseTemperature() {
        if (this.temperature < 25)
            this.temperature ++
    }

    public lowerTemperature() {
        if (this.temperature > 15)
            this.temperature --
    }

}
