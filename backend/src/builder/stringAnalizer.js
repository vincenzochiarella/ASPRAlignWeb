
const createNode = new RegExp(/\(\"/, 'g')   // ("
const closeNode = new RegExp(/\"/, 'g')      // "
const noChilds = new RegExp(/,\ \[\]\)/, 'g')// , [])
const createChilds = new RegExp(/,\ \[/, 'g')// , [
const closeChilds = new RegExp(/\),/, 'g')   // ),
const closeChildsNoCom = new RegExp(/\}\]\)/, 'g')//)
const closeParents = new RegExp(/\)\]/, 'g') // )]

const fixForAlign = new RegExp(/\d\}/, 'g')

const distanceReg = new RegExp(/Distance = /, 'g')
//const warningOrError = new RegExp(/(WARNING)+|(ERROR)+/, 'g')

function replaceAt (string, index, replacement) {
    return string.substr(0, index) + replacement+ string.substr(index + replacement.length);
}


function toJSONTree(out) {
    out = out.replace(createNode, '{ "name":"')        // convert (" in { name:'
        .replace(closeNode, '"')                 // convert " in '                       
        .replace(noChilds, "}")                // convert , [] in }
        .replace(createChilds, ', "children": [')   // convert , [ in , children: [
        .replace(closeChilds, "},")
        .replace(closeParents, "}]")
        .replace(closeChildsNoCom, "}]}")
    
    return fixAlignTree( out )
}

// Fix for alignment generation json tree
function fixAlignTree( tree ) {
    var array1;
    while ((array1 = fixForAlign.exec(tree) !== null)){
        tree = replaceAt(tree, fixForAlign.lastIndex -1, ')')
    }
    return tree
}
function toJSONDistance(distance) {
    distance = distance.replace(distanceReg, '')
    return distance
}
function toJSONTreeAndDistance(data) {
    return [toJSONTree(data[0]), toJSONDistance(data[1])]
}
// function toJSONError(error) {
//     error = error.replace(error, ' { "error": "')
//         .concat('" }')
//     return JSON.stringify(distance)
// }
module.exports.parseToJSONTree = toJSONTree
module.exports.parseToJSONDistance = toJSONDistance
module.exports.parseToJSONTreeAndDistance = toJSONTreeAndDistance
