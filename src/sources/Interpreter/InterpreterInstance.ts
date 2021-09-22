import SensorInterpreterV1 from "./ZoneInterpreterV1";
import ObservationV1 from "./ObservationV1";
import { crowdscanSource } from "../crowdscanSource";


export default class interpreterInstance {

  private catalog: crowdscanSource = null;
  private zones: crowdscanSource = null;

  private config: string;

  constructor(config) {
    this.config = config;
  }

  public async appendZone(zones: crowdscanSource) {
    this.zones = zones;

    //createDatabase
    await this.zones.createDatabase(this.config['db']['host'], 'zones');

    //giveInterpreter
    this.zones.setInterpreter(new SensorInterpreterV1());

    //moet weg
    await this.zones.createPages();
  }

  public async appendCatalog(catalog: crowdscanSource) {
    this.catalog = catalog;

    //createDatabase
    await this.catalog.createDatabase(this.config['db']['host'], 'catalog');

    //giveInterpreter

    //moet weg
    await this.catalog.createPages();
  }

  public giveZones() {
    //not implemented yet
  }

  public async appendObservation(observation: crowdscanSource, tableName: string) {
    //appendObservations

    //maak databank aan
    await observation.createDatabase(this.config['db']['host'], tableName);

    //geefInterpreter
    observation.setInterpreter(new ObservationV1());

    //createRstream
    observation.createPages();
  }
}