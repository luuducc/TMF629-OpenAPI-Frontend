export enum RelationshipType {
  dependency = 'dependency', 
  exclusion = 'exclusion', 
  inclusion = 'inclusion', 
  substitute = 'substitute', 
  aggregation = 'aggregation', 
  association = 'association', 
  derivedFrom = 'derivedFrom'
}
export enum ValueType {
  string = 'string', 
  number = 'number', 
  boolean = 'boolean', 
  date = 'date', 
  object = 'object', 
  array = 'array', 
}
export interface CharacteristicRelationship {
  relationshipType: RelationshipType | undefined,
}

export type Characteristic = {
  characteristicRelationship: CharacteristicRelationship,
  name: string,
  valueType: ValueType | undefined
}