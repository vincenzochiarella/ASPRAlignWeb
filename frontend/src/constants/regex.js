// eslint-disable-next-line
export const dotBracketNotation =  /[gaucAUGC]*(?:(?:\n)|(?:\r\n))[\.\[\]\(\)\{\}]+$/
// eslint-disable-next-line 
export const arcAnnotationSequence = /[gaucAUGC]*(?:(?:\n)|(?:\r\n))(\([0-9]+\,[0-9]+\)(\;?)+)$/

export const extensionTxt = /^[a-zA-Z0-9]+\.txt($|\n)/