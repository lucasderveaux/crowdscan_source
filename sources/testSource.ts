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

    // let environment = 'gent_langemunt';
    // //feature of Interest
    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
    //   )
    // );

    // //observable property
    // triples.push(
    //   quad(
    //     //http://www.wikidata.org/entity/P3872 is the patronage
    //     //the number of passengers,patrons or visitors in a specified time period
    //     namedNode('http://www.wikidata.org/entity/P3872'),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('http://www.w3.org/ns/sosa/ObservableProperty')
    //   )
    // );
    // triples.push(
    //   quad(
    //     namedNode('http://www.wikidata.org/entity/P3872'),
    //     namedNode('http://www.w3.org/2000/01/rdf-schema#comment'),
    //     literal("hoeveelheid passagiers of klanten in een bepaalde periode")
    //   )
    // );
    // //platform
    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_platform'),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('http://www.w3.org/ns/sosa/Platform')
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment),
    //     namedNode('http://www.w3.org/ns/sosa/hasSample'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sample')
    //   )
    // );


    // //samples aanmaken

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sample'),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('http://www.w3.org/ns/sosa/Sample')
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sample'),
    //     namedNode('http://www.w3.org/ns/sosa/isSampleOf'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment)
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_platfom'),
    //     namedNode('http://www.w3.org/ns/sosa/hosts'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sensor')
    //   )
    // );

    // //sensoren aanmaken

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sensor'),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('http://www.w3.org/ns/sosa/Sensor')
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sensor'),
    //     namedNode('http://www.w3.org/ns/sosa/isHostedBy'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_platform')
    //   )
    // );

    // let date = Date.now();
    // let tijd = new Date(date);
    // let headCount = 553.335;

    // //LDES
    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
    //     namedNode('https://w3id.org/tree#member'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //   )
    // );
    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('http://www.w3.org/ns/sosa/Observation')
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment)
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/ns/sosa/observedProperty'),
    //     namedNode('http://www.wikidata.org/entity/P3872')
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/ns/sosa/resultTime'),
    //     literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/ns/sosa/hasSimpleResult'),
    //     literal(headCount.toString(), namedNode('http://www.w3.org/2001/XMLSchema#double'))
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/ns/sosa/phenomenonTime'),
    //     literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
    //   )
    // );

    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '/observations/' + tijd.getTime()),
    //     namedNode('http://www.w3.org/ns/sosa/madeBySensor'),
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/' + environment + '_sensor')
    //   )
    // );



    // triples.push(
    //   quad(
    //     namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
    //     namedNode('https://w3id.org/tree#view'),
    //     namedNode('https://localhost:3000/crowdscan/' + this.hoeveelheid)
    //   )
    // );
    // triples.push(
    //   quad(
    //     namedNode('https://localhost:3000/crowdscan/' + this.hoeveelheid),
    //     namedNode('https://w3id.org/tree#relation'),
    //     blankNode('r' + this.hoeveelheid)
    //   )
    // );

    // triples.push(
    //   quad(
    //     blankNode('r' + this.hoeveelheid),
    //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
    //     namedNode('https://w3id.org/tree#GreaterThanRelation')
    //   )
    // );

    // triples.push(
    //   quad(
    //     blankNode('r' + this.hoeveelheid),
    //     namedNode('https://w3id.org/tree#path'),
    //     namedNode('http://www.w3.org/ns/sosa/resultTime')
    //   )
    // );

    // triples.push(
    //   quad(
    //     blankNode('r' + this.hoeveelheid),
    //     namedNode('https://w3id.org/tree#value'),
    //     literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
    //   )
    // );



    // triples.push(
    //   quad(
    //     blankNode('r' + this.hoeveelheid),
    //     namedNode('https://w3id.org/tree#node'),
    //     namedNode('https://localhost:3000/crowdscan/' + (this.hoeveelheid + 1))
    //   )
    // );

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
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/ObservationShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('o')
      )
    );

    //sh: 	http://www.w3.org/ns/shacl#

    //hasFeatureOfInterest
    triples.push(
      quad(
        blankNode('o'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest')
      )
    );
    triples.push(
      quad(
        blankNode('o'),
        namedNode('	http://www.w3.org/ns/shacl#maxCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('o'),
        namedNode('	http://www.w3.org/ns/shacl#minCount'),
        literal('1','http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    
    //observedProperty
    //resultTime
    //hasSimpleResult
    //phenomenonTime
    //madeBySensor
    


    const p = new Page(triples, []);
    return p;

  }

}


