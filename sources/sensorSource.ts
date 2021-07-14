import { Source, Page } from '@treecg/basic-ldes-server';
import type * as RDF from 'rdf-js';
import { literal, namedNode, blankNode, quad, triple } from '@rdfjs/data-model';

export class mySource extends Source {

  protected config: object;
  hoeveelheid: number;
  p: Page;

  constructor(config: object) {
    super(config);
    this.hoeveelheid = 2;
    this.p = this.createPage();
  }



  getPage(id: any): Page {
    return this.p;
  }

  createPage(): Page {
    let triples: RDF.Quad[];
    triples = [];

    let x = Date.now();
    let date = new Date(x);

    let environment = 'gent_langemunt';

    /*
    shacl
    */

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
    /*
    feature of interest
    */
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/public/ldes'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('https://w3id.org/ldes#EventStream')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
        namedNode('https://w3id.org/tree#member'),
        namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'),
      )
    );
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
        namedNode('https://w3id.org/tree#member'),
        namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1'),
      )
    );

    //feature of Interest
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
      )
    );

    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'),
        namedNode('http://purl.org/dc/terms/isVersionOf'),
        namedNode('https://crowdscan.be/id/environment/gent/' + environment)
      )
    );
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'),
        namedNode('http://purl.org/dc/terms/created'),
        literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );

    //property geometry
    //kleine g
    //Associates any resource with the corresponding geometry.
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'),
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
        namedNode('http://www.opengis.net/ont/geosparql#'),
        literal('<http://www.opengis.net/def/crs/OGC/1.3/CRS84> MULTILINESTRING(3.722529868069784 51.0558306603255,3.7227900423442284 51.055989138119095,3.7232138313685814 51.05633306678402,3.7234531765417023 51.05656270707058,3.723467216505414 51.05655720363685,3.7232311821121034 51.05632960517266,3.722983077778226 51.05611886485648,3.722796837235518 51.055970636405476,3.722544709588118 51.05582058823546,3.722529868069784 51.0558306603255)',
          namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'))
      )
    );


    //sensoren aanmaken
    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/sosa/Sensor')
      )
    );

    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1'),
        namedNode('http://purl.org/dc/terms/isVersionOf'),
        namedNode('https://crowdscan.be/id/sensor/gent/' + environment)
      )
    );



    triples.push(
      quad(
        namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1'),
        namedNode('http://purl.org/dc/terms/created'),
        literal(date.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );


    const p = new Page(triples, []);
    return p;
  }
}


