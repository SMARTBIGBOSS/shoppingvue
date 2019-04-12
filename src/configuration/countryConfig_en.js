let countryMap = {
  AL: 'Albania',
  DZ: 'Algeria',
  C2: 'China',
  IE: 'Ireland'
}

function findContry (obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}

export {countryMap, findContry}
