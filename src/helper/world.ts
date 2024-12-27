import { ScenarioContext } from "./scenarioContext";
declare module "@cucumber/cucumber" {
    interface World {
        scenarioContext: ScenarioContext;
    }
}