import {
  assert,
  coerce,
  nullable,
  number,
  optional,
  string,
  Struct,
  type Describe,
} from "superstruct";

export function optionull<U, V>(t: Struct<U, V>): Struct<U | null | undefined, V> {
  return optional(nullable(t));
}

export const ToInt = coerce(number(), string(), value => parseInt(value));

export function parseFormData<T>(fd: FormData, parser: Describe<T>): T {
  const object = formDataToRecord(fd);
  assert(object, parser);
  return object;
}

function formDataToRecord(fd: FormData): Record<string, string> {
  let object: Record<string, string> = {};
  fd.forEach((value, key) => {
    object[key] = value.toString();
  });
  return object;
}
