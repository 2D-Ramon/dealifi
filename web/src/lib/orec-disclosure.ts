/** Oklahoma Real Estate Commission Appendix A — RPCD Statement (01-01-2026). */

export type WorkingStatus = "working" | "not_working" | "unknown" | "none" | "";

export const WORKING_ITEMS: {
  id: string;
  label: string;
  extras?: { id: string; label: string }[];
}[] = [
  { id: "sprinkler", label: "Sprinkler System" },
  { id: "pool", label: "Swimming Pool" },
  { id: "spa", label: "Hot Tub/Spa" },
  {
    id: "water_heater",
    label: "Water Heater",
    extras: [
      { id: "electric", label: "Electric" },
      { id: "gas", label: "Gas" },
      { id: "solar", label: "Solar" },
    ],
  },
  { id: "water_purifier", label: "Water Purifier" },
  {
    id: "water_softener",
    label: "Water Softener",
    extras: [
      { id: "leased", label: "Leased" },
      { id: "owned", label: "Owned" },
    ],
  },
  { id: "sump", label: "Sump Pump" },
  { id: "plumbing", label: "Plumbing" },
  { id: "whirlpool", label: "Whirlpool Tub" },
  {
    id: "sewer",
    label: "Sewer System",
    extras: [
      { id: "public", label: "Public" },
      { id: "septic_aerobic", label: "Septic/Aerobic" },
      { id: "septic_lateral", label: "Septic/Lateral Lines" },
      { id: "septic_lagoon", label: "Septic/Lagoon" },
    ],
  },
  {
    id: "ac",
    label: "Air Conditioning System",
    extras: [
      { id: "electric", label: "Electric" },
      { id: "gas", label: "Gas" },
      { id: "heat_pump", label: "Heat Pump" },
    ],
  },
  { id: "window_ac", label: "Window Air Conditioner(s)" },
  { id: "attic_fan", label: "Attic Fan" },
  { id: "fireplaces", label: "Fireplaces" },
  {
    id: "heat",
    label: "Heating System",
    extras: [
      { id: "electric", label: "Electric" },
      { id: "gas", label: "Gas" },
      { id: "heat_pump", label: "Heat Pump" },
    ],
  },
  { id: "humidifier", label: "Humidifier" },
  { id: "ceiling_fans", label: "Ceiling Fans" },
  {
    id: "gas_supply",
    label: "Gas Supply",
    extras: [
      { id: "public", label: "Public" },
      { id: "propane", label: "Propane" },
      { id: "butane", label: "Butane" },
    ],
  },
  {
    id: "propane_tank",
    label: "Propane Tank",
    extras: [
      { id: "leased", label: "Leased" },
      { id: "owned", label: "Owned" },
    ],
  },
  { id: "air_purifier", label: "Electric Air Purifier" },
  { id: "garage_opener", label: "Garage Door Opener" },
  { id: "intercom", label: "Intercom" },
  { id: "central_vac", label: "Central Vacuum" },
  {
    id: "security",
    label: "Security System",
    extras: [
      { id: "leased", label: "Leased" },
      { id: "owned", label: "Owned" },
      { id: "monitored", label: "Monitored" },
      { id: "financed", label: "Financed" },
    ],
  },
  { id: "smoke", label: "Smoke Detectors" },
  { id: "fire_suppression", label: "Fire Suppression System" },
  { id: "dishwasher", label: "Dishwasher" },
  { id: "electrical", label: "Electrical Wiring" },
  { id: "disposal", label: "Garbage Disposal" },
  { id: "gas_grill", label: "Gas Grill" },
  { id: "vent_hood", label: "Vent Hood" },
  { id: "microwave", label: "Microwave Oven" },
  { id: "oven", label: "Built-in Oven/Range" },
  { id: "stove", label: "Kitchen Stove" },
  { id: "compactor", label: "Trash Compactor" },
  { id: "icemaker", label: "Built-In Icemaker" },
  {
    id: "solar",
    label: "Solar Panels",
    extras: [
      { id: "leased", label: "Leased" },
      { id: "owned", label: "Owned" },
      { id: "financed", label: "Financed" },
    ],
  },
  {
    id: "generator",
    label: "Generators",
    extras: [
      { id: "leased", label: "Leased" },
      { id: "owned", label: "Owned" },
      { id: "financed", label: "Financed" },
    ],
  },
  {
    id: "water_source",
    label: "Source of Household Water",
    extras: [
      { id: "public", label: "Public" },
      { id: "well", label: "Well" },
      { id: "rural", label: "Private/Rural District" },
    ],
  },
];

