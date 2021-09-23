import { Sequelize, DataTypes } from 'sequelize';

export class DatabaseFactory {
  private db: Sequelize;

  constructor(host: string) {
    this.db = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:'
    });


  }

  async createTable(tableName: string): Promise<any> {
    let databaseModel = await this.db.define(tableName, {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      page: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      // Other model options go here
      timestamps: false,
    });

    await databaseModel.sync({ force: true });

    return databaseModel;
  }

}