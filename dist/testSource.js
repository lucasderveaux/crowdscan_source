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
const data_model_1 = require("@rdfjs/data-model");
class mySource extends basic_ldes_server_1.Source {
    constructor(config) {
        super(config);
        this.hoeveelheid = 2;
    }
    getPage(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let triples;
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
            triples.push(data_model_1.quad(data_model_1.namedNode('http://crowdscan.be/ns/ObservationShape'), data_model_1.namedNode("http://www.w3.org/1999/02/22-rdf-syntax-ns#type"), data_model_1.namedNode('http://www.w3.org/ns/shacl#NodeShape')));
            triples.push(data_model_1.quad(data_model_1.namedNode('http://crowdscan.be/ns/ObservationShape'), data_model_1.namedNode('http://www.w3.org/ns/shacl#targetClass'), data_model_1.namedNode('http://www.w3.org/ns/sosa/Observation')));
            triples.push(data_model_1.quad(data_model_1.namedNode('http://crowdscan.be/ns/ObservationShape'), data_model_1.namedNode('http://www.w3.org/ns/shacl#property'), data_model_1.blankNode('o')));
            //sh: 	http://www.w3.org/ns/shacl#
            //hasFeatureOfInterest
            triples.push(data_model_1.quad(data_model_1.blankNode('o'), data_model_1.namedNode('http://www.w3.org/ns/shacl#path'), data_model_1.namedNode('http://www.w3.org/ns/sosa/hasFeatureOfInterest')));
            triples.push(data_model_1.quad(data_model_1.blankNode('o'), data_model_1.namedNode('	http://www.w3.org/ns/shacl#maxCount'), data_model_1.literal('1', 'http://www.w3.org/2001/XMLSchema#integer')));
            triples.push(data_model_1.quad(data_model_1.blankNode('o'), data_model_1.namedNode('	http://www.w3.org/ns/shacl#minCount'), data_model_1.literal('1', 'http://www.w3.org/2001/XMLSchema#integer')));
            //observedProperty
            //resultTime
            //hasSimpleResult
            //phenomenonTime
            //madeBySensor
            const p = new basic_ldes_server_1.Page(triples, []);
            return p;
        });
    }
}
exports.mySource = mySource;
//# sourceMappingURL=testSource.js.map