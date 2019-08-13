
const createNode = new RegExp(/\(\"/, 'g')   // ("
const closeNode = new RegExp(/\"/, 'g')      // "
const noChilds = new RegExp(/,\ \[\]\)/, 'g')// , [])
const createChilds = new RegExp(/,\ \[/, 'g')// , [
const closeChilds = new RegExp(/\),/, 'g')   // ),
const closeChildsNoCom = new RegExp(/\}\]\)/, 'g')//)
const closeParents = new RegExp(/\)\]/, 'g') // )]

const distanceReg= new RegExp(/Distance = /, 'g')
const warningOrError = new RegExp(/(WARNING)+|(ERROR)+/, 'g')


function toJSONTree(out) {
    out = out.replace(createNode, '{ "name":"')        // convert (" in { name:'
        .replace(closeNode, '"')                 // convert " in '                       
        .replace(noChilds, "}")                // convert , [] in }
        .replace(createChilds, ', "children": [')   // convert , [ in , children: [
        .replace(closeChilds, "},")
        .replace(closeParents, "}]")
        .replace(closeChildsNoCom, "}]}")
    return out
}

function toJSONDistance(distance) {
    distance = distance.replace(distanceReg, '')
    return distance
}
function toJSONTreeAndDistance(data) {
    return [ toJSONTree(data[0]), toJSONDistance(data[1])]
}
function toJSONError(error) {
    error = error.replace(error, ' { "error": "')
        .concat('" }')
    return JSON.stringify(distance)
}
module.exports.parseToJSONTree = toJSONTree
module.exports.parseToJSONDistance = toJSONDistance
module.exports.parseToJSONTreeAndDistance = toJSONTreeAndDistance
