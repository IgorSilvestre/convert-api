#!/usr/bin/env node
const { secretKey } = require('./config.json')
const convertAPI = require('convertapi')(secretKey)

function getFileName (path) {
    const regex = /[^\\\/]+(?=\.pdf$)/gm
    return regex.exec(path)[0]
}
function getPath (path) {
    const regex = /.+[\/$]/gm
    return regex.exec(path)[0]
}

process.argv.forEach((file, index) => {
    if (index == 0 || index == 1) return

    const filePath = getPath(file)
    const fileName = getFileName(file)

    convertAPI.convert('pdf', { File: file.toString() })
        .then(result => {
            // get converted file url
            console.log("Converted file url: " + result.file.url)
            // save to file
            return result.file.save(`${filePath}/${fileName}-compressed.pdf`)
        })
        .then(_ => {
            console.log("File saved: " + `${filePath}/${fileName}-compressed.pdf`)
        })
        .catch(err => {
            console.error(err.toString())
        })
})
