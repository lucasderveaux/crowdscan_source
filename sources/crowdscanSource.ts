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
        if (this.observations.length >= this.config['observationsPerPage']) {
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
/*
      ObserveationShape
*/

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
          namedNode('http://www.w3.org/ns/shacl#maxCount'),
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
          namedNode('http://www.w3.org/ns/shacl#maxCount'),
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
          namedNode('http://www.w3.org/ns/shacl#maxCount'),
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
          namedNode('http://www.w3.org/ns/shacl#maxCount'),
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
          namedNode('http://www.w3.org/ns/shacl#maxCount'),
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
/*
    function for one observation
*/

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
        //hasFeatureOfInterest
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest'),
            namedNode('https://crowdscan.be/id/environment/gent/' + environment+'_v1')
          )
        );
        //observedProperty
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/observedProperty'),
            namedNode('https://crowdscan.be/ns/numberOfPeople')
          )
        );
        //resultTime
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/resultTime'),
            literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
          )
        );
        //hasSimpleResult
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/hasSimpleResult'),
            literal(headCount.toString(), namedNode('http://www.w3.org/2001/XMLSchema#double'))
          )
        );
        //phenomenonTime
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/phenomenonTime'),
            literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
          )
        );
        //madeBySensor
        rdf.push(
          quad(
            namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()),
            namedNode('http://www.w3.org/ns/sosa/madeBySensor'),
            namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1')
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
/*
      hyperMedia creation
*/
      rdf.push(
        quad(
          namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'),
          namedNode('https://w3id.org/tree#view'),
          namedNode('https://localhost:3000/langemunt/' + this.hoeveelheid)
        )
      );
      rdf.push(
        quad(
          namedNode('https://localhost:3000/langemunt/' + this.hoeveelheid),
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
          namedNode('https://localhost:3000/langemunt/' + (this.hoeveelheid + 1))
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
      password: process.env.CREDENTIALS
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