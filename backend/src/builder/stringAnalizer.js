
const createNode = new RegExp(/\(\"/,'g')   // ("
const closeNode = new RegExp(/\"/,'g')      // "
const noChilds = new RegExp(/,\ \[\]\)/,'g')// , [])
const createChilds = new RegExp(/,\ \[/,'g')// , [
const closeChilds = new RegExp(/\),/,'g')   // ),
const closeChildsNoCom = new RegExp(/\}\]\)/,'g')//)
const closeParents = new RegExp(/\)\]/,'g') // )]
module.exports.parseToJSONTree = function toJSONTree ( out ) {       
    out = out.replace(createNode,"{ name:'")        // convert (" in { name:'
            .replace(closeNode,"'")                 // convert " in '                       
            .replace(noChilds, "}")                // convert , [] in }
            .replace(createChilds,", children: [")   // convert , [ in , children: [
            .replace(closeChilds,"},")
            .replace(closeParents,"}]")
            .replace(closeChildsNoCom,"}]}")
    return out
}