import SensorInterpreterV1 from "./ZoneInterpreterV1";
import ObservationV1 from "./ObservationV1";
import { crowdscanSource } from "../crowdscanSource";
import CatalogInterpreter from "./catalogInterpreter";


export default class interpreterInstance {

  private catalog: crowdscanSource = null;
  private zones: crowdscanSource = null;

  private config: string;

  constructor(config) {
    this.config = config;

  }

  public async appendZone(zones: crowdscanSource) {
    this.zones = zones;
  }

  public async createZonePages() {
    while (this.zones == null && this.catalog == null) {
      setTimeout(() => { console.log('slight delay for zones to start') }, 2000);
    }
    //createDatabase
    await this.zones.createDatabase(this.config['db']['host'], 'zones');

    // not necesarry yet because there's only one interpreter

    // let version:string = this.zones.getVersion();
    // if(version =='v1'){
    // ...



    //giveInterpreter
    this.zones.setInterpreter(new SensorInterpreterV1(this.config, this));

    this.zones.createPages();

  }

  public async appendCatalog(catalog: crowdscanSource) {
    this.catalog = catalog;

    //createDatabase
    await this.catalog.createDatabase(this.config['db']['host'], 'catalog');

    //giveInterpreter
    this.catalog.setInterpreter(new CatalogInterpreter(this.config, this));
  }



  public giveZones(environment: string, amount: Number) {
    //not implemented yet
    this.zones.appendElement([environment, amount]);
  }

  public giveSubjects(data: any[]) {
    this.catalog.appendElement(data);
  }

  public async appendObservation(observation: crowdscanSource, tableName: string) {

    //maak databank aan
    await observation.createDatabase(this.config['db']['host'], tableName);

    //geefInterpreter
    observation.setInterpreter(new ObservationV1(this.config, this));

    while (this.zones == null && this.catalog == null) {
      setTimeout(() => { console.log('slight delay for catalog and zones to start') }, 2000);
    }
    observation.createPages();
  }
}