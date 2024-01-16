import { fileHeaderComment, groupNameComment } from "./commentary";
import { categoryPrefixes, actionsNameDefinition, brandIds, currentExporterVersion, brandNames } from "./payloads";
import { variableName } from "./names";
import { rgbToHsl } from "./values";
import { dateNow, exportedFileName } from "../helpers";
import { getBrandId } from "./brands";


// Functions registration.
Pulsar.registerFunction('variableName', variableName);
Pulsar.registerFunction('fileHeaderComment', fileHeaderComment);
Pulsar.registerFunction('groupNameComment', groupNameComment);
Pulsar.registerFunction('rgbToHsl', rgbToHsl);
Pulsar.registerFunction("dateNow", dateNow);
Pulsar.registerFunction("getBrandId", getBrandId);
Pulsar.registerFunction("exportedFileName", exportedFileName);

// Payloads registration
Pulsar.registerPayload('categoryPrefixes', categoryPrefixes);
Pulsar.registerPayload('actionsNameDefinition', actionsNameDefinition);
Pulsar.registerPayload('brandIds', brandIds);
Pulsar.registerPayload("currentExporterVersion", currentExporterVersion);
Pulsar.registerPayload("brandNames", brandNames);
