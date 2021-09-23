import { Source } from '@treecg/basic-ldes-server';
import type * as RDF from 'rdf-js';
import { Page } from '../lib/Page';
import * as RdfString from "rdf-string";
import IInterpreter from './Interpreter/IInterpreter';
import SensorInterpreterV1 from './Interpreter/ZoneInterpreterV1';
import { DatabaseFactory } from '../models/DatabaseFactory';
import { crowdscanSource } from './crowdscanSource';
import interpreterInstance from './Interpreter/InterpreterInstance';

export class mySource extends crowdscanSource {

  private config: object;

  private interpreter: IInterpreter;

  constructor(config: object, instance: interpreterInstance) {
    super(config, instance);
    this.instance.appendZone(this);
  }

  setInterpreter(interpreter: IInterpreter) {
    this.interpreter = interpreter;
    this.interpreter.setRoute(this.config['route']);
  }

  async createPages(): Promise<void> {

    let metadata: RDF.Quad[];
    metadata = [];

    this.interpreter.getShacl(metadata);
    this.interpreter.createMetadata([], metadata);
    await this.importPageWithoutIndex(new Page(metadata, []));

  }

  public async appendElement(data: any[]) {
    let latestEntry = await this.getFinalEntry();
    //getPage
    while (latestEntry == null) {
      latestEntry = await this.getFinalEntry();
    }
    let p: Page = await this.getPage(latestEntry);
    let metadata: RDF.Quad[] = p.getMetadata();
    let triples: RDF.Quad[] = p.getTriples();

    if (triples.length >= this.publicConfig['observationsPerPage']) {
      //the page is full, there needs to come a new one
      metadata = [];
      triples = [];
      this.interpreter.getShacl(metadata);
      this.interpreter.createMetadata([], metadata);
      this.interpreter.interpret(data, triples);
    } else {
      //destroy lastPage
      this.destroyPage(latestEntry);
      this.interpreter.interpret(data, triples);
      if (triples.length >= this.publicConfig['observationsPerPage']) {
        this.interpreter.createHyperMedia([latestEntry], triples);
      }
    }

    await this.importPageWithoutIndex(new Page(metadata, triples));


  }

}


