import { namedNode, blankNode, literal, quad, triple } from "@rdfjs/data-model";
import { Quad } from "rdf-js";
import AInterpreter from "./AInterpreter";
import IInterpreter from "./IInterpreter"
import interpreterInstance from "./InterpreterInstance";

export default class CatalogInterpreter extends AInterpreter {
  constructor(config: string, interpreterParent: interpreterInstance) {
    super(config, interpreterParent);
  }
  public createMetadata(data: any, triples: Quad[]): void {
    let tijd = new Date(Date.now());

    //catalog
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#Catalog')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public'),
        namedNode('http://purl.org/dc/terms/title'),
        literal('Catalog for Crowdscan Data', 'en')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public'),
        namedNode('http://www.w3.org/ns/dcat#dataset'),
        namedNode('https://production.crowdscan.be/feed/public/dataset-zones')
      )
    );
    triples.push(
      quad(
        namedNode('http://production.crowdscan.be/feed/public'),
        namedNode('http://www.w3.org/ns/dcat#dataset'),
        namedNode('https://production.crowdscan.be/feed/public/dataset-observations')
      )
    );

    //dataset zones
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/dataset-zones'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#Dataset')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/dataset-zones'),
        namedNode('http://purl.org/dc/terms/title'),
        literal('Dataset for crowdscans\' environments and their zones', 'en')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/dataset-zones'),
        namedNode('http://purl.org/dc/terms/issued'),
        literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );

    //dataset observaties
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/dataset-observations'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#Dataset')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/dataset-observations'),
        namedNode('http://purl.org/dc/terms/title'),
        literal('Dataset for the observations made by crowdscan', 'en')
      )
    );

    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/dataset-obversations'),
        namedNode('http://purl.org/dc/terms/issued'),
        literal(tijd.toISOString(), namedNode('http://www.w3.org/2001/XMLSchema#dateTime'))
      )
    );

    //zone-service
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/zone-service'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#DataService')
      )
    );
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/zone-service'),
        namedNode('http://www.w3.org/ns/dcat#servesDataset'),
        namedNode('https://production.crowdscan.be/feed/public/dataset-zones')
      )
    );
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/zone-service'),
        namedNode('http://purl.org/dc/terms/conformsTo'),
        namedNode('https://w3id.org/ldes/specification')
      )
    );


    //observations-service 
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/observations-service'),
        namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
        namedNode('http://www.w3.org/ns/dcat#DataService')
      )
    );
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/observations-service'),
        namedNode('http://www.w3.org/ns/dcat#servesDataset'),
        namedNode('https://production.crowdscan.be/feed/public/dataset-observations')
      )
    );
    triples.push(
      quad(
        namedNode('https://production.crowdscan.be/feed/public/observations-service'),
        namedNode('http://purl.org/dc/terms/conformsTo'),
        namedNode('https://w3id.org/ldes/specification')
      )
    );

  }
  getShacl(triples: Quad[]): void {
    throw new Error("Method not implemented.");
  }
  interpret(data: any[], triples: Quad[]): void {

    /*
      [what, URL fo LDES,environment]    
    */
    if (data[0] == 'zones') {
      triples.push(
        quad(
          namedNode('https://production.crowdscan.be/feed/public/zone-service'),
          namedNode('http://www.w3.org/ns/dcat#subject'),
          namedNode(data[1])
        )
      );
      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://w3id.org/ldes#Eventstream')
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('http://purl.org/dc/terms/title'),
          literal('LDES of the ' + data[0] + 'that exist withing crowdscan', 'en')
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('https://w3id.org/tree#shape'),
          namedNode(data[1] + '/shape.ttl')
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('https://w3id.org/tree#view'),
          namedNode(data[1] + '/1')
        )
      );

    } else if (data[0] == 'observations') {
      triples.push(
        quad(
          namedNode('https://production.crowdscan.be/feed/public/observations-service'),
          namedNode('http://www.w3.org/ns/dcat#subject'),
          namedNode(data[1])
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('http://www.w3.org/1999/02/22-rdf-syntax-ns#type'),
          namedNode('http://w3id.org/ldes#Eventstream')
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('http://purl.org/dc/terms/title'),
          literal('LDES of the ' + data[0] + ' from crowdscan in the environment of ' + data[2], 'en')
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('https://w3id.org/tree#shape'),
          namedNode(data[1] + '/shape.ttl')
        )
      );

      triples.push(
        quad(
          namedNode(data[1]),
          namedNode('https://w3id.org/tree#view'),
          namedNode(data[1] + '/1')
        )
      );
    }
  }


  createHyperMedia(relations: any[], triples: Quad[]): void {
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