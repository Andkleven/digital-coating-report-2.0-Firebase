export default {
  all: [
    "start",
    "steelMeasurement",
    "actualSteelMeasurement",
    "steelPreparation1",
    "steelPreparation2",
    "primer1",
    "primer2",
    "releaseCementsBeforeCoating",
    "itemRubberCementsBeforeCoating",
    "coatingStepLayer",
    "coating",
    "vulcanizationStep",
    "measurementPointStep",
    "grindingStep",
    "ultrasound",
    "ultrasoundPinSide",
    "ultrasoundBoxSide",
    "grinding",
    "ringAssembly",
    "barrier",
    "barrierPinSide",
    "barrierBoxSide",
    "completionPhase",
    "touchUp",
    "qualityControlCoatedItem",
    "finalInspectionAsBuilt",
    "touchUpPacker",
    "finalInspectionPacker",
    "done"
  ],
  packer: {
    steelMeasurement: {
      queryPath: "leadEngineer.data.elementLength"
    },
    steelPreparation1: {
      queryPath: "leadEngineer.data.mediaBlasting"
    },
    steelPreparation2: {
      queryPath: "leadEngineer.data.additionalTests"
    },
    primer1: {
      queryPath: "leadEngineer.data.primer1"
    },
    primer2: {
      queryPath: "leadEngineer.data.primer2"
    },
    coating: {
      queryPath: ""
    },
    vulcanizationStep: {
      queryPath: ["leadEngineer.vulcanizationSteps", ""],
      step: true
    },
    grindingStep: {
      queryPath: ["leadEngineer.vulcanizationSteps", ""],
      editIndexList: {
        0: 1
      },
      crossroads: "vulcanizationStep",
      step: true
    },
    ultrasound: {
      queryPath: "leadEngineer.data.ultrasound"
    },
    ultrasoundPinSide: {
      queryPath: "leadEngineer.data.ultrasoundPinSide"
    },
    ultrasoundBoxSide: {
      queryPath: "leadEngineer.data.ultrasoundBoxSide"
    },
    grinding: {
      queryPath: ""
    },
    ringAssembly: {
      queryPath: ""
    },
    barrier: {
      queryPath: "leadEngineer.data.barrier"
    },
    barrierPinSide: {
      queryPath: "leadEngineer.data.barrierPinSide"
    },
    barrierBoxSide: {
      queryPath: "leadEngineer.data.barrierBoxSide"
    },
    completionPhase: {
      queryPath: ""
    },
    finalInspectionAsBuilt: {
      queryPath: ""
    }
  },
  finalInspectionAsBuilt: {
    finalInspectionAsBuilt: {
      queryPath: ""
    },
    touchUpPacker: {
      queryPath: ""
    }
  },
  touchUpPacker: {
    touchUpPacker: {
      queryPath: ""
    },
    finalInspectionPacker: {
      queryPath: ""
    }
  },
  finalInspectionPacker: {
    finalInspectionPacker: {
      touchUpPacker: ""
    },
    done: {
      queryPath: ""
    }
  },
  coating: {
    actualSteelMeasurement: {
      queryPath: "leadEngineer.data.measurementPoint"
    },
    steelPreparation1: {
      queryPath: "leadEngineer.data.mediaBlasting"
    },
    steelPreparation2: {
      queryPath: "leadEngineer.data.additionalTests"
    },
    primer1: {
      queryPath: "leadEngineer.data.primer1"
    },
    primer2: {
      queryPath: "leadEngineer.data.primer2"
    },
    releaseCementsBeforeCoating: {
      queryPath: "leadEngineer.data.releaseCementsBeforeCoating"
    },
    itemRubberCementsBeforeCoating: {
      queryPath: "leadEngineer.data.itemRubberCementsBeforeCoating"
    },
    coatingStepLayer: {
      queryPath: ["leadEngineer.vulcanizationSteps", "coatingLayers", ""],
      step: true,
      layer: true
    },
    vulcanizationStep: {
      queryPath: ["leadEngineer.vulcanizationSteps", ""],
      step: true
    },
    measurementPointStep: {
      queryPath: ["leadEngineer.vulcanizationSteps", ""],
      editIndexList: {
        0: 1
      },
      crossroads: "coatingStepLayer",
      step: true
    },
    touchUp: {
      queryPath: ""
    },
    qualityControlCoatedItem: {
      queryPath: ""
    }
  },
  qualityControlCoatedItem: {
    qualityControlCoatedItem: {
      queryPath: ""
    },
    done: {
      queryPath: ""
    }
  }
};
