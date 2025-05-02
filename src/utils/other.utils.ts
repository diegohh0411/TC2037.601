interface ObjectMap {
  [key: string]: any;
}

export const permittedParams = <T>(obj: ObjectMap, properties: string[]): T => {
  const permitted = Object.entries(obj)
    .filter(([key]) => properties.includes(key))
    .reduce((acc: ObjectMap, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as ObjectMap);

  const missingProperties: string[] = properties.filter(
    property => !Object.prototype.hasOwnProperty.call(permitted, property)
  );
  if (missingProperties.length > 0) {
    throw new Error(`Missing required properties: ${missingProperties.join(', ')}`);
  }

  return permitted as T;
};