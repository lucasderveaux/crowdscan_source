import type * as RDF from 'rdf-js';
import { Page } from '../lib/Page';
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';
import { crowdscanSource } from './crowdscanSource';
import interpreterInstance from './Interpreter/InterpreterInstance';
import IInterpreter from './Interpreter/IInterpreter';

export class mySource extends crowdscanSource {


  protected config: object;
  interpreter: IInterpreter;

  constructor(config: object, instance: interpreterInstance) {
    super(config, instance);
    this.instance.appendCatalog(this);
  }

  setInterpreter(interpreter: IInterpreter) {
    this.interpreter = interpreter;
    this.createPages();
  }

  async createPages(): Promise<void> {
    let metadata: RDF.Quad[] = [];
    this.interpreter.createMetadata([], metadata);

    await this.importPageWithoutIndex(new Page(metadata, []));

    //aan de instance laten weten dat de zones mogen
    this.instance.createZonePages();
  }


  public async appendElement(data: any[]) {
    let latestEntry = await this.getFinalEntry();
    while (latestEntry == null) {
      latestEntry = await this.getFinalEntry();
    }
    //getPage
    let p: Page = await this.getPage(latestEntry);
    let metadata: RDF.Quad[] = p.getMetadata();
    let triples: RDF.Quad[] = p.getTriples();

    if (triples.length >= this.publicConfig['observationsPerPage']) {
      //the page is full, there needs to come a new one
      metadata = [];
      triples = [];
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


