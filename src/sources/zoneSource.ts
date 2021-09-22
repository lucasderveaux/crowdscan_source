import { Source, Page } from '@treecg/basic-ldes-server';
import type * as RDF from 'rdf-js';
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
  }

  async createPages(): Promise<void> {

    let triples: RDF.Quad[];
    triples = [];

    this.interpreter.getShacl(triples);
    this.interpreter.createLDES(triples);
    this.interpreter.interpret(['gent_langemunt', '3'], triples);
    this.interpreter.interpret(['veldstraat', '1'], triples);

    await this.importPageWithoutIndex(new Page(triples, []));

  }

}


