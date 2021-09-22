import { Quad } from "rdf-js";
import IInterpreter from "./IInterpreter";

export default abstract class AInterpreter implements IInterpreter {
  firstTime: Boolean;

  constructor() {
    this.firstTime = true;
  }
  createLDES(triples: Quad[]): void {
    throw new Error("Method not implemented.");
  }
  getShacl(triples: Quad[]): void {
    throw new Error("Method not implemented.");
  }
  interpret(data: any, triples: Quad[]): void {
    throw new Error("Method not implemented.");
  }
  createHyperMedia(relations: any, triples: Quad[]): void {
    throw new Error("Method not implemented.");
  }

}