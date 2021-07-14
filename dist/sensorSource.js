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
            let environment = 'gent_langemunt';
            triples.push(data_model_1.quad(data_model_1.namedNode('https://production.crowdscan.be/dataapi/public/ldes'), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('https://w3id.org/ldes#EventStream')));
            triples.push(data_model_1.quad(data_model_1.namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'), data_model_1.namedNode('https://w3id.org/tree#member'), data_model_1.namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1')));
            triples.push(data_model_1.quad(data_model_1.namedNode('https://production.crowdscan.be/dataapi/gent/environments/evenstream'), data_model_1.namedNode('https://w3id.org/tree#member'), data_model_1.namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1')));
            //feature of Interest
            triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('http://www.w3.org/ns/sosa/FeatureOfInterest')));
            triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'), data_model_1.namedNode('http://purl.org/dc/terms/isVersionOf'), data_model_1.namedNode('https://crowdscan.be/id/environment/gent/' + environment)));
            //property geometry
            //kleine g
            //Associates any resource with the corresponding geometry.
            triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/environment/gent/' + environment + '_v1'), data_model_1.namedNode('http://www.w3.org/ns/locn#geometry'), data_model_1.blankNode('locn')));
            //class Geometry
            //eometry class provides the means to identify a location as a point, 
            //line, polygon, etc. expressed using coordinates in some coordinate 
            //reference system.
            triples.push(data_model_1.quad(data_model_1.blankNode('locn'), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('http://www.w3.org/ns/locn#Geometry')));
            triples.push(data_model_1.quad(data_model_1.blankNode('locn'), data_model_1.namedNode('http://www.opengis.net/ont/geosparql#'), data_model_1.literal('<http://www.opengis.net/def/crs/OGC/1.3/CRS84> MULTILINESTRING(3.722529868069784 51.0558306603255,3.7227900423442284 51.055989138119095,3.7232138313685814 51.05633306678402,3.7234531765417023 51.05656270707058,3.723467216505414 51.05655720363685,3.7232311821121034 51.05632960517266,3.722983077778226 51.05611886485648,3.722796837235518 51.055970636405476,3.722544709588118 51.05582058823546,3.722529868069784 51.0558306603255)', data_model_1.namedNode('http://www.opengis.net/ont/geosparql#wktLiteral'))));
            //sensoren aanmaken
            triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1'), data_model_1.namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'), data_model_1.namedNode('http://www.w3.org/ns/sosa/Sensor')));
            triples.push(data_model_1.quad(data_model_1.namedNode('https://crowdscan.be/id/sensor/gent/' + environment + '_v1'), data_model_1.namedNode('http://purl.org/dc/terms/isVersionOf'), data_model_1.namedNode('https://crowdscan.be/id/sensor/gent/' + environment)));
            const p = new basic_ldes_server_1.Page(triples, []);
            return p;
        });
    }
}
exports.mySource = mySource;
//# sourceMappingURL=sensorSource.js.map