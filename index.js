import convertAPI from 'convertapi'
import path from 'path'


const convert = new convertAPI('6AcXypHScIxfbSj6')
var __dirname = path.resolve()

process.argv.forEach((file, index) => {
    if (index == 0 || index == 1) return
    convert.convert('pdf', { File: `${__dirname}/documents/${file}.pdf` })
        .then(function(result) {
            // get converted file url
            console.log("Converted file url: " + result.file.url)
            // save to file
            return result.file.save(`output/${file}-compressed.pdf`)
        })
        .then(function(file) {
            console.log("File saved: " + `${file}-compressed.pdf`)
        })
        .catch(function(err) {
            console.error(err.toString())
        })
})