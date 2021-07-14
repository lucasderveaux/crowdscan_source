import { Source, Page } from '@treecg/basic-ldes-server';
import type * as RDF from 'rdf-js';
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';

export class mySource extends Source {

  protected config: object;
  hoeveelheid: number;

  constructor(config: object) {
    super(config);
    this.hoeveelheid = 2;
  }

  async getPage(id: any): Page {
    let triples: RDF.Quad[];
    triples = [];
    
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('https://crowdscan.be/id/observation/')
      )
    );
    

    //sh: 	http://www.w3.org/ns/shacl#

    //hasFeatureOfInterest
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('FOF')
      )
    );
    triples.push(
      quad(
        blankNode('FOF'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest')
      )
    );
    triples.push(
      quad(
        blankNode('FOF'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('FOF'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
        //verwijst naar andere node
    triples.push(
      quad(
        blankNode('FOF'),
        namedNode('http://www.w3.org/ns/shacl#nodeKind'),
        namedNode('http://www.w3.org/ns/shacl#IRI')
      )
    );

    
    //observedProperty
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('OP')
      )
    );
    triples.push(
      quad(
        blankNode('OP'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/observedProperty')
      )
    );
    triples.push(
      quad(
        blankNode('OP'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('OP'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
        //verwijst naar andere node
    triples.push(
      quad(
        blankNode('OP'),
        namedNode('http://www.w3.org/ns/shacl#nodeKind'),
        namedNode('http://www.w3.org/ns/shacl#IRI')
      )
    );
    //resultTime
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('RT')
      )
    );
    triples.push(
      quad(
        blankNode('RT'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/resultTime')
      )
    );
    triples.push(
      quad(
        blankNode('RT'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('RT'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('RT'),
        namedNode('http://www.w3.org/ns/shacl#datatype'),
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
      )
    );
    //hasSimpleResult
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('HSR')
      )
    );
    triples.push(
      quad(
        blankNode('HSR'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/hasSimpleResult')
      )
    );
    triples.push(
      quad(
        blankNode('HSR'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('HSR'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('HSR'),
        namedNode('http://www.w3.org/ns/shacl#datatype'),
        namedNode('http://www.w3.org/2001/XMLSchema#double')
      )
    )
    //phenomenonTime
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('PT')
      )
    );
    triples.push(
      quad(
        blankNode('PT'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/phenomenonTime')
      )
    );
    triples.push(
      quad(
        blankNode('PT'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('PT'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('PT'),
        namedNode('http://www.w3.org/ns/shacl#datatype'),
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
      )
    );
    //madeBySensor
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('MBS')
      )
    );
    triples.push(
      quad(
        blankNode('MBS'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/madeBySensor')
      )
    );
    triples.push(
      quad(
        blankNode('MBS'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('MBS'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
        //verwijst naar andere node
    triples.push(
      quad(
        blankNode('MBS'),
        namedNode('http://www.w3.org/ns/shacl#nodeKind'),
        namedNode('http://www.w3.org/ns/shacl#IRI')
      )
    );
    


    const p = new Page(triples, []);
    return p;

  }

}


