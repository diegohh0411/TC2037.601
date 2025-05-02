export const permittedParams = <T extends string>(
  obj: Record<T, any>,
  requiredProps: T[],
  optionalProps: T[] = [],
): Record<T, any> => {
  console.log({ obj, requiredProps, optionalProps });

  const permitted = Object.entries(obj)
    .filter(([key, _value]) => {
      return requiredProps.includes(key as T) || optionalProps.includes(key as T);
    })
    .reduce((acc: Record<T, any>, [key, value]) => {
      acc[key as T] = value;
      return acc;
    }, {} as Record<T, any>);

  const missingRequiredProperties: string[] = requiredProps.filter(property => {
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

  console.log({ missingProperties: missingRequiredProperties })

  if (missingRequiredProperties.length > 0) {
    throw new Error(`Missing required properties: ${missingRequiredProperties.join(', ')}`);
  }

  return permitted;
};