import { AppRunner, Source } from '@treecg/basic-ldes-server';
import { DatabaseFactory } from '../models/DatabaseFactory';
import { posix, win32 } from 'path';
import interpreterInstance from '../sources/Interpreter/InterpreterInstance';


export class CrowdscanAppRunner extends AppRunner {

  constructor() {
    super();
  }

  initializeSources(config: string): Map<String, Source> {
    // should be done based on the config
    let configuration = JSON.parse(config);
    let sourceMap: Map<String, Source> = new Map()
    let db = new DatabaseFactory(configuration['db']['host']);

    let instance: interpreterInstance = new interpreterInstance(configuration);

    configuration['sources'].forEach(element => {
      let route: String = element['route'];
      let locationOfSource = this.resolveFilePath(element['sourceFile']);
      let MySource = require(locationOfSource).mySource;

      let config = element;
      config['entrypoint'] = configuration['entrypoint'] || 'localhost';
      let mySource: Source = new MySource(config, instance);

      if (element['usesImportPages'] != null && element['usesImportPages']) {
        mySource.setDatabaseModel(db.createTable(element['route']));
      }
      sourceMap.set(route, mySource);
    });

    return sourceMap;
  }

  resolveFilePath(cwdPath?: string | null, modulePath = ''): string {
    return typeof cwdPath === 'string' ?
      this.absoluteFilePath(cwdPath) :
      this.joinFilePath(__dirname, '../../', modulePath);
  }

  absoluteFilePath(path: string): string {
    if (posix.isAbsolute(path)) {
      return path;
    }
    if (win32.isAbsolute(path)) {
      return this.windowsToPosixPath(path);
    }

    return this.joinFilePath(process.cwd(), path);
  }

  joinFilePath(basePath: string, ...paths: string[]): string {
    return posix.join(this.windowsToPosixPath(basePath), ...paths);
  }

  windowsToPosixPath(path: string): string {
    return path.replace(/\\+/gu, '/');
  }

}