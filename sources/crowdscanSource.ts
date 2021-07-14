import { Source, Page } from '@treecg/basic-ldes-server';
import { Readable } from 'stream';
import type * as RDF from 'rdf-js';
import { blankNode, literal, namedNode, quad } from '@rdfjs/data-model';
let mqtt = require('mqtt');
require('dotenv').config();

export class mySource extends Source {

  private crowdscansource = class CrowdscanSource {

    public observations: RDF.Quad[];
    public time: Date;
    public parent: mySource;
    private config: object;
    private hoeveelheid: number;

    constructor(config: object, parent: mySource) {
      this.config = config;
      this.observations = [];
      this.time = new Date();
      this.parent = parent;
      this.hoeveelheid = 1;
    }

    public async appendObservation(rdf: RDF.Quad[]): Promise<void> {
      if (this.observations.length == 0) {
        this.observations = rdf;
      } else {
        if (this.observations.length >= 50) {
          this.observations = this.observations.concat(rdf);
          this.createPage();
          this.hoeveelheid++;
          this.observations = [];
        } else {
          this.observations = this.observations.concat(rdf);
          console.log(this.observations.length);
        }

      }

    }

    public getFeatures(triples: RDF.Quad[]): void {

      let environment = this.config['environment'];
      // //feature of Interest
      // triples.push(
      //   quad(
      //     namedNode('https://crowdscan.be/id/environment/gent/' + environment),
      //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      //     namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')
      //   )
      // );

      // //property geometry
      // //kleine g
      // //Associates any resource with the corresponding geometry.
      // triples.push(
      //   quad(
      //     namedNode('https://crowdscan.be/id/environment/gent/' + environment),
      //     namedNode('http://www.w3.org/ns/locn#geometry'),
      //     blankNode('locn')
      //   )
      // );

      // //class Geometry
      // //eometry class provides the means to identify a location as a point, 
      // //line, polygon, etc. expressed using coordinates in some coordinate 
      // //reference system.
      // triples.push(
      //   quad(
      //     blankNode('locn'),
      //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      //     namedNode('http://www.w3.org/ns/locn#Geometry')
      //   )
      // );

      // triples.push(
      //   quad(
      //     blankNode('locn'),
      //     namedNode('http://www.opengis.net/ont/geosparql#'),
      //     literal('<http://www.opengis.net/def/crs/OGC/1.3/CRS84> MULTILINESTRING((4.47577215954854 51.3021139617358,4.47595551773865 51.3021950921476,4.47695639672957 51.3026379150719,4.47697279209603 51.3026451710098,4.47710697740073 51.3027045352444,4.47715948350988 51.3027277644868))',
      //       namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'))
      //   )
      // )

      //observable property
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

      // //sensoren aanmaken
      // triples.push(
      //   quad(
      //     namedNode('https://crowdscan.be/id/sensor/gent/' + environment),
      //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
      //     namedNode('http://www.w3.org/ns/sosa/Sensor')
      //   )
      // );

      //LDES
      triples.push(
        quad(
          namedNode('https://production.crowdscan.be/dataapi/public/ldes'),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('https://w3id.org/ldes#EventStream')
        )
      );

    }

    public makeObservation(data: string): RDF.Quad[] {
      let rdf: RDF.Quad[];
      rdf = [];

      let inhoud = JSON.parse(data);
      let payload = inhoud["payload"]["regions"];
      let tijd: Date = new Date(inhoud['header']['time']);

      this.time = tijd;

      let environment = inhoud['header']['environment'];

      function makeSingleObservation(headCount: number, environment: string): void {
        rdf.push(
          quad(
            namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
            namedNode('https://w3id.org/tree#member'),
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
          )
        );
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
            namedNode('http://www.w3.org/ns/sosa/Observation')
          )
        );

        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest'),
            namedNode('https://crowdscan.be/id/environment/gent/' + environment+'_v1')
          )
        );

        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/observedProperty'),
            namedNode('https://crowdscan.be/ns/numberOfPeople')
          )
        );

        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/resultTime'),
            literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
          )
        );

        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/hasSimpleResult'),
            literal(headCount.toString(), namedNode('http://www.w3.org/2001/XMLSchema#double'))
          )
        );

        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/phenomenonTime'),
            literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
          )
        );

        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/madeBySensor' + '_v1'),
            namedNode('https://crowdscan.be/id/sensor/gent/' + environment)
          )
        );
      }


      makeSingleObservation(payload[0], environment);
      this.appendObservation(rdf);
      return rdf;

    }



    public async createPage(): Promise<void> {
      let rdf: RDF.Quad[] = [];
      this.getFeatures(rdf);
      rdf = rdf.concat(this.observations);

      this.createHyperMedia(rdf);
      let p = new Page([], rdf);
      //console.log(p);
      this.parent.createPage([p]);

    }

    public createHyperMedia(rdf: RDF.Quad[]): void {
      rdf.push(
        quad(
          namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
          namedNode('https://w3id.org/tree#view'),
          namedNode('https://localhost:3000/crowdscan/' + this.hoeveelheid)
        )
      );
      rdf.push(
        quad(
          namedNode('https://localhost:3000/crowdscan/' + this.hoeveelheid),
          namedNode('https://w3id.org/tree#relation'),
          blankNode('r' + this.hoeveelheid)
        )
      );

      rdf.push(
        quad(
          blankNode('r' + this.hoeveelheid),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('https://w3id.org/tree#GreaterThanRelation')
        )
      );

      rdf.push(
        quad(
          blankNode('r' + this.hoeveelheid),
          namedNode('https://w3id.org/tree#path'),
          namedNode('http://www.w3.org/ns/sosa/resultTime')
        )
      );

      rdf.push(
        quad(
          blankNode('r' + this.hoeveelheid),
          namedNode('https://w3id.org/tree#value'),
          literal(this.time.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
        )
      );



      rdf.push(
        quad(
          blankNode('r' + this.hoeveelheid),
          namedNode('https://w3id.org/tree#node'),
          namedNode('https://localhost:3000/crowdscan/' + (this.hoeveelheid + 1))
        )
      );
    }
  }

  private readable: Readable;
  private cr;
  protected config: object;

  constructor(config: object) {
    super(config);
    this.config = config;
    this.cr = new this.crowdscansource(this.config, this);
    this.readable = this.createRStream();
  }

  public getStreamIfExists() {

    return this.readable;
  }

  public createPage(p: Page[]) {
    super.importPages(p);
  }

  public createRStream(): Readable {
    let r = new Readable();
    let cr = this.cr;

    let rdf: RDF.Quad[];

    let tijd: Date;

    let client = mqtt.connect(
      'mqtt://data.crowdscan.be', {
      username: this.config['username'],
      password: process.env.CR
    }, (err: any) => {
      if (err) console.log("er is een error" + err.message);
    }
    );

    client.on('connect', () => {
      console.log('connected to MQTT data broker');
    });

    client.subscribe(this.config['topic']);
  

    client.on('message', function (topic: string, message: string, packet: any) {
      tijd = new Date(JSON.parse(message)['header']['time']);
      rdf = cr.makeObservation(message);


      let val = Buffer.from(JSON.stringify(rdf));
      r.read = function () {
        return val;
      }
      r.unshift(val);
      r.push(val);
    });

    client.on('error', function (err: any) {
      console.log('error mqtt' + err);
    });

    return r;
  }

}