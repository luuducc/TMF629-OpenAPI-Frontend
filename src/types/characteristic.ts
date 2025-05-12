export enum RelationshipType {
  basetype, dependency, exclusion, inclusion, substitute, aggregation, association, derivedFrom
}
export enum ValueType {
  basetype, string, number, boolean, date, object, array, 
}
export interface CharacteristicRelationship {
  relationshipType: RelationshipType,
}

export type Characteristic = {
  characteristicRelationship: CharacteristicRelationship,
  name: string,
  valueType: ValueType
}