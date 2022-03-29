export class GlobalUtils {
  static joinArray = <T>(data: T[], separator = ',') => {
    return data.join(separator);
  };

  static splitString = (data: string, separator = ',') => {
    return data.split(separator);
  };

  static removeDuplicateArrayRecords = (array, field: string) => {
    return array
      .filter((el) => !!el)
      .filter((v, i, a) => !!v[field] && a.findIndex((t) => t[field] === v[field]) === i);
  };
}
