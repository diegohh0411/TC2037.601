export const permittedParams = <T extends string>(
  obj: Record<T, any>,
  properties: T[]
): Record<T, any> => {
  const permitted = Object.entries(obj)
    .filter(([key, _value]) => properties.includes(key as T))
    .reduce((acc: Record<T, any>, [key, value]) => {
      acc[key as T] = value;
      return acc;
    }, {} as Record<T, any>);

  const missingProperties: string[] = properties.filter(property => {
    switch (typeof obj[property]) {
      case 'string':
        return obj[property].length === 0;
      case 'number':
        return isNaN(obj[property]);
      case 'object':
        if (Array.isArray(obj[property])) {
          return obj[property].length === 0;
        } else if (obj[property] === null) {
          return true;
        }
        break;
      default:
        return false;
    }
  });

  console.log({ missingProperties })

  if (missingProperties.length > 0) {
    throw new Error(`Missing required properties: ${missingProperties.join(', ')}`);
  }

  return permitted;
};