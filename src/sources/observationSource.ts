import { Readable } from 'stream';
import { Page } from '../lib/Page';
import type * as RDF from 'rdf-js';
import IInterpreter from './Interpreter/IInterpreter';
import { crowdscanSource } from './crowdscanSource';
import interpreterInstance from './Interpreter/InterpreterInstance';
let mqtt = require('mqtt');
require('dotenv').config();

export class mySource extends crowdscanSource {
  appendElement(data: any) {
    throw new Error('Method not implemented.');
  }


  private observationSource = class observationSource {

    public observations: RDF.Quad[];
    public parent: mySource;
    private config: object;
    private hoeveelheid: number;

    private interpreter: IInterpreter;

    constructor(config: object, parent: mySource) {
      this.config = config;
      // this.interpreter = new ObservationV1();
      this.observations = [];
      this.parent = parent;
      this.hoeveelheid = 1;
    }

    public setInterpreter(interpreter: IInterpreter) {
      this.interpreter = interpreter;
    }

    public async appendObservation(rdf: RDF.Quad[]): Promise<void> {

      if (this.observations.length == 0) {
        this.observations = rdf;
      } else {
        if (this.observations.length >= this.parent.publicConfig['observationsPerPage']) {
          this.observations = this.observations.concat(rdf);
          this.createPage();
          this.hoeveelheid++;
          this.observations = [];
        } else {
          this.observations = this.observations.concat(rdf);
          console.log(this.config["environment"] + ": " + this.observations.length);
        }
      }
    }

    /*
        function for one observation
    */
    public makeObservation(data: string): RDF.Quad[] {

      let rdf: RDF.Quad[];
      rdf = [];

      this.interpreter.interpret(data, rdf);
      this.appendObservation(rdf);
      return rdf;
    }

    public async createPage(): Promise<void> {
      let rdf: RDF.Quad[] = [];
      this.interpreter.getShacl(rdf);
      this.interpreter.createMetadata([this.hoeveelheid], rdf);
      rdf = rdf.concat(this.observations);

      this.interpreter.createHyperMedia([this.hoeveelheid, this.config['environment']], rdf);
      let p = new Page([], rdf);

      this.parent.createPage(p);

    }
  }

  private readable: Readable;
  private cr;
  protected config: object;

  constructor(config: object, instance: interpreterInstance) {
    super(config, instance);
    this.config = config;
    this.cr = new this.observationSource(this.config, this);
    this.instance.appendObservation(this, this.config['environment']);
  }

  setInterpreter(interpreter: IInterpreter) {
    this.cr.setInterpreter(interpreter);
    interpreter.setRoute(this.config['route']);
  }



  public createPages() {
    this.readable = this.createRStream();
  }

  public createPage(p: Page) {
    this.importPageWithoutIndex(p);
  }

  public createRStream(): Readable {
    let r = new Readable();
    let cr = this.cr;

    let rdf: RDF.Quad[];

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