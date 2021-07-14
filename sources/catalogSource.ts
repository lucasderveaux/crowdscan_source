import { Source, Page } from '@treecg/basic-ldes-server';
import type * as RDF from 'rdf-js';
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';

export class mySource extends Source {

  protected config: object;
  hoeveelheid: number;

  constructor(config: object) {
    super(config);
  }

  async getPage(id: any): Page {
    let triples: RDF.Quad[];
    triples = [];

    let x = Date.now();
    let date = new Date(x);

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
        literal('Catalog for Crowdscan Data in the Langemunt in Ghent', 'en')
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
        literal('Dataset for the sensors and feature of interest in the Langemunt in Ghent', 'en')
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
        literal('http://localhost:3000/crowdscan/1', namedNode('http://www.w3.org/2001/XMLSchema#anyURI'))
      )
    );

    const p = new Page(triples, []);
    return p;

  }

}