export const DISCLOSURE_QUESTIONS: { id: string; n: string; text: string }[] = [
  { id: "q2", n: "2", text: "Is the property designated as historical or located in a registered historical district or historic preservation overlay district?" },
  { id: "q3", n: "3", text: "Are you aware if the dwelling or improvements are located in a FEMA defined flood zone?" },
  { id: "q3b", n: "3b", text: "Are you aware if the dwelling or improvements are located in a municipal or other government defined flood zone?" },
  { id: "q4", n: "4", text: "Are you aware if the dwelling or improvements are located in or adjacent to a regulated flood control reservoir (dam)?" },
  { id: "q5", n: "5", text: "Are you aware of any flood insurance requirements concerning the property?" },
  { id: "q6", n: "6", text: "Are you aware of any flood insurance on the property?" },
  { id: "q7", n: "7", text: "Are you aware of the property being damaged or affected by flood, storm run-off, sewer backup, draining or grading defects?" },
  { id: "q8", n: "8", text: "Are you aware of any surface or ground water drainage systems which assist in draining the property, e.g. “French Drains?”" },
  { id: "q9", n: "9", text: "Are you aware of any occurrence of water in the heating and air conditioning duct system?" },
  { id: "q10", n: "10", text: "Are you aware of water seepage, leakage or other draining defects in any of the improvements on the property?" },
  { id: "q11", n: "11", text: "Are you aware of any additions being made without required permits?" },
  { id: "q12", n: "12", text: "Are you aware of any previous foundation repairs?" },
  { id: "q13", n: "13", text: "Are you aware of any alterations or repairs having been made to correct defects?" },
  { id: "q14", n: "14", text: "Are you aware of any defect or condition affecting the interior or exterior walls, ceilings, roof structure, slab/foundation, basement/storm cellar, floors, windows, doors, fences or garage?" },
  { id: "q15", n: "15", text: "Are you aware of the roof covering ever being repaired or replaced during your ownership of the property?" },
  { id: "q17", n: "17", text: "Do you know of any current defects with the roof covering?" },
  { id: "q18", n: "18", text: "Are you aware of treatment for termite or wood-destroying organism infestation?" },
  { id: "q19", n: "19", text: "Are you aware of a termite bait system installed on the property?" },
  { id: "q20", n: "20", text: "Are you aware of any damage caused by termites or wood-destroying organisms?" },
  { id: "q21", n: "21", text: "Are you aware of major fire, tornado, hail, earthquake or wind damage?" },
  { id: "q22", n: "22", text: "Have you ever received payment on an insurance claim for damages to residential property and/or any improvements which were not repaired?" },
  { id: "q23", n: "23", text: "Are you aware of defects pertaining to sewer, septic, lateral lines or aerobic system?" },
  { id: "q24", n: "24", text: "Are you aware of the presence of asbestos?" },
  { id: "q25", n: "25", text: "Are you aware of the presence of radon gas?" },
  { id: "q26", n: "26", text: "Have you tested for radon gas?" },
  { id: "q27", n: "27", text: "Are you aware of the presence of lead-based paint?" },
  { id: "q28", n: "28", text: "Have you tested for lead-based paint?" },
  { id: "q29", n: "29", text: "Are you aware of any underground storage tanks on the property?" },
  { id: "q30", n: "30", text: "Are you aware of the presence of a landfill on the property?" },
  { id: "q31", n: "31", text: "Are you aware of the existence of hazardous or regulated materials and other conditions having an environmental impact?" },
  { id: "q32", n: "32", text: "Are you aware of the existence of prior manufacturing of methamphetamine?" },
  { id: "q33", n: "33", text: "Have you had the property inspected for mold?" },
  { id: "q34", n: "34", text: "Are you aware of any remedial treatment for mold on the property?" },
  { id: "q35", n: "35", text: "Are you aware of any condition on the property that would impair the health or safety of the occupants?" },
  { id: "q36", n: "36", text: "Are you aware of any wells located on the property?" },
  { id: "q37", n: "37", text: "Are you aware of any dams located on the property?" },
  { id: "q38", n: "38", text: "Are you aware of features of the property shared in common with the adjoining landowners, such as fences, driveways, and roads whose use or responsibility has an effect on the property?" },
  { id: "q39", n: "39", text: "Other than utility easements serving the property, are you aware of any easements or right-of-ways affecting the property?" },
  { id: "q40", n: "40", text: "Are you aware of encroachments affecting the property?" },
  { id: "q41", n: "41", text: "Are you aware of a mandatory homeowner’s association?" },
  { id: "q42", n: "42", text: "Are you aware of any zoning, building code or setback requirement violations?" },
  { id: "q43", n: "43", text: "Are you aware of any notices from any government or government-sponsored agencies or any other entities affecting the property?" },
  { id: "q44", n: "44", text: "Are you aware of any surface leases, including but not limited to agricultural, commercial or oil and gas?" },
  { id: "q45", n: "45", text: "Are you aware of any filed litigation or lawsuits directly or indirectly affecting the property, including a foreclosure?" },
  { id: "q46", n: "46", text: "Is the property located in a fire district which requires payment?" },
  { id: "q47", n: "47", text: "Is the property located in a private utility district?" },
  { id: "q48", n: "48", text: "Are you aware of other defect(s) affecting the property not disclosed above?" },
  { id: "q49", n: "49", text: "Are you aware of any other fees, leases, liens, dues or financed fixtures or improvements required on the property that you have not disclosed?" },
  { id: "q50", n: "50", text: "Are you aware of any warranties covering the property, its fixtures, or improvements (foundation, roof shingles, etc.)?" },
];

export const ZONING_OPTIONS = [
  "residential",
  "commercial",
  "historical",
  "office",
  "agricultural",
  "industrial",
  "urban conservation",
  "other",
  "unknown",
  "no zoning classification",
] as const;

export const WORKING_STATUSES: { id: WorkingStatus; label: string }[] = [
  { id: "working", label: "Working" },
  { id: "not_working", label: "Not working" },
  { id: "unknown", label: "Do not know if working" },
  { id: "none", label: "None / not included" },
];
