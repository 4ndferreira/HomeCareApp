import {
  DataSource,
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  ObjectLiteral,
  Repository
} from "typeorm";

export abstract class BaseRepository<T extends ObjectLiteral> {
  protected repo: Repository<T>;

  constructor(protected dataSource: DataSource, entity: new () => T) {
    this.repo = dataSource.getRepository(entity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T | null> {
    return await this.repo.findOne(options);
  }

  async createAndSave(entityData: DeepPartial<T>): Promise<T> {
    const entity = this.repo.create(entityData);
    return await this.repo.save(entity);
  }
  async update(
    id: number,
    entityData: Partial<T>
  ): Promise<boolean> {
    const result = await this.repo.update(id, entityData);
    return result.affected !== 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repo.delete(id);
    return result.affected !== 0;
  }
}
