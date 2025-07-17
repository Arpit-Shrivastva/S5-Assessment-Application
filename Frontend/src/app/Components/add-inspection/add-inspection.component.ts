import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { InspectionSheet } from 'src/app/Models/InspectionSheet';
import { InspectionService } from 'src/app/Services/inspection.service';

@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.css']
})
export class AddInspectionComponent {

  auditForm!: FormGroup;
  
  observations: string[] = [
    "Safety equipment like fire-hydrants or extinguishers available",
    "Safety equipment are clean and in usable condition",
    "Safety equipment & Personal Protective Equipment are kept in designated place",
    "Safety equipment are easy to access and no materials are kept hindering their access",
    "They are in working condition & servicing is done as per schedule",
    "Are there any loose wiring or by-pass wiring?",
    "Are there any unsafe / potential injury causing conditions?",
    "First Aid kits are available in accessible area",
    "Required items are available in first aid kit with shelf life",
    "First Aid items checking and replenishment period and responsibility are documented and followed",
    "Old / obsolete / broken dies, tools or fixture in shopfloor",
    "Jigs, tools and fixtures are identified (numbered) & List of items are documented",
    "Jigs, tools and fixtures are colour coded",
    "Tools are arranged at the point of use with clearly identified location and marking",
    "Vacant spots (like shadow boards) are visible to identify whereabouts of the tools and trace them",
    "Spillage of material, oil, water or lubricant inside or near the machine",
    "Air leak / noise observed near the machine",
    "Unused / broken machines or machine parts available in shop floor",
    "Unwanted / waste items near, around or under the machine",
    "Dust / dirt / grease found on the machine surfaces",
    "All the lids and safety guards are available with fasteners intact",
    "All the gauges, scales and meters are clearly visible and clean",
    "All wirings, pipelines are intact",
    "All switches, glands and earthing of the machine are intact",
    "All pipelines are identified and direction of flow marked",
    "Valves and switches are marked for open / close direction",
    "Cleaning schedule and checklist available near the machine",
    "All material handling equipment are identified",
    "All transmission and rotary part of handling equipment are dust and dirt free",
    "Are they appropriately lubricated (no extra grease or oil spread)",
    "Unused / broken down handling equipment found on floor",
    "All handling equipment are provided with designated location",
    "All inventory items are stored in designated places",
    "Min-Max indication available for all inventory items",
    "Storage areas are earmarked with material name and location indications",
    "Visual guidance / pathways are marked to minimise searching of materials",
    "Quarantine areas are marked for non-conforming materials to avoid mix up",
    "Dust, Dirt, oil, waste material found on floor",
    "Unwanted material, unattended material-handling equipment, electrical / mechanical tools found on floor",
    "Cleaning equipment available at designated place",
    "Walls, Ceiling, Gangways, Windows are clean with no damages",
    "All fans, lights and exhaust fans are working correctly",
    "Air curtain and air handling systems are in working condition",
    "Switches and corresponding electrical appliances are marked for identification",
    "Gangways are clear and free of materials, trolleys etc.",
    "Pest/rodent control systems are in place and in working condition"
  ];

  constructor(private fb: FormBuilder, private service: InspectionService) { }

  ngOnInit(): void {
    this.auditForm = this.fb.group({
      zone: [''],
      zoneLeader: [''],
      auditDate: [''],
      auditedBy: [''],
      entries: this.fb.array(this.observations.map(obs =>
        this.fb.group({
          observation: [obs],
          remarks: [''],
          score: [0]
        })
      ))
    });
    
  }

  get entries(): FormArray {
    return this.auditForm.get('entries') as FormArray;
  }

  onSubmit() {
    if (this.auditForm.invalid) return;

    // ⏱️ Step 1: Calculate total score
    const totalScore = this.calculateTotalScore();

    // ⏱️ Step 2: Prepare payload
    const payload: InspectionSheet = {
      ...this.auditForm.value,
      totalScore: totalScore    // ✅ Inject totalScore into object
    };

    // ⏱️ Step 3: Save to server
    this.service.saveInspection(payload).subscribe({
      next: () => {
        alert("Audit saved successfully!");
        this.auditForm.reset();
      },
      error: (err) => {
        console.error("Error saving audit:", err);
      }
    });
  }
  
  getFocusArea(index: number): string {
    if (index < 10) return 'Man (Safety)';
    if (index < 27) return 'Machine (Equipment, Tools, Jigs & Fixtures)';
    if (index < 37) return 'Materials';
    return 'Surroundings';
  }

  calculateTotalScore(): number {
    const entries = this.auditForm.get('entries') as FormArray;
    return entries.controls.reduce((total, ctrl) => {
      const score = Number(ctrl.get('score')?.value || 0);
      return total + score;
    }, 0);
  }

}
