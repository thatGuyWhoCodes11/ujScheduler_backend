
function headerParser(headers) {
    let headersParsed = {}
    for (var pair of headers.entries()) {
        let entry = pair[0]
        let value = pair[1]
        if (headersParsed.hasOwnProperty(entry))
        headersParsed[entry] = headersParsed[entry] + ';' + value
        else
        headersParsed[entry] = value
    }
    return headersParsed
}
module.exports = headerParser