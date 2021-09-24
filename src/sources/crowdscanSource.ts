import { Source } from '@treecg/basic-ldes-server';
import { DatabaseFactory } from '../models/DatabaseFactory';
import type * as RDF from 'rdf-js';
import { Page } from '../lib/Page';
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
  public route: string;

  constructor(config: object, instance: interpreterInstance) {
    super(config);
    this.instance = instance;
    this.readFile();
    this.pointer = 1;
  }

  getVersion(): string {
    let last = this.route.lastIndexOf('/');
    return this.route.substring(last + 1, last + 3);
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

  public async destroyPage(id: any) {
    await this.databaseModel.destroy({ where: { id: Number.parseInt(id) } });
  }

  async importPageWithoutIndex(page: Page): Promise<void> {
    let amountString = await this.databaseModel.count();
    let amount = Number.parseInt(amountString);
    if (amount >= this.maxCount) {
      await this.destroyPage(this.pointer);
      this.pointer++;
    }

    let pageJSON = JSON.stringify(page.serialize())

    //id van de laatste entry vinden
    let latest = await this.getFinalEntry();
    if (latest != null) {
      amount = latest;
    }

    let id = (amount + 1).toString();
    amount++;


    await this.databaseModel.create({ id: id, page: pageJSON });


  }

  async getFinalEntry(): Promise<any> {
    let latest = await this.databaseModel.findOne({
      order: [['id', 'DESC']]
    });

    if (latest == null) {
      return null;
    } else {
      return Number.parseInt(latest.id);
    }
  }


  async getPage(id: any): Promise<Page> {
    let ID = Number.parseInt(id) + this.pointer - 1;
    let response = await this.databaseModel.findByPk(ID, {
      //rejectOnEmpty: true,
    });
    if (response == null) {
      return null;
    }
    let parsed = JSON.parse(response.page);
    let page_ = this.deserializePage(parsed);

    return page_;
  }


  public deserializePage(json: object): Page {
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
  abstract appendElement(data: any);
}