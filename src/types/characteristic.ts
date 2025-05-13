export enum RelationshipType {
  dependency, exclusion, inclusion, substitute, aggregation, association, derivedFrom
}
export enum ValueType {
  string, number, boolean, date, object, array, 
}
export interface CharacteristicRelationship {
  relationshipType: RelationshipType | undefined,
}

export type Characteristic = {
  characteristicRelationship: CharacteristicRelationship,
  name: string,
  valueType: ValueType | undefined
}