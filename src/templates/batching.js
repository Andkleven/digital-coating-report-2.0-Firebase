export default {
  steelPreparation1: {
    geometry: ["Mould", "Coated Item", "Slip on 2", "Slip on 3"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  },
  primer1: {
    geometry: ["Mould", "Coated Item", "Slip on 2", "Slip on 3"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  },
  primer2: {
    geometry: ["Mould", "Coated Item", "Slip on 2", "Slip on 3"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  },
  releaseCementsBeforeCoating: {
    geometry: ["Mould", "Coated Item"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  },
  itemRubberCementsBeforeCoating: {
    geometry: ["Mould", "Coated Item"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  },
  coating: {
    geometry: ["Slip on 2", "Slip on 3"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  },
  vulcanizationStep: {
    geometry: ["Mould", "Coated Item", "Slip on 2", "Slip on 3", "B2P", "Dual"],
    batching: {
      dataPath: ["operator.vulcanizationOperators"],
      removePath: "operator.",
      specRemovePath: "leadEngineer."
    },
    document: {
      queryPath: ["operator.vulcanizationOperators", ""],
      specQueryPath: ["leadEngineer.vulcanizationSteps", ""],
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_VULCANIZATION",
      chapters: ""
    }
  },
  touchUp: {
    geometry: ["Mould", "Coated Item"],
    batching: {
      dataPath: "operator"
    },
    document: {
      queryPath: "operator",
      specQueryPath: "leadEngineer",
      mutation: "OPERATOR_BATCHING",
      query: "BATCHING_OPERATOR",
      chapters: ""
    }
  }
};
