import { Source, Page } from '@treecg/basic-ldes-server';
import type * as RDF from 'rdf-js';
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';
import { DatabaseFactory } from '../models/DatabaseFactory';
import * as RdfString from "rdf-string";
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
  }

  async createPages(): Promise<void> {
    let triples: RDF.Quad[];
    triples = [];
    let date = new Date(Date.now());

    triples.push(
      quad(
        blankNode('catalog'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#Catalog')
      )
    );

    triples.push(
      quad(
        blankNode('catalog'),
        namedNode('http://purl.org/dc/terms/title'),
        literal('Catalog for Crowdscan Data', 'en')
      )
    );

    triples.push(
      quad(
        blankNode('catalog'),
        namedNode('http://www.w3.org/ns/dcat#dataset'),
        blankNode('dataset-sensors')
      )
    );
    triples.push(
      quad(
        blankNode('catalog'),
        namedNode('http://www.w3.org/ns/dcat#dataset'),
        blankNode('dataset-observations')
      )
    );

    //dataset-sensors
    triples.push(
      quad(
        blankNode('dataset-sensors'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#Dataset')
      )
    );

    triples.push(
      quad(
        blankNode('dataset-sensors'),
        namedNode('http://purl.org/dc/terms/title'),
        literal('Dataset for crowdscans\' sensors and feature of interest', 'en')
      )
    );

    triples.push(
      quad(
        blankNode('dataset-sensors'),
        namedNode('http://purl.org/dc/terms/issued'),
        literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );

    triples.push(
      quad(
        blankNode('dataset-Sensors'),
        namedNode('http://purl.org/dc/terms/distribution'),
        blankNode('dataset-sensors-distribution')
      )
    );

    //dataset-sensors-distribution
    triples.push(
      quad(
        blankNode('dataset-sensors-distribution'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://purl.org/dc/terms/Distribution')
      )
    );

    triples.push(
      quad(
        blankNode('dataset-sensors-distribution'),
        namedNode('http://purl.org/dc/terms/accessURL'),
        literal('http://localhost:3000/sensors/1', namedNode('http://www.w3.org/2001/XMLSchema#anyURI'))
      )
    );

    //dataset-observations
    triples.push(
      quad(
        blankNode('dataset-observations'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#Dataset')
      )
    );

    triples.push(
      quad(
        blankNode('dataset-observations'),
        namedNode('http://purl.org/dc/terms/title'),
        literal('Dataset for the observations in the Langemunt in Ghent', 'en')
      )
    );

    triples.push(
      quad(
        blankNode('dataset-observations'),
        namedNode('http://purl.org/dc/terms/issued'),
        literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );

    triples.push(
      quad(
        blankNode('dataset-observations'),
        namedNode('http://purl.org/dc/terms/distribution'),
        blankNode('dataset-observation-distribution')
      )
    );

    //dataset-observation-distribution
    triples.push(
      quad(
        blankNode('dataset-observation-distribution'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://purl.org/dc/terms/Distribution')
      )
    );

    triples.push(
      quad(
        blankNode('dataset-observation-distribution'),
        namedNode('http://purl.org/dc/terms/accessURL'),
        literal('http://localhost:3000/langemunt/1', namedNode('http://www.w3.org/2001/XMLSchema#anyURI'))
      )
    );

    await this.importPageWithoutIndex(new Page(triples, []));
  }


}


