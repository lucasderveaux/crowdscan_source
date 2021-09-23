import * as RDF from 'rdf-js';

export default interface IInterpreter {
  createMetadata(data: any[], triples: RDF.Quad[]): void;
  getShacl(triples: RDF.Quad[]): void;
  interpret(data: any, triples: RDF.Quad[]): void;
  createHyperMedia(relations: any, triples: RDF.Quad[]): void;
  setRoute(route: string);
}
