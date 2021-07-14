"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mySource = void 0;
const basic_ldes_server_1 = require("@treecg/basic-ldes-server");
const stream_1 = require("stream");
const data_model_1 = require("@rdfjs/data-model");
let mqtt = require('mqtt');
require('dotenv').config();
class mySource extends basic_ldes_server_1.Source {
    constructor(config) {
        super(config);
        this.crowdscansource = class CrowdscanSource {
            constructor(config, parent) {
                this.config = config;
                this.observations = [];
                this.time = new Date();
                this.parent = parent;
                this.hoeveelheid = 1;
            }
            appendObservation(rdf) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (this.observations.length == 0) {
                        this.observations = rdf;
                    }
                    else {
                        if (this.observations.length >= 50) {
                            this.observations = this.observations.concat(rdf);
                            this.createPage();
                            this.hoeveelheid++;
                            this.observations = [];
                        }
                        else {
                            this.observations = this.observations.concat(rdf);
                            console.log(this.observations.length);
                        }
                    }
                });
            }
            getFeatures(triples) {
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
                triples.push(data_model_1.quad(
                //http://www.wikidata.org/entity/P3872 is the patronage
                //the number of passengers,patrons or visitors in a specified time period
                data_model_1.namedNode('https://crowdscan.be/ns/numberOfPeople'), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('http://www.w3.org/ns/sosa/ObservableProperty')));
                triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/ns/numberOfPeople'), data_model_1.namedNode('http://www.w3.org/2004/02/skos/core#narrowMatch'), data_model_1.namedNode('http://www.wikidata.org/entity/P3872')));
                triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/ns/numberOfPeople'), data_model_1.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'), data_model_1.literal("Number of people in an environment", "en")));
                triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/ns/numberOfPeople'), data_model_1.namedNode('http://www.w3.org/2000/01/rdf-schema#comment'), data_model_1.literal("Hoeveelheid mensen in een bepaald gebied", "nl")));
                triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/ns/numberOfPeople'), data_model_1.namedNode('https://www.w3.org/2000/01/rdf-schema#isDefinedBy'), data_model_1.namedNode('https://crowdscan.be/ns/')));
                // //sensoren aanmaken
                // triples.push(
                //   quad(
                //     namedNode('https://crowdscan.be/id/sensor/gent/' + environment),
                //     namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
                //     namedNode('http://www.w3.org/ns/sosa/Sensor')
                //   )
                // );
                //LDES
                triples.push(data_model_1.quad(data_model_1.namedNode('https://production.crowdscan.be/dataapi/public/ldes'), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('https://w3id.org/ldes#EventStream')));
            }
            makeObservation(data) {
                let rdf;
                rdf = [];
                let inhoud = JSON.parse(data);
                let payload = inhoud["payload"]["regions"];
                let tijd = new Date(inhoud['header']['time']);
                this.time = tijd;
                let environment = inhoud['header']['environment'];
                function makeSingleObservation(headCount, environment) {
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'), data_model_1.namedNode('https://w3id.org/tree#member'), data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime())));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('http://www.w3.org/ns/sosa/Observation')));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest'), data_model_1.namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1')));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/ns/sosa/observedProperty'), data_model_1.namedNode('https://crowdscan.be/ns/numberOfPeople')));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/ns/sosa/resultTime'), data_model_1.literal(tijd.toISOString(), data_model_1.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/ns/sosa/hasSimpleResult'), data_model_1.literal(headCount.toString(), data_model_1.namedNode('http://www.w3.org/2001/XMLSchema#double'))));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/ns/sosa/phenomenonTime'), data_model_1.literal(tijd.toISOString(), data_model_1.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))));
                    rdf.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/observation/gent/' + environment + '/' + tijd.getTime()), data_model_1.namedNode('http://www.w3.org/ns/sosa/madeBySensor' + '_v1'), data_model_1.namedNode('https://crowdscan.be/id/sensor/gent/' + environment)));
                }
                makeSingleObservation(payload[0], environment);
                this.appendObservation(rdf);
                return rdf;
            }
            createPage() {
                return __awaiter(this, void 0, void 0, function* () {
                    let rdf = [];
                    this.getFeatures(rdf);
                    rdf = rdf.concat(this.observations);
                    this.createHyperMedia(rdf);
                    let p = new basic_ldes_server_1.Page([], rdf);
                    //console.log(p);
                    this.parent.createPage([p]);
                });
            }
            createHyperMedia(rdf) {
                rdf.push(data_model_1.quad(data_model_1.namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'), data_model_1.namedNode('https://w3id.org/tree#view'), data_model_1.namedNode('https://localhost:3000/crowdscan/' + this.hoeveelheid)));
                rdf.push(data_model_1.quad(data_model_1.namedNode('https://localhost:3000/crowdscan/' + this.hoeveelheid), data_model_1.namedNode('https://w3id.org/tree#relation'), data_model_1.blankNode('r' + this.hoeveelheid)));
                rdf.push(data_model_1.quad(data_model_1.blankNode('r' + this.hoeveelheid), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('https://w3id.org/tree#GreaterThanRelation')));
                rdf.push(data_model_1.quad(data_model_1.blankNode('r' + this.hoeveelheid), data_model_1.namedNode('https://w3id.org/tree#path'), data_model_1.namedNode('http://www.w3.org/ns/sosa/resultTime')));
                rdf.push(data_model_1.quad(data_model_1.blankNode('r' + this.hoeveelheid), data_model_1.namedNode('https://w3id.org/tree#value'), data_model_1.literal(this.time.toISOString(), data_model_1.namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))));
                rdf.push(data_model_1.quad(data_model_1.blankNode('r' + this.hoeveelheid), data_model_1.namedNode('https://w3id.org/tree#node'), data_model_1.namedNode('https://localhost:3000/crowdscan/' + (this.hoeveelheid + 1))));
            }
        };
        this.config = config;
        this.cr = new this.crowdscansource(this.config, this);
        this.readable = this.createRStream();
    }
    getStreamIfExists() {
        return this.readable;
    }
    createPage(p) {
        super.importPages(p);
    }
    createRStream() {
        let r = new stream_1.Readable();
        let cr = this.cr;
        let rdf;
        let tijd;
        let client = mqtt.connect('mqtt://data.crowdscan.be', {
            username: this.config['username'],
            password: process.env.CR
        }, (err) => {
            if (err)
                console.log("er is een error" + err.message);
        });
        client.on('connect', () => {
            console.log('connected to MQTT data broker');
        });
        client.subscribe(this.config['topic']);
        client.on('message', function (topic, message, packet) {
            tijd = new Date(JSON.parse(message)['header']['time']);
            rdf = cr.makeObservation(message);
            let val = Buffer.from(JSON.stringify(rdf));
            r.read = function () {
                return val;
            };
            r.unshift(val);
            r.push(val);
        });
        client.on('error', function (err) {
            console.log('error mqtt' + err);
        });
        return r;
    }
}
exports.mySource = mySource;
//# sourceMappingURL=crowdscanSource.js.map