module.exports = Slicer = (text, startIndex=0, lastIndex) => {  
    const sliced = text.slice(startIndex, lastIndex).toUpperCase()
    return sliced
}

