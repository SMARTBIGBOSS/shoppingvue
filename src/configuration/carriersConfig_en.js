let carriersMap = {
  '4px': '4PX',
  'yunda': 'Yunda Express',
  'zto': 'ZTO Express',
  'yto': 'YTO Express',
  'ups': 'UPS'
}

function findCarrier (obj, value, compare = (a, b) => a === b) {
  return Object.keys(obj).find(k => compare(obj[k], value))
}

export {carriersMap, findCarrier}
