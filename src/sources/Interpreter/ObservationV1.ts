import * as RDF from 'rdf-js';
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';
import AInterpreter from './AInterpreter';
import interpreterInstance from './InterpreterInstance';

export default class ObservationV1 extends AInterpreter {

  constructor(config: string, interpreterParent: interpreterInstance) {
    super(config, interpreterParent);
  }

  createMetadata(data: any[], triples: RDF.Quad[]): void {
    let route = 'https://crowdscan.be' + this.route;
    let hoeveelheid = Number.parseInt(data[0]);
    /*
    observable property
    */
    triples.push(
      quad(
        //http://www.wikidata.org/entity/P3872 is the patronage
        //the number of passengers,patrons or visitors in a specified time period
        namedNode('https://crowdscan.be/id/PeopleEstimate'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/sosa/ObservableProperty')
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/PeopleEstimate'),
        namedNode('http://www.w3.org/2004/02/skos/core#narrowMatch'),
        namedNode('http://www.wikidata.org/entity/P3872')
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/PeopleEstimate'),
        namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
        literal("Calculated estimate of the number of people in an environment", "en")
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/PeopleEstimate'),
        namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
        literal("Berekende hoeveelheid mensen in een bepaald gebied", "nl")
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/PeopleEstimate'),
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
        namedNode(route),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('https://w3id.org/ldes#EventStream')
      )
    );
    triples.push(
      quad(
        namedNode(route),
        namedNode('http://w3id.org/ldes#timestampPath'),
        namedNode('http://www.w3.org/ns/sosa/resultTime')
      )
    );
    triples.push(
      quad(
        namedNode(route),
        namedNode('http://w3id.org/tree#shape'),
        namedNode(route + '/shape.ttl')
      )
    );
    triples.push(
      quad(
        namedNode(route),
        namedNode('http://w3id.org/tree#view'),
        namedNode(route + '/' + hoeveelheid)
      )
    );

    triples.push(
      quad(
        namedNode(route + '/' + hoeveelheid),
        namedNode('http://w3id.org/ldes#retentionPolicy'),
        blankNode('r')
      )
    );

    triples.push(
      quad(
        blankNode('r'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://w3id.org/ldes#latestVersionSubset')
      )
    );

    triples.push(
      quad(
        blankNode('r'),
        namedNode('http://w3id.org/ldes#latestVersionSubset'),
        literal(this.config["observationsPerPage"])
      )
    );


  }

  interpret(data: string, rdf: RDF.Quad[]): void {
    let inhoud = JSON.parse(data);
    let payload: number[] = inhoud["payload"]["regions"];
    let tijd: Date = new Date(inhoud['header']['time']);

    let environment = inhoud['header']['environment'];
    //binnen de quad kan je niet aan instantievariabelen van de klasse

    let route = 'https://crowdscan.be' + this.route;


    /*
      Add zones to the zoneInterpreter
      The boolean firstAddition gives the indication that the zones of these observations haven't been added yet
    */
    if (this.firstAddition) {
      if (payload.length != 1) {
        this.interpreterParent.giveZones(environment, payload.length - 1);
      } else {
        this.interpreterParent.giveZones(environment, 1);
      }
      //[what, URL fo LDES,environment]
      this.interpreterParent.giveSubjects(['observations', route, environment]);
      this.firstAddition = false;
    }

    //one observation in a certain environment

    function makeSingleObservation(headCount: number, environment: string, i: number): void {
      rdf.push(
        quad(
          namedNode(route + '/v1'),
          namedNode('https://w3id.org/tree#member'),
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
        )
      );
      rdf.push(
        quad(
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://www.w3.org/ns/sosa/Observation')
        )
      );
      //hasFeatureOfInterest
      rdf.push(
        quad(
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
          namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest'),
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i)
        )
      );
      //observedProperty
      rdf.push(
        quad(
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
          namedNode('http://www.w3.org/ns/sosa/observedProperty'),
          namedNode('https://crowdscan.be/id/PeopleEstimate')
        )
      );
      //resultTime
      rdf.push(
        quad(
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
          namedNode('http://www.w3.org/ns/sosa/resultTime'),
          literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );
      //hasSimpleResult
      rdf.push(
        quad(
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
          namedNode('http://www.w3.org/ns/sosa/hasSimpleResult'),
          literal(headCount.toString(), namedNode('http://www.w3.org/2001/XMLSchema#double'))
        )
      );
      //phenomenonTime
      rdf.push(
        quad(
          namedNode(route + '/' + i + '/' + tijd.toISOString()),
          namedNode('http://www.w3.org/ns/sosa/phenomenonTime'),
          literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );

      //feature of interest
      rdf.push(
        quad(
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
          namedNode('http://purl.org/dc/terms/isVersionOf'),
          namedNode('https://crowdscan.be/id/gent_langemunt/1')
        )
      );
    }

    if (payload.length == 1) {
      makeSingleObservation(payload[0], environment, 0);
    } else {
      for (let i = 1; i < payload.length; i++) {
        makeSingleObservation(payload[i], environment, i);
      }
    }
  }

  public getShacl(triples: RDF.Quad[]): void {
    let route = 'https://crowdscan.be' + this.route;
    triples.push(
      quad(
        namedNode(route + '/ObservationShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode(route + '/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('http://www.w3.org/ns/sosa/Observation')
      )
    );


    //sh: 	http://www.w3.org/ns/shacl#

    //hasFeatureOfInterest
    triples.push(
      quad(
        namedNode(route + '/ObservationShape'),
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
        namedNode(route + '/ObservationShape'),
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
        namedNode(route + '/ObservationShape'),
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
        namedNode(route + '/ObservationShape'),
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
        namedNode(route + '/ObservationShape'),
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

  }

  createHyperMedia(data, rdf): void {
    let hoeveelheid = data[0];
    let time = new Date();
    let route = this.route;
    /*f
          hyperMedia creation
    */
    rdf.push(
      quad(
        namedNode(this.config['entrypoint'] + route),
        namedNode('https://w3id.org/tree#view'),
        namedNode(this.config['entrypoint'] + this.route + '/' + (hoeveelheid))
      )
    );
    rdf.push(
      quad(
        namedNode(this.config['entrypoint'] + this.route + '/' + (hoeveelheid)),
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
        namedNode(this.config['entrypoint'] + this.route + '/' + (hoeveelheid + 1))
      )
    );
  }

}