import { Source, Page } from '@treecg/basic-ldes-server';
import { DatabaseFactory } from '../models/DatabaseFactory';
import type * as RDF from 'rdf-js';
import * as RdfString from "rdf-string";
import * as fs from 'fs';
import interpreterInstance from './Interpreter/InterpreterInstance';
import IInterpreter from './Interpreter/IInterpreter';


export abstract class crowdscanSource extends Source {

  public databaseModel;
  public publicConfig;
  private maxCount: number = 1000000; //default is 1000000
  pointer: number;
  public instance: interpreterInstance;

  constructor(config: object, instance: interpreterInstance) {
    super(config);
    this.instance = instance;
    this.readFile();
    this.pointer = 1;
  }

  async readFile() {
    let config = await fs.promises.readFile('./config/config.json', 'utf8');
    this.publicConfig = JSON.parse(config);
    this.maxCount = this.publicConfig['db']['maxCount'];
  }

  async createDatabase(host: string, tableName: string): Promise<void> {
    let databasefactory = new DatabaseFactory(host);
    let db = await databasefactory.createTable(tableName);

    this.setDatabaseModel(db);
  }

  setDatabaseModel(databaseModel): void {
    this.databaseModel = databaseModel;
  }

  async importPageWithoutIndex(page: Page): Promise<void> {
    let amountString = await this.databaseModel.count();
    let amount = Number.parseInt(amountString);
    if (amount >= this.maxCount) {
      await this.databaseModel.destroy({ where: { id: this.pointer } });
      this.pointer++;
    }

    let pageJSON = JSON.stringify(page.serialize())

    //id van de laatste entry vinden
    let latest = await this.databaseModel.findOne({
      order: [['id', 'DESC']]
    });
    if (latest != null) {
      amount = Number.parseInt(latest.id);

    }

    let id = (amount + 1).toString();
    amount++;

    console.log("de ID is:" + amount);
    await this.databaseModel.create({ id: id, page: pageJSON });


  }


  async getPage(id: any): Promise<Page> {
    let ID = Number.parseInt(id) + this.pointer - 1;
    let response = await this.databaseModel.findByPk(ID, {
      //rejectOnEmpty: true,
    });
    if (response == null) {
      return new Page([], []);
    }
    let parsed = JSON.parse(response.page);
    let page_ = this.deserializePage(parsed);

    return page_;
  }


  private deserializePage(json: object): Page {
    let triples: RDF.Quad[] = [];
    let metadata: RDF.Quad[] = [];

    json['triples'].forEach(quad_ => {
      triples.push(RdfString.stringQuadToQuad(quad_))
      //triples.push(quad(namedNode(quad_['subject']['value']), namedNode(quad_['predicate']['value']), namedNode(quad_['object']['value'])))
    });
    json['metadata'].forEach(quad_ => {
      metadata.push(RdfString.stringQuadToQuad(quad_))
      //metadata.push(quad(namedNode(quad_['subject']['value']), namedNode(quad_['predicate']['value']), namedNode(quad_['object']['value'])))
    });

    return new Page(triples, metadata);
  }

  abstract createPages();
  abstract setInterpreter(interpreter: IInterpreter);
}