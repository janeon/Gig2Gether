export function setWindowProp(propName: string, value: unknown) {
  (window)[propName] = value
}