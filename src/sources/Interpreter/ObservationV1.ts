import * as RDF from 'rdf-js';
import IInterpreter from './IInterpreter';
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';
import AInterpreter from './AInterpreter';

export default class ObservationV1 extends AInterpreter {

  constructor() {
    super();
  }

  createLDES(triples: RDF.Quad[]): void {
    /*
    observable property
    */
    triples.push(
      quad(
        //http://www.wikidata.org/entity/P3872 is the patronage
        //the number of passengers,patrons or visitors in a specified time period
        namedNode('https://crowdscan.be/ns/numberOfPeople'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/sosa/ObservableProperty')
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/ns/numberOfPeople'),
        namedNode('http://www.w3.org/2004/02/skos/core#narrowMatch'),
        namedNode('http://www.wikidata.org/entity/P3872')
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/ns/numberOfPeople'),
        namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
        literal("Number of people in an environment", "en")
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/ns/numberOfPeople'),
        namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
        literal("Hoeveelheid mensen in een bepaald gebied", "nl")
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/ns/numberOfPeople'),
        namedNode('https://www.w3.org/2000/01/rdf-schema#isDefinedBy'),
        namedNode('https://crowdscan.be/ns/')
      )
    );
    /*
    evenStream notatie
    */
    //LDES
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/public/ldes'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('https://w3id.org/ldes#EventStream')
      )
    );


  }

  interpret(data: string, rdf: RDF.Quad[]): void {
    let inhoud = JSON.parse(data);
    let payload: number[] = inhoud["payload"]["regions"];
    let tijd: Date = new Date(inhoud['header']['time']);

    let environment = inhoud['header']['environment'];

    function makeSingleObservation(headCount: number, environment: string, i: number): void {
      rdf.push(
        quad(
          namedNode('https://production.crowdscan.be/dataapi/environments/evenstream'),
          namedNode('https://w3id.org/tree#member'),
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
        )
      );
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation//' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://www.w3.org/ns/sosa/Observation')
        )
      );
      //hasFeatureOfInterest
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest'),
          namedNode('https://crowdscan.be/subject/feed/environment/' + environment + '_v1')
        )
      );
      //observedProperty
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/ns/sosa/observedProperty'),
          namedNode('https://crowdscan.be/ns/numberOfPeople')
        )
      );
      //resultTime
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/ns/sosa/resultTime'),
          literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );
      //hasSimpleResult
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/ns/sosa/hasSimpleResult'),
          literal(headCount.toString(), namedNode('http://www.w3.org/2001/XMLSchema#double'))
        )
      );
      //phenomenonTime
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/ns/sosa/phenomenonTime'),
          literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );
      //madeBySensor
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/observation/' + environment + '/' + tijd.getTime() + i),
          namedNode('http://www.w3.org/ns/sosa/madeBySensor'),
          namedNode('https://crowdscan.be/subject/feed/sensor/' + environment + '_v' + i)
        )
      );
    }

    for (let i = 0; i < payload.length; i++) {
      makeSingleObservation(payload[i], environment, i);
    }
  }

  getShacl(triples: RDF.Quad[]): void {
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
        namedNode('http://www.w3.org/ns/sosa/Observation')
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
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('FOF'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
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
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('OP'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
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
    /*
     resultTime
     */
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
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('RT'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
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
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('HSR'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
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
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('PT'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
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
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('MBS'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
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
  }

  createHyperMedia(data, rdf): void {
    let hoeveelheid = data[0];
    let environment = data[1];
    let time = new Date();
    /*
          hyperMedia creation
    */
    rdf.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/environments/evenstream'),
        namedNode('https://w3id.org/tree#view'),
        namedNode('https://localhost:3000/feed/' + environment + '/observations/' + hoeveelheid)
      )
    );
    rdf.push(
      quad(
        namedNode('https://localhost:3000/feed/' + environment + '/observations/' + hoeveelheid),
        namedNode('https://w3id.org/tree#relation'),
        blankNode('r' + hoeveelheid)
      )
    );

    rdf.push(
      quad(
        blankNode('r' + hoeveelheid),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('https://w3id.org/tree#GreaterThanRelation')
      )
    );

    rdf.push(
      quad(
        blankNode('r' + hoeveelheid),
        namedNode('https://w3id.org/tree#path'),
        namedNode('http://www.w3.org/ns/sosa/resultTime')
      )
    );

    rdf.push(
      quad(
        blankNode('r' + hoeveelheid),
        namedNode('https://w3id.org/tree#value'),
        literal(time.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );



    rdf.push(
      quad(
        blankNode('r' + hoeveelheid),
        namedNode('https://w3id.org/tree#node'),
        namedNode('https://localhost:3000/feed/' + environment + '/observations/' + (hoeveelheid + 1))
      )
    );
  }

}