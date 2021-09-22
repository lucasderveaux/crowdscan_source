import { Quad } from "rdf-js";
import AInterpreter from "./AInterpreter";
import IInterpreter from "./IInterpreter"

export default class CatalogInterpreter extends AInterpreter {
  constructor() {
    super();
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