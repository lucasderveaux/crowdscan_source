import { Quad } from "rdf-js";
import IInterpreter from "./IInterpreter";
import InterpreterInstance from "./InterpreterInstance";

export default abstract class AInterpreter implements IInterpreter {
  public firstAddition: Boolean;
  public interpreterParent;
  public config: string;
  public route: string;

  constructor(config: string, interpreterParent: InterpreterInstance) {
    this.firstAddition = true;
    this.interpreterParent = interpreterParent;
    this.config = config;
    this.route = 'test';
  }

  public setRoute(route: string) {
    this.route = route;
  }

  abstract createMetadata(data: any[], triples: Quad[]): void;
  abstract getShacl(triples: Quad[]): void;
  abstract interpret(data: any, triples: Quad[]): void;
  abstract createHyperMedia(relations: any, triples: Quad[]): void;

}