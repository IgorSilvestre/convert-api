const { secretKey } = require('./config.json')
const convertAPI = require('convertapi')(secretKey)

process.argv.forEach((file, index) => {
    if (index == 0 || index == 1) return
    
    convertAPI.convert('pdf', { File: `${__dirname}/documents/${file}.pdf` })
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