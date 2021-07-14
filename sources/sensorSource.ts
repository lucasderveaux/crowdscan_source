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

    let environment = 'gent_langemunt';
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
    )

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


    const p = new Page(triples, []);
    return p;
  }
}


