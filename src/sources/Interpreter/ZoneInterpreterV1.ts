import { Quad } from "rdf-js";
import { literal, namedNode, blankNode, quad } from '@rdfjs/data-model';
import AInterpreter from "./AInterpreter";

export default class SensorInterpreterV1 extends AInterpreter {

  constructor() {
    super();
  }

  interpret(data: string[], triples: Quad[]): void {
    let environment = data[0];
    let aantal = Number.parseInt(data[1]);

    let date: Date = new Date(Date.now());

    /*
    feature of interest
    */


    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/environments/evenstream'),
        namedNode('https://w3id.org/tree#member'),
        namedNode('https://crowdscan.be/subject/feed/environment/' + environment + '_v1'),
      )
    );
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataap/environments/evenstream'),
        namedNode('https://w3id.org/tree#member'),
        namedNode('https://crowdscan.be/subject/feed/sensor/' + environment + '_v1'),
      )
    );

    //feature of Interest
    triples.push(
      quad(
        namedNode('https://crowdscan.be/subject/feed/environment/' + environment + '_v1'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
      )
    );

    triples.push(
      quad(
        namedNode('https://crowdscan.be/subject/feed/environment/' + environment + '_v1'),
        namedNode('http://purl.org/dc/terms/isVersionOf'),
        namedNode('https://crowdscan.be/subject/feed/environment/' + environment)
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/subject/feed/environment/' + environment + '_v1'),
        namedNode('http://purl.org/dc/terms/created'),
        literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );

    //property geometry
    //kleine g
    //Associates any resource with the corresponding geometry.
    triples.push(
      quad(
        namedNode('https://crowdscan.be/subject/feed/environment/' + environment + '_v1'),
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
        literal('<http://www.opengis.net/def/crs/OGC/1.3/CRS84> MULTILINESTRING(3.722529868069784 51.0558306603255,3.7227900423442284 51.055989138119095,3.7232138313685814 51.05633306678402,3.7234531765417023 51.05656270707058,3.723467216505414 51.05655720363685,3.7232311821121034 51.05632960517266,3.722983077778226 51.05611886485648,3.722796837235518 51.055970636405476,3.722544709588118 51.05582058823546,3.722529868069784 51.0558306603255)',
          namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'))
      )
    );


    //sensoren aanmaken
    for (let i = 0; i < aantal; i++) {
      triples.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/sensor/' + environment + '_v' + i),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://www.w3.org/ns/sosa/Sensor')
        )
      );

      triples.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/sensor/' + environment + '_v' + i),
          namedNode('http://purl.org/dc/terms/isVersionOf'),
          namedNode('https://crowdscan.be/subject/feed/sensor/' + environment)
        )
      );



      triples.push(
        quad(
          namedNode('https://crowdscan.be/subject/feed/sensor/' + environment + '_v' + i),
          namedNode('http://purl.org/dc/terms/created'),
          literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );
    }
  }


  createLDES(triples: Quad[]): void {
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/public/ldes'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('https://w3id.org/ldes#EventStream')
      )
    );
  }

  /*
    shacl
  */
  getShacl(triples: Quad[]): void {

    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/FeatureOfInterestShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/FeatureOfInterestShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
      )
    );
    //isVersionOf
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/FeatureOfInterestShape'),
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
        namedNode('http://crowdscan.be/ns/FeatureOfInterestShape'),
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
        namedNode('http://crowdscan.be/ns/FeatureOfInterestShape'),
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
        namedNode('http://crowdscan.be/ns/GeoShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/GeoShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('http://www.w3.org/ns/locn#Geometry')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/GeoShape'),
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
    )
    /*
    sensorShape
    */
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/SensorShape'),
        namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"),
        namedNode('http://www.w3.org/ns/shacl#NodeShape')
      )
    );
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/SensorShape'),
        namedNode('http://www.w3.org/ns/shacl#targetClass'),
        namedNode('http://www.w3.org/ns/sosa/Sensor')
      )
    )
    //created
    triples.push(
      quad(
        namedNode('http://crowdscan.be/ns/SensorShape'),
        namedNode('http://www.w3.org/ns/shacl#property'),
        blankNode('C')
      )
    );
    triples.push(
      quad(
        blankNode('C'),
        namedNode('http://www.w3.org/ns/shacl#path'),
        namedNode('http://purl.org/dc/terms/created')
      )
    );
    triples.push(
      quad(
        blankNode('C'),
        namedNode('http://www.w3.org/ns/shacl#maxCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('C'),
        namedNode('http://www.w3.org/ns/shacl#minCount'),
        literal('1', 'http://www.w3.org/2001/XMLSchema#integer')
      )
    );
    triples.push(
      quad(
        blankNode('C'),
        namedNode('http://www.w3.org/ns/shacl#datatype'),
        namedNode('http://www.w3.org/2001/XMLSchema#dateTime')
      )
    );
  }
  createHyperMedia(relations: any[], triples: Quad[]): void {
    //Voorlopig geen hypermedia vereist, er zijn maar 3 regio's.
    return null;
  }

}