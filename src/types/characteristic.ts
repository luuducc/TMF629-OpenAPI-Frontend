export enum RelationshipType {
  dependency = 'dependency',
  exclusion = 'exclusion',
  inclusion = 'inclusion',
  substitute = 'substitute',
  aggregation = 'aggregation',
  association = 'association',
  derivedFrom = 'derivedFrom',
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
  relationshipType: RelationshipType
}
export type Characteristic = {
  characteristicRelationship: CharacteristicRelationship
  name: string
  valueType: ValueType
}
export const relationshipOptions: { name: string; type: RelationshipType }[] =
  Object.values(RelationshipType).map((value) => ({
    name: value,
    type: value,
  }))
export const relationshipValueOptions: { name: string; type: ValueType }[] =
  Object.values(ValueType).map((value) => ({
    name: value,
    type: value,
  }))
