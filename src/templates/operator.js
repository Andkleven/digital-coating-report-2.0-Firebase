export default {
  mutation: "OPERATOR",
  query: "GET_OPERATOR_BY_ITEM",
  chapterByStage: true,
  getNewValue: "operator.new.item",
  getOldValue: "items",
  chapters: {
    steelMeasurement: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Steel measurement",
          queryPath: "operator",
          fields: [
            {
              fieldName: "measurementPoint",
              label: "Measurement Point",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        }
      ]
    },
    actualSteelMeasurement: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Actual Steel OD",
          queryPath: "operator.measurementPointActualTdvs",
          repeatGroupWithQuery: "leadEngineer.data.measurementPoint",
          repeatGroupWithQuerySpecData: true,

          fields: [
            {
              fieldName: "measurementPointActual",
              variableLabelSpec: true,
              queryVariableLabel: "leadEngineer.data.targetDescriptionValue",
              label: "Measurement Point Actual Steel {}",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        }
      ]
    },
    steelPreparation1: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Media Blasting",
          queryPath: "operator",
          fields: [
            {
              specValueList: "leadEngineer.data.blastMedia",
              label: "Blast Media"
            },
            {
              fieldName: "relativeHumidity",
              label: "Relative Humidity",
              required: true,
              routeToSpecMax: "leadEngineer.data.relativeHumidity",
              type: "number",
              unit: "%"
            },
            {
              fieldName: "airTemperature",
              label: "Air Temperature",
              routeToSpecMin: "leadEngineer.data.airTemperature",
              unit: "°C",
              type: "number",
              required: true
            },
            {
              fieldName: "steelTemperature",
              label: "Steel Temperature",
              routeToSpecMin: "leadEngineer.data.steelTemperature",
              unit: "°C",
              type: "number",
              required: true
            },
            {
              fieldName: "dewPoint",
              label: "Dew Point",
              routeToSpecMin: "leadEngineer.data.dewPoint",
              unit: "°C",
              type: "number",
              required: true
            },
            {
              fieldName: "temperatureOverDewPoint",
              label: "Temperature over Dew Point",
              routeToSpecMin: "leadEngineer.data.temperatureOverDewPoint",
              unit: "°C",
              type: "number",
              required: true
            },
            {
              fieldName: "equipmentIDMediaBlasting",
              required: true,
              label: "Equipment ID"
            },
            {
              fieldName: "nextCalibrationDateMediaBlasting",
              required: true,
              label: "Next Calibration Date",
              min: "now",
              type: "date"
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "blastMediaBatchNumber",
              required: true,
              label: "Blast Media Batch Number"
            },
            {
              fieldName: "mediaBlastingStarted",
              required: true,
              label: "Media Blasting Started",
              type: "datetime-local"
            },
            {
              fieldName: "steelPreparationPerformed",
              label: "Steel Preparation Performed",
              required: true,
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    steelPreparation2: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Media Blasting Additional Tests",
          queryPath: "operator",
          fields: [
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "inspectionOfSteelSurface",
              showFieldSpecPath: "leadEngineer.data.inspectionOfSteelSurface",
              label: "Inspection of Steel Surface",
              subtext: "ISO 8501-3, Welds to be grade P3",
              required: true,
              type: "checkbox"
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "solubleSaltLevel",
              label: "Soluble Salt Level",
              showFieldSpecPath: "leadEngineer.data.solubleSaltLevel",
              routeToSpecMax: "leadEngineer.data.solubleSaltLevel",
              placeholder: "Result",
              unit: "mg/m²",
              required: true,
              type: "number"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.solubleSaltLevel",
              fieldName: "equipmentIDSolubleSaltLevel",
              required: true,
              prepend: "Equipment ID"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.solubleSaltLevel",
              fieldName: "nextCalibrationDateSolubleSaltLevel",
              prepend: "Next Calibration Date",
              min: "now",
              type: "date",
              required: true
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "surfaceCleanliness",
              label: "Surface Cleanliness",
              showFieldSpecPath: "leadEngineer.data.surfaceCleanliness",
              subtext: "ISO 8501-1, Min. Sa 2,5 (Rust grade A or B)",
              required: true,
              unit: "Sa"
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "surfaceCleanlinessImage",
              placeholder: "Upload Image",
              showFieldSpecPath: "leadEngineer.data.surfaceCleanliness",
              indent: true,
              label: "Surface Cleanliness Image",
              type: "file"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.compressedAirCheck",
              fieldName: "compressedAirCheck",
              label: "Compressed Air Check",
              subtext: "ASTM D 4285, No oil and no water",
              required: true,
              type: "checkbox"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.compressedAirCheck",
              fieldName: "equipmentIdCompressedAirCheck",
              required: true,
              prepend: "Equipment ID"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.compressedAirCheck",
              fieldName: "nextCalibrationDateCompressedAirCheck",
              type: "date",
              prepend: "Next Calibration Date",
              min: "now",
              required: true
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "uvTest",
              showFieldSpecPath: "leadEngineer.data.uvTest",
              label: "UV Test",
              required: true,
              subtext: "No reflecting light",
              type: "checkbox"
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "equipmentIDUvTest",
              showFieldSpecPath: "leadEngineer.data.uvTest",
              required: true,
              prepend: "Equipment ID"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.uvTest",
              fieldName: "nextCalibrationDateUvTest",
              type: "date",
              prepend: "Next Calibration Date",
              min: "now",
              required: true
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "blastMediaConductivity",
              showFieldSpecPath: "leadEngineer.data.blastMediaConductivity",
              label: "Blast Media Conductivity",
              routeToSpecMax: "leadEngineer.data.blastMediaConductivity",
              placeholder: "Result",
              required: true,
              unit: "µS/cm",
              type: "number"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.blastMediaConductivity",
              required: true,
              fieldName: "equipmentIDBlastMediaConductivity",
              prepend: "Equipment ID"
            },
            {
              showField: { coatedItem: true, mould: true },
              showFieldSpecPath: "leadEngineer.data.blastMediaConductivity",
              fieldName: "nextCalibrationDateBlastMediaConductivity",
              type: "date",
              prepend: "Next Calibration Date",
              min: "now",
              required: true
            },
            {
              fieldName: "surfaceProfileRoughness",
              showFieldSpecPath: "leadEngineer.data.surfaceProfileMax",
              required: true,
              placeholder: "Result",
              label: "Surface Profile (Roughness)",
              routeToSpecMin: "leadEngineer.data.surfaceProfileMin",
              routeToSpecMax: "leadEngineer.data.surfaceProfileMax",
              unit: "Rz",
              type: "number"
            },
            {
              showFieldSpecPath: "leadEngineer.data.surfaceProfileMin",
              required: true,
              fieldName: "equipmentIDSurfaceProfileRoughness",
              prepend: "Equipment ID"
            },
            {
              showFieldSpecPath: "leadEngineer.data.surfaceProfileMin",
              fieldName: "nextCalibrationDateSurfaceProfileRoughness",
              type: "date",
              prepend: "Next Calibration Date",
              min: "now",
              required: true
            },
            {
              showField: { coatedItem: true, mould: true },
              fieldName: "dustTest",
              label: "Dust Test",
              required: true,
              prepend: "Max",
              min: 1,
              max: 5,
              placeholder: "Result",
              showFieldSpecPath: "leadEngineer.data.dustTest",
              routeToSpecMax: "leadEngineer.data.dustTest",
              type: "number"
            },
            {
              fieldName: "mediaBlastingTestsFinished",
              required: true,
              label: "Media Blasting Tests Finished",
              type: "datetime-local"
            }
          ]
        },
        {
          repeatGroupWithQuerySpecData: true,
          repeatGroupWithQuery: "leadEngineer.additionalCustomTests",
          queryPath: "operator.additionalCustomTestOperators",
          fields: [
            {
              specValueList: [
                "leadEngineer.additionalCustomTests",
                "data.name"
              ],
              label: "Custom Test Name"
            },
            {
              specValueList: [
                "leadEngineer.additionalCustomTests",
                "data.criteria"
              ],
              label: "Custom Test Criteria"
            },
            {
              fieldName: "test",
              label: "Test",
              required: true
            }
          ]
        }
      ]
    },
    primer1: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Priming 1",
          queryPath: "operator",
          fields: [
            {
              specValueList: "leadEngineer.data.primer1",
              label: "Primer Number"
            },
            {
              fieldName: "batchNumberPriming1",
              required: true,
              label: "Batch Number",
              type: "number"
            },
            {
              fieldName: "startTimePriming1",
              required: true,
              label: "Start Time",
              type: "datetime-local"
            },
            {
              fieldName: "stopTimePriming1",
              required: true,
              label: "Stop Time",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    primer2: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Priming 2",
          queryPath: "operator",
          fields: [
            {
              specValueList: "leadEngineer.data.primer2",
              label: "Primer Number:"
            },
            {
              fieldName: "batchNumberPriming2",
              required: true,
              label: "Batch Number",
              type: "number"
            },
            {
              fieldName: "startTimePriming2",
              required: true,
              label: "Start Time",
              type: "datetime-local",
              routeToMax: "operator.data.startTimePriming1",
              max: { m: 30 }
            },
            {
              fieldName: "stopTimePriming2",
              required: true,
              label: "Stop Time",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    itemRubberCementsBeforeCoating: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Item Rubber Cement Before Coating",
          queryPath: "operator",
          fields: [
            {
              specValueList: "leadEngineer.data.itemRubberCementsBeforeCoating",
              label: "Item Rubber Cement:"
            },
            {
              fieldName: "itemRubberCementsBeforeCoatingMixDate",
              required: true,
              label: "Mix Date",
              type: "date"
            },
            {
              fieldName: "startTimeItemRubberCement",
              required: true,
              label: "Start Time",
              type: "datetime-local"
            },
            {
              fieldName: "stopTimeItemRubberCement",
              required: true,
              label: "Stop Time",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    releaseCementsBeforeCoating: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Release Cements Before Coating",
          queryPath: "operator",
          fields: [
            {
              specValueList: "leadEngineer.data.releaseCementsBeforeCoating",
              label: "Rubber Agent"
            },
            {
              fieldName: "rubberCementsBeforeCoatingMixDate",
              required: true,
              label: "Mix Date",
              type: "date"
            },
            {
              fieldName: "startTimeRubberCement",
              required: true,
              label: "Start Time",
              type: "datetime-local"
            },
            {
              fieldName: "stopTimeRubberCement",
              required: true,
              label: "Stop Time",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    coating: {
      queryPath: "operator",
      pages: [
        {
          pageTitle: "Coating",
          repeatGroupWithQuerySpecData: true,
          repeatGroupWithQuery: "leadEngineer.ringMaterials",
          fields: [
            {
              specValueList: [
                "leadEngineer.ringMaterials",
                "data.ringMaterial"
              ],
              variableLabelSpec: true,
              queryVariableLabel: [
                "leadEngineer.ringMaterials",
                "data.ringType"
              ],
              label: "{} material no"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              fieldName: "ringsAssembled",
              label: "Rings assembled",
              type: "checkbox",
              required: true
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              showField: { dual: true },
              specValueList: "leadEngineer.data.compoundNoPinSide",
              required: true,
              label: "Rubber pin side"
            },
            {
              showField: { dual: true },
              required: true,
              fieldName: "compoundNoPinSideBatchNo",
              label: "Batch no"
            },
            {
              showField: { dual: true },
              fieldName: "compoundNoPinSideMixDate",
              label: "Mix date",
              required: true,
              type: "date"
            },
            {
              showField: { dual: true },
              specValueList: "leadEngineer.data.compoundNoBoxSide",
              required: true,
              label: "Rubber box side"
            },
            {
              showField: { dual: true },
              fieldName: "compoundNoBoxSideBatchNo",
              required: true,
              label: "Batch no"
            },
            {
              showField: { dual: true },
              fieldName: "compoundNoBoxSideMixDate",
              label: "Mix date",
              required: true,
              type: "date"
            },
            {
              showField: { b2P: true },
              specValueList: "leadEngineer.data.compoundNoRubberType",
              required: true,
              label: "Rubber"
            },
            {
              showField: { b2P: true },
              fieldName: "compoundNoRubberTypeBatchNo",
              label: "Batch no"
            },
            {
              showField: { b2P: true },
              fieldName: "compoundNoRubberTypeMixDate",
              label: "Mix date",
              required: true,
              type: "date"
            },
            {
              showField: { slipon2: true, slipon3: true },
              mathSpec: "mathCompoundNoId",
              required: true,
              label: "ID Rubber"
            },
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "compoundNoIdBatchNo",
              required: true,
              label: "Batch no"
            },
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "compoundNoIdMixDate",
              label: "Mix date",
              required: true,
              type: "date"
            },
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "IdRubberThickness",
              label: "ID Rubber thickness",
              notBatch: true,
              unit: "mm",
              required: true,
              type: "number"
            },
            {
              showField: { slipon2: true, slipon3: true },
              specValueList: "leadEngineer.data.compoundNoOd",
              required: true,
              label: "OD Rubber"
            },
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "compoundNoOdBatchNo",
              required: true,
              label: "Batch no"
            },
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "compoundNoOdMixDate",
              label: "Mix date",
              required: true,
              type: "date"
            },
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "OdRubberThickness",
              label: "OD Rubber thickness",
              notBatch: true,
              unit: "mm",
              required: true,
              type: "number"
            },
            {
              showField: { b2P: true },
              fieldName: "builtThickness",
              label: "Built thickness",
              routeToSpecMin: "leadEngineer.data.packerElementOd1Min",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showField: { dual: true },
              fieldName: "builtThicknessPinSide",
              label: "Built thickness pin side",
              routeToSpecMin: "leadEngineer.data.packerElementOd1Min",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showField: { dual: true },
              fieldName: "builtThicknessBoxSide",
              label: "Built thickness box side",
              routeToSpecMin: "leadEngineer.data.packerElementOd1Min",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              fieldName: "appliedCuringTape",
              label: "Applied curing tape",
              type: "checkbox"
            }
          ]
        }
      ]
    },
    coatingStepLayer: {
      specChapter: ["leadEngineer.vulcanizationSteps", "coatingLayers"],
      queryPath: ["operator.vulcanizationOperators", "coatingOperators", ""],
      pages: [
        {
          pageTitle: "Coating Layer",
          customComponent: "CustomCoating",
          noLine: true
        },
        {
          customComponent: {
            coatedItem: "ActualSteelThickness"
          },
          noLine: true
        },
        {
          showPage: {
            coatedItem: true,
            mould: true
          },

          repeatGroupWithQuerySpecData: true,
          repeatGroupWithQuery: "leadEngineer.rubberCements",
          queryPath: "operator.rubberCementOperators",
          fields: [
            {
              specValueList: [
                "",
                "",
                "leadEngineer.rubberCements",
                "data.rubberCement"
              ],
              label: {
                coatedItem: "Rubber Cement",
                mould: "Rubber Agent"
              }
            },
            {
              page: true,
              queryPath: "mixDates",
              repeatStartWith: 1,
              delete: true,
              addButton: "Add Rubber",
              fields: [
                {
                  fieldName: "mixDate",
                  required: true,
                  indexVariableLabel: true,
                  label: "Mix Date {}",
                  type: "date"
                }
              ]
            }
          ]
        },
        {
          showPage: {
            coatedItem: true,
            mould: true
          },
          fields: [
            {
              specValueList: [
                "leadEngineer.vulcanizationSteps",
                "coatingLayers",
                "data.compoundNumber"
              ],
              label: "Compound Number"
            },
            {
              mathSpec: "mathShrinkThickness",
              label: "Actual Rubber Thickness"
            },
            {
              specValueList: [
                "leadEngineer.vulcanizationSteps",
                "coatingLayers",
                "data.appliedThickness"
              ],
              label: "Proposed Rubber Thickness"
            }
          ]
        },
        {
          showPage: {
            coatedItem: true,
            mould: true
          },
          queryPath: [
            "operator.vulcanizationOperators",
            "coatingOperators",
            "layers"
          ],
          repeatStartWith: 1,
          delete: true,
          addButton: "Extra Layer",
          fields: [
            {
              fieldName: "rubberThickness",
              label: "Rubber Thickness",
              type: "Number",
              required: true
            },
            {
              fieldName: "mixDate",
              label: "Mix Date",
              type: "date",
              required: true
            }
          ]
        },
        {
          showPage: {
            coatedItem: true
          },

          repeatGroupWithQuerySpecData: true,
          repeatGroupWithQuery: "leadEngineer.data.measurementPoint",
          queryPath: [
            "operator.vulcanizationOperators",
            "coatingOperators",
            "measurementPointOperators"
          ],
          fields: [
            {
              fieldName: "measurementPoint",
              variableLabelSpec: true,
              queryVariableLabel: [
                "",
                "",
                "leadEngineer.measurementPointActualTdvs",
                "data.referencePoint"
              ],
              label: "Measurement Point Reference: {}",
              mathSubtext: "mathCumulativeThicknessAll",
              subtext: "Target cumulative thickness: {}mm",
              type: "number",
              required: true
            }
          ]
        },
        {
          queryPath: [
            "operator.vulcanizationOperators",
            "coatingOperators",
            ""
          ],
          fields: [
            {
              fieldName: "layerApplied",
              label: "Layer Applied",
              type: "datetime-local",
              required: true
            }
          ]
        }
      ]
    },
    vulcanizationStep: {
      pages: [
        {
          pageTitle: "Vulcanization",
          queryPath: ["operator.vulcanizationOperators", ""],
          fields: [
            {
              specValueList: [
                "leadEngineer.vulcanizationSteps",
                "data.vulcanizationOption"
              ],
              label: "Vulcanization Type"
            },
            {
              showField: { coatedItem: true, mould: true },
              specValueList: [
                "leadEngineer.vulcanizationSteps",
                "data.programNumber"
              ],
              label: "Program Number"
            },
            {
              showField: {
                b2P: true,
                dual: true,
                slipon2: true,
                slipon3: true
              },
              mathSpec: "mathProgramNumber",
              label: "Program Number"
            },
            {
              fieldName: "autoclaveNumber",
              required: true,
              label: "Autoclave Number",
              ignoreRequired: true,
              type: "number"
            },
            {
              fieldName: "startTime",
              required: true,
              label: "Start Time",
              type: "datetime-local"
            },
            {
              routeToMin: ["operator.vulcanizationOperators", "data.startTime"],
              fieldName: "stopTime",
              required: true,
              label: "Stop Time",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    measurementPointStep: {
      pages: [
        {
          pageTitle: "Measurement after Vulcanization",

          repeatGroupWithQuerySpecData: true,
          repeatGroupWithQuery: "leadEngineer.data.measurementPoint",
          queryPath: [
            "operator.vulcanizationOperators",
            "measurementPointOperators"
          ],
          fields: [
            {
              fieldName: "measurementPoint",
              variableLabelSpec: true,
              queryVariableLabel: {
                coatedItem: [
                  "",
                  "leadEngineer.measurementPointActualTdvs",
                  "data.referencePoint"
                ]
              },
              label: {
                coatedItem: "Measurement Point Reference: {}",
                mould: "Measurement Point"
              },
              calculateMin: "mathMeasurementPointMin",
              calculateMax: "mathMeasurementPointMax",
              type: "number",
              required: true,
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        }
      ]
    },
    grindingStep: {
      pages: [
        {
          pageTitle: "Grinding between Vulcanization",
          queryPath: ["operator.grindings", ""],
          fields: [
            {
              fieldName: "elementLengthAfterGrinding ",
              required: true,
              label: "Element length after grinding",
              unit: "mm",
              type: "number"
            },
            {
              fieldName: "elementCenterDiameter",
              required: true,
              label: "Element center diameter",
              type: "number"
            },
            {
              fieldName: "pinDiameter",
              required: true,
              label: "Pin diameter"
            },
            {
              fieldName: "boxDiameter",
              required: true,
              label: "Box diameter"
            },
            {
              fieldName: "equipmentIdGrinding",
              required: true,
              label: "Equipment ID"
            },
            {
              showField: { slipon3: true, slipon2: true, b2P: true },
              fieldName: "coreSample",
              label: "Core Sample",
              mathSubtext: "mathCoreSampleCode",
              type: "checkbox"
            },
            {
              showField: { dual: true },
              fieldName: "coreSamplePinSide",
              label: "Core sample pin side",
              mathSubtext: "mathCoreSampleCode",
              type: "checkbox"
            },
            {
              showField: { dual: true },
              fieldName: "coreSampleBoxSide",
              label: "Core sample box side",
              mathSubtext: "mathCoreSampleCode",
              type: "checkbox"
            }
          ]
        }
      ]
    },
    ultrasound: {
      pages: [
        {
          pageTitle: "Ultrasound",
          queryPath: "operator",
          fields: [
            {
              fieldName: "ultraSoundGrinding",
              label: "Ultra sound grinding",
              type: "select",
              required: true,
              options: ["Before", "After"]
            },
            {
              fieldName: "probe",
              required: true,
              label: "Probe"
            },
            {
              fieldName: "equipmentName",
              required: true,
              label: "Equipment name"
            },
            {
              fieldName: "ultrasoundEquipmentId",
              required: true,
              label: "Equipment ID"
            },
            {
              fieldName: "dueCalibrationDate",
              required: true,
              label: "Due calibration  date",
              type: "date"
            },
            {
              fieldName: "testInformationResult",
              required: true,
              label: "Test information/result"
            },
            {
              fieldName: "deviation",
              label: "Deviation",
              type: "checkbox"
            },
            {
              writeOnlyFieldIf: "operator.data.deviation",
              viewPdf: true
            }
          ]
        },
        {
          delete: true,
          writeOnlyFieldIf: "operator.data.deviation",
          repeatStartWith: 1,
          addButton: "Deviation",
          queryPath: "operator.deviations",
          fields: [
            {
              fieldName: "deviation",
              required: true,
              label: "Deviation"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              writeOnlyFieldIf: "operator.data.deviation",
              fieldName: "length",
              required: true,
              label: "Length",
              type: "number",
              unit: "mm"
            },
            {
              writeOnlyFieldIf: "operator.data.deviation",
              fieldName: "depth",
              required: true,
              label: "Depth"
            },
            {
              writeOnlyFieldIf: "operator.data.deviation",
              fieldName: "size",
              required: true,
              label: "Size"
            },
            {
              fieldName: "approved",
              required: true,
              label: "Approved",
              type: "checkbox"
            },
            {
              fieldName: "inspectorsCertificateNo",
              required: true,
              label: "Inspectors certificate no."
            },
            {
              fieldName: "inspectorsCertificateDueDate",
              required: true,
              label: "Inspectors certificate due date",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    ultrasoundPinSide: {
      pages: [
        {
          pageTitle: "Ultrasound Pin Side",
          queryPath: "operator",
          fields: [
            {
              fieldName: "ultraSoundBeforeGrindingPinSide",
              required: true,
              label: "Ultra sound before grinding",
              type: "checkbox"
            },
            {
              fieldName: "ultraSoundAfterGrindingPinSide",
              required: true,
              label: "Ultra sound after grinding",
              type: "checkbox"
            },
            {
              fieldName: "probePinSide",
              required: true,
              label: "Probe"
            },
            {
              fieldName: "equipmentNamePinSide",
              required: true,
              label: "Equipment name"
            },
            {
              fieldName: "ultrasoundEquipmentIdPinSide",
              required: true,
              label: "Equipment ID"
            },
            {
              fieldName: "dueCalibrationDatePinSide",
              required: true,
              label: "Due calibration  date",
              type: "datetime-local"
            },
            {
              fieldName: "testInformationResultPinSide",
              required: true,
              label: "Test information/result"
            },
            {
              fieldName: "deviationPinSide",
              label: "Deviation",
              type: "checkbox"
            }
          ]
        },
        {
          delete: true,
          repeatStartWith: 1,
          writeOnlyFieldIf: "operator.data.deviationPinSide",
          addButton: "Deviation",
          queryPath: "operator.deviations",
          fields: [
            {
              fieldName: "deviationPinSide",
              required: true,
              label: "Deviation"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              writeOnlyFieldIf: "operator.data.deviationPinSide",
              fieldName: "lengthPinSide",
              required: true,
              label: "Length",
              type: "number",
              unit: "mm"
            },
            {
              writeOnlyFieldIf: "operator.data.deviationPinSide",
              fieldName: "depthPinSide",
              required: true,
              label: "Depth"
            },
            {
              writeOnlyFieldIf: "operator.data.deviationPinSide",
              fieldName: "sizePinSide",
              required: true,
              label: "Size"
            },
            {
              fieldName: "approvedPinSide",
              required: true,
              label: "Approved",
              type: "checkbox"
            },
            {
              fieldName: "inspectorsCertificateNoPinSide",
              required: true,
              label: "Inspectors certificate no."
            },
            {
              fieldName: "inspectorsCertificateDueDatePinSide",
              required: true,
              label: "Inspectors certificate due date",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    ultrasoundBoxSide: {
      pages: [
        {
          pageTitle: "Ultrasound Box Side",
          queryPath: "operator",
          fields: [
            {
              fieldName: "ultraSoundBeforeGrindingBoxSide",
              required: true,
              label: "Ultra sound before grinding",
              type: "checkbox"
            },
            {
              fieldName: "ultraSoundAfterGrindingBoxSide",
              required: true,
              label: "Ultra sound after grinding",
              type: "checkbox"
            },
            {
              fieldName: "probeBoxSide",
              required: true,
              label: "Probe"
            },
            {
              fieldName: "equipmentNameBoxSide",
              required: true,
              label: "Equipment name"
            },
            {
              fieldName: "ultrasoundEquipmentIdBoxSide",
              required: true,
              label: "Equipment ID"
            },
            {
              fieldName: "dueCalibrationDateBoxSide",
              required: true,
              label: "Due calibration  date",
              type: "datetime-local"
            },
            {
              fieldName: "testInformationResultBoxSide",
              required: true,
              label: "Test information/result"
            },
            {
              fieldName: "deviationBoxSide",
              label: "Deviation",
              type: "checkbox"
            }
          ]
        },
        {
          delete: true,
          repeatStartWith: 1,
          writeOnlyFieldIf: "operator.data.deviationBoxSide",
          addButton: "Deviation",
          queryPath: "operator.deviations",
          fields: [
            {
              fieldName: "deviationBoxSide",
              required: true,
              label: "Deviation"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              writeOnlyFieldIf: "operator.data.deviationBoxSide",
              fieldName: "lengthBoxSide",
              required: true,
              label: "Length",
              type: "number",
              unit: "mm"
            },
            {
              writeOnlyFieldIf: "operator.data.deviationBoxSide",
              fieldName: "depthBoxSide",
              required: true,
              label: "Depth"
            },
            {
              writeOnlyFieldIf: "operator.data.deviationBoxSide",
              fieldName: "sizeBoxSide",
              required: true,
              label: "Size"
            },
            {
              fieldName: "approvedBoxSide",
              required: true,
              label: "Approved",
              type: "checkbox"
            },
            {
              fieldName: "inspectorsCertificateNoBoxSide",
              required: true,
              label: "Inspectors certificate no."
            },
            {
              fieldName: "inspectorsCertificateDueDateBoxSide",
              required: true,
              label: "Inspectors certificate due date",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    grinding: {
      pages: [
        {
          pageTitle: "Grinding",
          queryPath: "operator",
          fields: [
            {
              fieldName: "elementLengthAfterGrinding ",
              required: true,
              label: "Element length after grinding",
              type: "number",
              unit: "mm"
            },
            {
              fieldName: "elementCenterDiameter",
              required: true,
              label: "Element center diameter",
              type: "number",
              unit: "mm"
            },
            {
              fieldName: "pinDiameter",
              required: true,
              label: "Pin diameter",
              type: "number",
              unit: "mm"
            },
            {
              fieldName: "boxDiameter",
              required: true,
              label: "Box diameter",
              type: "number",
              unit: "mm"
            },
            {
              fieldName: "equipmentIdGrinding",
              required: true,
              label: "Equipment ID"
            },
            {
              showField: { slipon3: true, slipon2: true, b2P: true },
              fieldName: "coreSample",
              label: "Core Sample",
              mathSubtext: "mathCoreSampleCode",
              type: "checkbox"
            },
            {
              showField: { dual: true },
              fieldName: "coreSamplePinSide",
              label: "Core sample pin side",
              mathSubtext: "mathCoreSampleCode",
              type: "checkbox"
            },
            {
              showField: { dual: true },
              fieldName: "coreSampleBoxSide",
              label: "Core sample box side",
              mathSubtext: "mathCoreSampleCode",
              type: "checkbox"
            }
          ]
        }
      ]
    },
    ringAssembly: {
      showChapter: { b2P: true, dual: true },
      pages: [
        {
          pageTitle: "Ring Assembly",
          queryPath: "operator",
          fields: [
            {
              label: "Screw description",
              mathSpec: "mathScrewDescription"
            },
            {
              fieldName: "equipmentIdTorqueWrench",
              required: true,
              label: "Equipment ID(Torque wrench)"
            },
            {
              fieldName: "calibrationDateTorqueWrench",
              required: true,
              label: "Next Calibration date",
              type: "date"
            },
            {
              mathSpec: "mathTorque",
              label: "Torque",
              unit: "Nm"
            },
            {
              showFieldSpecPath: "leadEngineer.data.K2",
              fieldName: "controlOfK2RingFlaps",
              label: "Control of K2 ring flaps",
              type: "checkbox"
            },
            {
              fieldName: "endRingInstallation",
              required: true,
              label: "End ring installation",
              type: "checkbox"
            }
          ]
        }
      ]
    },
    barrier: {
      pages: [
        {
          pageTitle: "Barrier",
          queryPath: "operator",
          fields: [
            {
              fieldName: "startTimeBarrier",
              label: "Start time",
              type: "datetime-local"
            },
            {
              specValueList: "leadEngineer.data.barrier",
              label: "Barrier type",
              showFieldSpecPath: "leadEngineer.data.barrier"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              mathSpec: "mathIncreasedOdForWholeElement0",
              label: "Tolerance element"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              mathSpec: "mathIncreasedOdForWholeElementTotal0",
              label: "Target thickness element"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              mathSpec: "mathIncreasedOdForEnds0",
              label: "Tolerance ends"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              mathSpec: "mathIncreasedOdForEndsTotal0",
              label: "Target thickness ends"
            },
            {
              specValueList: "leadEngineer.data.barrierBoxSide",
              label: "Barrier box side type",
              showFieldSpecPath: "leadEngineer.data.barrierBoxSide"
            },
            {
              fieldName: "equipmentIdBarrier",
              label: "Equipment ID"
            },
            {
              fieldName: "nextCalibrationDateBarrier",
              label: "Next calibration date",
              type: "date"
            },
            {
              showField: { b2P: true },
              labelOnly: true,
              label: "Before applied"
            },
            {
              showField: { b2P: true },
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointBoxBeforeAppliedBarrier",
              label: "Measurement point box before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showField: { b2P: true },
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointPinBeforeAppliedBarrier",
              label: "Measurement point pin before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          showPage: { b2P: true },
          queryPath: "operator.measurementPointBeforeBarriers",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          repeatGroupWithQuerySpecData: true,
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              fieldName: "measurementPointBeforeAppliedBarrier",
              label: "Measurement point {} before applied barrier",
              indexVariableLabel: true,
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              indexVariableLabel: true,
              label: "Target measurement {}",
              unit: "mm",
              decimal: 2,
              math: "mathTargetMeasurement0"
            }
          ]
        },
        {
          showPage: { b2P: true },
          queryPath: "operator.measurementPointAfterBarriers",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          showPageSpecPath: {
            "leadEngineer.data.barrier": [
              "1A",
              "2A",
              "3A",
              "4A",
              "5A",
              "6A",
              "7A",
              "8A",
              "1B",
              "2B",
              "3B",
              "4B",
              "5B",
              "6B",
              "7B",
              "8B",
              "1C",
              "2C",
              "3C",
              "4C",
              "5C",
              "6C",
              "7C",
              "8C"
            ]
          },
          fields: [
            {
              indexVariableLabel: true,
              fieldName: "endMeasurement",
              label: "End measurement {}",
              calculateMin: "mathBarrier1Min",
              calculateMax: "mathBarrier1Max",
              required: true,
              type: "number",
              unit: "mm"
            }
          ]
        },
        {
          showPage: { slipon2: true, slipon3: true },
          queryPath: "operator.measurementPointBeforeBarriers",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          repeatGroupWithQuerySpecData: true,
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              fieldName: "measurementPointBeforeAppliedBarrier",
              label: "Measurement point {} before applied barrier",
              indexVariableLabel: true,
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          showPage: { b2P: true },
          fields: [
            {
              labelOnly: true,
              label: "After applied"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointBoxAfterAppliedBarrier",
              label: "Measurement point box after applied barrier",
              calculateMin: "mathBarrierBoxSideMin",
              calculateMax: "mathBarrierBoxSideMax",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointPinAfterAppliedBarrier",
              label: "Measurement point pin after applied barrier",
              calculateMin: "mathBarrierPinSideMin",
              calculateMax: "mathBarrierPinSideMax",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          showPage: { slipon2: true, slipon3: true },
          queryPath: "operator.measurementPointAfterBarriers",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          repeatGroupWithQuerySpecData: true,
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              fieldName: "measurementAfterAppliedBarrier",
              label: "Measurement point {} after applied barrier",
              indexVariableLabel: true,
              required: true,
              calculateMin: "mathBarrier1Min",
              calculateMax: "mathBarrier1Max",
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 2
            }
          ]
        },
        {
          showPage: { slipon2: true, slipon3: true },
          queryPath: "operator",
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              fieldName: "measurementOfEndsBeforeAppliedBarrier",
              label: "Measurement of ends before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": ["0A", "0B", "0C"]
              },
              fieldName: "measurementOfEndsAfterAppliedBarrier",
              label: "Measurement of ends after applied barrier",
              calculateMin: "mathBarrier0Min",
              calculateMax: "mathBarrier0Max",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          queryPath: "operator",
          showPage: { b2P: true },
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrier": [
                  "0B",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B"
                ]
              },
              fieldName: "performedAfterVulcanizationOfBBarrier",
              label: "Performed after vulcanization of B-barrier",
              type: "checkbox"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              fieldName: "barrierFinished",
              label: "Barrier finished",
              required: true,
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    barrierPinSide: {
      pages: [
        {
          pageTitle: "Barrier Pin side",
          queryPath: "operator",
          fields: [
            {
              fieldName: "startTimeBarrierPinSide",
              label: "Start time",
              type: "datetime-local"
            },
            {
              specValueList: "leadEngineer.data.barrierPinSide",
              label: "barrier pin side type",
              showFieldSpecPath: "leadEngineer.data.barrierPinSide"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              mathSpec: "mathIncreasedOdForWholeElement1",
              label: "Tolerance element pin side"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              mathSpec: "mathIncreasedOdForWholeElementTotal1",
              label: "Target thickness element pin side"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              mathSpec: "mathIncreasedOdForEnds1",
              label: "Tolerance ends pin side"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              mathSpec: "mathIncreasedOdForEndsTotal1",
              label: "Target thickness ends pin side"
            },
            {
              fieldName: "equipmentIdBarrierPinSide",
              label: "Equipment ID"
            },
            {
              fieldName: "nextCalibrationDateBarrierPinSide",
              label: "Next calibration date",
              type: "date"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              labelOnly: true,
              label: "Before applied"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointBoxBeforeAppliedBarrierPinSide",
              label: "Measurement point box before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointPinBeforeAppliedBarrierPinSide",
              label: "Measurement point pin before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          queryPath: "operator.measurementPointBeforeBarrierPinSides",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          repeatGroupWithQuerySpecData: true,
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              fieldName: "measurementPointBeforeAppliedBarrierPinSide",
              label: "Measurement point {} before applied barrier",
              indexVariableLabel: true,
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              indexVariableLabel: true,
              label: "Target measurement {}",
              math: "mathTargetMeasurementPinSide",
              decimal: 2
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              labelOnly: true,
              label: "After applied"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointBoxAfterBarrierPinSide",
              label: "Measurement point box after applied barrier",
              required: true,
              calculateMin: "mathBarrierBoxSidePinSideMin",
              calculateMax: "mathBarrierBoxSidePinSideMax",
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointPinAfterBarrierPinSide",
              label: "Measurement point pin after applied barrier",
              calculateMin: "mathBarrierPinSidePinSideMin",
              calculateMax: "mathBarrierPinSidePinSideMax",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          queryPath: "operator.measurementPointAfterBarrierPinSides",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          showPageSpecPath: {
            "leadEngineer.data.barrierPinSide": [
              "1A",
              "2A",
              "3A",
              "4A",
              "5A",
              "6A",
              "7A",
              "8A",
              "1B",
              "2B",
              "3B",
              "4B",
              "5B",
              "6B",
              "7B",
              "8B",
              "1C",
              "2C",
              "3C",
              "4C",
              "5C",
              "6C",
              "7C",
              "8C"
            ]
          },
          fields: [
            {
              indexVariableLabel: true,
              fieldName: "endMeasurementPinSide",
              label: "End measurement {}",
              calculateMin: "mathBarrier1BoxSideMin",
              calculateMax: "mathBarrier1BoxSideMax",
              required: true,
              type: "number"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierPinSide": [
                  "0B",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B"
                ]
              },
              fieldName: "performedAfterVulcanizationOfBBarrierPinSide",
              label: "Performed after vulcanization of B-barrier",
              required: true,
              type: "checkbox"
            },
            {
              fieldName: "barrierFinishedPinSide",
              label: "Barrier finished",
              required: true,
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    barrierBoxSide: {
      pages: [
        {
          pageTitle: "Barrier Box side",
          queryPath: "operator",
          fields: [
            {
              fieldName: "startTimeBarrierBoxSide",
              label: "Start time",
              type: "datetime-local"
            },
            {
              specValueList: "leadEngineer.data.barrierBoxSide",
              label: "Barrier box side type",
              showFieldSpecPath: "leadEngineer.data.barrierBoxSide"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              mathSpec: "mathIncreasedOdForWholeElement2",
              label: "Tolerance element box side"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              mathSpec: "mathIncreasedOdForWholeElementTotal2",
              label: "Target thickness element box side"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              mathSpec: "mathIncreasedOdForEnds2",
              label: "Tolerance ends box side"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              mathSpec: "mathIncreasedOdForEndsTotal2",
              label: "Target thickness ends box side"
            },
            {
              fieldName: "equipmentIdBarrierBoxSide",
              label: "Equipment ID"
            },
            {
              fieldName: "nextCalibrationDateBarrierBoxSide",
              label: "Next calibration date",
              type: "date"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              labelOnly: true,
              label: "Before applied"
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointBoxBeforeAppliedBarrierBoxSide",
              label: "Measurement point box before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointPinBeforeAppliedBarrierBoxSide",
              label: "Measurement point pin before applied barrier",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          queryPath: "operator.measurementPointBeforeBarrierBoxSides",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          repeatGroupWithQuerySpecData: true,
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              fieldName: "measurementPointBeforeAppliedBarrierBoxSide",
              label: "Measurement point {} before applied barrier",
              indexVariableLabel: true,
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": [
                  "1A",
                  "2A",
                  "3A",
                  "4A",
                  "5A",
                  "6A",
                  "7A",
                  "8A",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B",
                  "1C",
                  "2C",
                  "3C",
                  "4C",
                  "5C",
                  "6C",
                  "7C",
                  "8C"
                ]
              },
              indexVariableLabel: true,
              label: "Target measurement {}",
              math: "mathTargetMeasurementBoxSide",
              decimal: 2
            }
          ]
        },
        {
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              labelOnly: true,
              label: "After applied"
            }
          ]
        },
        {
          showPageSpecPath: {
            "leadEngineer.data.barrierBoxSide": [
              "1A",
              "2A",
              "3A",
              "4A",
              "5A",
              "6A",
              "7A",
              "8A",
              "1B",
              "2B",
              "3B",
              "4B",
              "5B",
              "6B",
              "7B",
              "8B",
              "1C",
              "2C",
              "3C",
              "4C",
              "5C",
              "6C",
              "7C",
              "8C"
            ]
          },
          queryPath: "operator.measurementPointAfterBarrierBoxSides",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          fields: [
            {
              indexVariableLabel: true,
              fieldName: "endMeasurementBoxSide",
              label: "End measurement {}",
              calculateMin: "mathBarrierBoxSideBoxSideMin",
              calculateMax: "mathBarrierBoxSideBoxSideMax",
              required: true,
              type: "number"
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointBoxAfterBarrierBoxSide",
              label: "Measurement point box after applied barrier",
              required: true,
              calculateMin: "mathBarrierBoxSideBoxSideMin",
              calculateMax: "mathBarrierBoxSideBoxSideMax",
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            },
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": ["0A", "0B", "0C"]
              },
              fieldName: "measurementPointPinAfterBarrierBoxSide",
              label: "Measurement point pin after applied barrier",
              calculateMin: "mathBarrierPinSideBoxSideMin",
              calculateMax: "mathBarrierPinSideBoxSideMax",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        },
        {
          queryPath: "operator",
          fields: [
            {
              showFieldSpecPath: {
                "leadEngineer.data.barrierBoxSide": [
                  "0B",
                  "1B",
                  "2B",
                  "3B",
                  "4B",
                  "5B",
                  "6B",
                  "7B",
                  "8B"
                ]
              },
              fieldName: "performedAfterVulcanizationOfBBarrierBoxSide",
              label: "Performed after vulcanization of B-barrier",
              required: true,
              type: "checkbox"
            },
            {
              fieldName: "barrierFinishedBoxSide",
              label: "Barrier finished",
              required: true,
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    completionPhase: {
      pages: [
        {
          pageTitle: "Completion phase",
          queryPath: "operator",
          fields: [
            {
              showField: { slipon2: true, slipon3: true },
              fieldName: "drillingHasBeenCompleted",
              label: "Drilling has been completed",
              required: true,
              type: "checkbox"
            },
            {
              showField: { b2P: true, dual: true },
              fieldName: "internalCleaning",
              label: "Internal cleaning",
              type: "checkbox",
              required: true
            },
            {
              showField: { b2P: true, dual: true },
              label: "Cleaning of thread",
              fieldName: "cleaningOfThread",
              type: "checkbox",
              required: true
            },
            {
              specValueList: "leadEngineer.data.idDriftSize",
              label: "Drift size"
            },
            {
              fieldName: "calibrationDate",
              required: true,
              label: "Next Calibration date",
              type: "date"
            },
            {
              fieldName: "equipmentIdCompletionPhase",
              required: true,
              label: "Equipment ID"
            },
            {
              fieldName: "marking",
              required: true,
              label: "Marking",
              type: "checkbox"
            }
          ]
        },
        {
          showPage: { b2P: true, dual: true },
          queryPath: "operator.measurementPointCompletionPhases",
          repeatGroupWithQueryMath: "mathMeasurementPoints",
          repeatGroupWithQuerySpecData: true,
          fields: [
            {
              fieldName: "odMeasurementPoint",
              label: "OD Measurement Point {}",
              indexVariableLabel: true,
              routeToSpecMin: "mathOdMeasurementPointMin",
              routeToSpecMax: "mathOdMeasurementPointMax",
              required: true,
              type: "number",
              notBatch: true,
              unit: "mm",
              decimal: 1
            }
          ]
        }
      ]
    },
    touchUp: {
      pages: [
        {
          pageTitle: "Touch-Up",
          queryPath: "operator",
          fields: [
            {
              fieldName: "touchUp",
              required: true,
              label: "Touch-Up",
              type: "checkbox",
              subtext: "Check if touch-up is performed"
            },
            {
              fieldName: "touchUpPerformed",
              required: true,
              label: "Touch Up Performed",
              type: "datetime-local"
            }
          ]
        }
      ]
    },
    touchUpPacker: {
      pages: [
        {
          pageTitle: "Touch-Up",
          queryPath: "operator",
          fields: [
            {
              showField: {
                b2P: true,
                dual: true
              },
              fieldName: "appliedThreadDop",
              required: true,
              label: "Applied thread dop",
              type: "select",
              options: ["Mercasol", "Kendex orange"]
            },
            {
              showField: {
                b2P: true,
                dual: true
              },
              fieldName: "bioDopStorageOil",
              label: "Bio Dop Storage oil",
              type: "checkbox"
            },
            {
              label: "Packed specification",
              mathSpec: "mathPackingSpecification"
            },
            {
              fieldName: "packedInAccordantToSpec",
              label: "Packed in accordant to spec",
              required: true,
              type: "checkbox"
            },
            {
              showField: {
                slipon2: true,
                slipon3: true
              },
              fieldName: "affixedLabel",
              label: "Affixed label",
              required: true,
              type: "checkbox"
            }
          ]
        }
      ]
    }
  }
};
