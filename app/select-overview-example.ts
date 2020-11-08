import { Component, Inject } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA
} from "@angular/material";

export interface Food {
  value: string;
  viewValue: string;
}

/**
 * @title Basic select
 */
@Component({
  selector: "select-overview-example",
  templateUrl: "select-overview-example.html",
  styleUrls: ["select-overview-example.css"]
})
export class SelectOverviewExample {
  foods: Food[] = [
    { value: "steak-0", viewValue: "Steak" },
    { value: "pizza-1", viewValue: "Pizza" },
    { value: "tacos-2", viewValue: "Tacos" }
  ];

  pvrDetails = [
    {
      pvrId: "PVR0000000007",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000007|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "PVR_InProgress",
      pvrRuleDetails: [
        {
          ruleType: "DA",
          ruleOperation: "EQ",
          ruleValue: "test",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000006",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000006|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "PVR_InProgress",
      pvrRuleDetails: [
        {
          ruleType: "COUNTRY_CODE",
          ruleOperation: "CONTENT",
          ruleValue: "RR",
          joinMethod: "NA"
        },
        {
          ruleType: "DA",
          ruleOperation: "EQ",
          ruleValue: "wer",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000003",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000003|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "PVR_InProgress",
      pvrRuleDetails: [
        {
          ruleType: "DATETIME",
          ruleOperation: "GT",
          ruleValue: "2020-10-29T18:30:00.000Z",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000004",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000004|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "PVR_InProgress",
      pvrRuleDetails: [
        {
          ruleType: "DATETIME",
          ruleOperation: "CONTENT",
          ruleValue: "2020-10-26T18:30:00.000Z",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000005",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000005|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "PVR_InProgress",
      pvrRuleDetails: [
        {
          ruleType: "DA",
          ruleOperation: "EQ",
          ruleValue: "JJ",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000002",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000002|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "Complete",
      pvrRuleDetails: [
        {
          ruleType: "COMMAND",
          ruleOperation: "BEFORE",
          ruleValue: "TEST",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000008",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000008|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "Complete",
      pvrRuleDetails: [
        {
          ruleType: "DA",
          ruleOperation: "GT",
          ruleValue: "12",
          joinMethod: "NA"
        }
      ]
    },
    {
      pvrId: "PVR0000000001",
      pPvPvrId: "P00120|1|PV0000000666|1|PVR0000000001|1",
      ruleVersion: 1,
      ruleDesc: "Freedom Internet 14 GB (1GB/hr)",
      sequence: 1,
      status: "PVR_InProgress",
      pvrRuleDetails: [
        {
          ruleType: "COMMAND",
          ruleOperation: "EQ",
          ruleValue: "test",
          joinMethod: "NA"
        }
      ]
    }
  ];

  ngsspUpdateMessageForm = new FormGroup({
    pvrIdControl: new FormControl("", [Validators.required])
  });
  get pvrIdControl() {
    return this.ngsspUpdateMessageForm.get("pvrIdControl");
  }

  selectedFood = "";
  previousSelectedFood = "";
  selectedFoodInputValue = "";

  selectedPVR = undefined;
  previousSelectedPVR = undefined;
  selectedPVRValue = undefined;

  constructor(private bottomSheet: MatBottomSheet) {}

  loadpPvPvrDetails(pvr) {
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetOverviewExampleSheet,
      {
        data: pvr.value.pvrId
      }
    );
    bottomSheetRef.afterDismissed().subscribe(result => {
      console.log("result pvr", result);
      if (result === true) {
        this.previousSelectedPVR = pvr.value;
        this.selectedPVRValue = pvr.value;
      } else {
        //this.selectedPVR = this.previousSelectedPVR;
        this.pvrIdControl.setValue(this.previousSelectedPVR);
      }
    });
  }

  intercept(food: any) {
    const bottomSheetRef = this.bottomSheet.open(
      BottomSheetOverviewExampleSheet,
      {
        data: food
      }
    );
    bottomSheetRef.afterDismissed().subscribe(result => {
      console.log("result ", result);
      if (result === true) {
        this.previousSelectedFood = food;
        this.selectedFoodInputValue = food;
      } else {
        this.selectedFood = this.previousSelectedFood;
      }
    });
  }
}

@Component({
  selector: "bottom-sheet-overview-example-sheet",
  templateUrl: "bottom-sheet-overview-example-sheet.html"
})
export class BottomSheetOverviewExampleSheet {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewExampleSheet>
  ) {}

  dismiss(event: boolean): void {
    this.bottomSheetRef.dismiss(event);
  }
}

/**  Copyright 2019 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
