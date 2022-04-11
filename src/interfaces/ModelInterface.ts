export interface Model<T> {
  create(objeto: T): Promise<T>
  read(): Promise<T[]>
  readOne(_id: string): Promise<T | null>
  update(_id: string, obj: T): Promise<T | null>
  delete(_id: string): Promise<T | null>
}
