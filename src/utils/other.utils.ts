export const permittedParams = <T>(obj: object, properties: string[]): T => {
  console.log({ obj })

  const permitted = Object.entries(obj)
    .filter(([key]) => properties.includes(key))
    .reduce((acc: any, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  console.log({ permitted })

  const missingProperties: string[] = properties.filter(property => {
    return !permitted[property];
  });

  console.log({ missingProperties })

  if (missingProperties.length > 0) {
    throw new Error(`Missing required properties: ${missingProperties.join(', ')}`);
  }

  return permitted as T;
};