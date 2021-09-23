import { Quad } from "rdf-js";
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';
import AInterpreter from "./AInterpreter";
import interpreterInstance from "./InterpreterInstance";

export default class SensorInterpreterV1 extends AInterpreter {

  constructor(config: string, interpreterParent: interpreterInstance) {
    super(config, interpreterParent);
  }

  public interpret(data: string[], triples: Quad[]): void {
    let environment = data[0];
    let aantal = Number.parseInt(data[1]);

    let date: Date = new Date(Date.now());

    for (let i = 0; i < aantal; i++) {

      /*
      feature of interest
      */

      triples.push(
        quad(
          namedNode('https://production.crowdscan.be/' + this.route),
          namedNode('https://w3id.org/tree#member'),
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
        )
      );



      //feature of Interest
      triples.push(
        quad(
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
        )
      );
      triples.push(
        quad(
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
          namedNode('http://purl.org/dc/terms/title'),
          literal("Zone " + i + " int the environment: " + environment)
        )
      );

      triples.push(
        quad(
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
          namedNode('http://purl.org/dc/terms/isVersionOf'),
          namedNode('https://crowdscan.be/id/' + environment + '/1')
        )
      );
      triples.push(
        quad(
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
          namedNode('http://purl.org/dc/terms/created'),
          literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );

      //property geometry
      //kleine g
      //Associates any resource with the corresponding geometry.
      triples.push(
        quad(
          namedNode('https://crowdscan.be/id/' + environment + '/1#v' + i),
          namedNode('http://www.w3.org/ns/locn#geometry'),
          blankNode('loc')
        )
      );

      //class Geometry
      //eometry class provides the means to identify a location as a point, 
      //line, polygon, etc. expressed using coordinates in some coordinate 
      //reference system.
      triples.push(
        quad(
          blankNode('loc'),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://www.w3.org/ns/locn#Geometry')
        )
      );

      triples.push(
        quad(
          blankNode('loc'),
          namedNode('http://www.opengis.net/ont/geosparql#asWKT'),
          literal('<http://www.opengis.net/def/crs/OGC/1.3/CRS84>' + this.config['featureOfInterests'][environment][i],
            namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'))
        )
      );

      if (this.firstAddition) {

        //[what, URL fo LDES,environment]
        this.interpreterParent.giveSubjects(['zones', 'https://production.crowdscan.be/' + this.route, environment]);
        this.firstAddition = false;
      }

    }
  }

  public createMetadata(triples: Quad[]): void {
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/' + this.route + '/v1'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('https://w3id.org/ldes#EventStream')
      )
    );
  }

  /*
    shacl
  */
  public getShacl(triples: Quad[]): void {

    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/FeatureOfInterestShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/FeatureOfInterestShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
      )
    );
    //isVersionOf
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/FeatureOfInterestShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('FOFS')
      )
    );
    triples.push(
      quad(
        blankNode('FOFS'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://purl.org/dc/terms/isVersionOf')
      )
    );
    triples.push(
      quad(
        blankNode('FOFS'),
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('FOFS'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('FOFS'),
        namedNode('http://www.w3.org/ns/shacl#nodeKind'),
        namedNode('http://www.w3.org/ns/shacl#IRI')
      )
    );

    //created
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/FeatureOfInterestShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('DC')
      )
    );
    triples.push(
      quad(
        blankNode('DC'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://purl.org/dc/terms/created')
      )
    );
    triples.push(
      quad(
        blankNode('DC'),
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('DC'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('DC'),
        namedNode('http://www.w3.org/ns/shacl#datatype'),
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
      )
    );
    //geometry
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/FeatureOfInterestShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('g')
      )
    );
    triples.push(
      quad(
        blankNode('g'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.w3.org/ns/locn#geometry')
      )
    );
    triples.push(
      quad(
        blankNode('g'),
        namedNode('http://www.w3.org/ns/shacl#node'),
        namedNode('http://crowdscan.be/ns/GeoShape')
      )
    );
    triples.push(
      quad(
        blankNode('g'),
        namedNode('http://www.w3.org/ns/shacl#nodeKind'),
        namedNode('http://www.w3.org/ns/shacl#BlankNode')
      )
    );
    triples.push(
      quad(
        blankNode('g'),
        namedNode('http://www.w3.org/ns/shacl#class'),
        namedNode('http://www.w3.org/ns/locn#Geometry')
      )
    );
    //GeoShape
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/GeoShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/GeoShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('http://www.w3.org/ns/locn#Geometry')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be' + this.route + '/GeoShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('G')
      )
    );
    triples.push(
      quad(
        blankNode('G'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://www.opengis.net/ont/geosparql#asWKT')

      )
    );
    triples.push(
      quad(
        blankNode('G'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('G'),
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('G'),
        namedNode('http://www.w3.org/ns/shacl#datatype'),
        namedNode('http://www.opengis.net/ont/geosparql#wktLiteral')
      )
    );
  }
  public createHyperMedia(relations: any[], triples: Quad[]): void {
    //Voorlopig geen hypermedia vereist, er zijn maar 3 regio's.
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/' + this.route),
        namedNode('https://w3id.org/tree#view'),
        namedNode(this.route + '/' + relations[0])
      )
    );
  }

}