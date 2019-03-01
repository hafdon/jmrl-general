
const fs = require('fs')

const dataPath = './dataIn/converted.json'
const jqueryPath = './dataIn/jquery.json'
// synchronous use of fs, since grabbing locally
const obj = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const jquery = JSON.parse(fs.readFileSync(jqueryPath, 'utf8'));

function jsontojquery() {

/*     return new Promise( async (resolve, reject) => {
        try {

            console.log('here')
            console.log(obj[0])

            resolve(true)
        } catch (err) {
            reject(err)
        }
    }) */

    console.log(obj[0])

    const _ids = {
        barcodes : [],
        recnums : []
    }

    let ids = obj.reduce( (accum, {id}, index, array) => {

        if (id.length === 7) {
            accum.recnums.push( 'p' + id)
        } else {
            accum.barcodes.push(id)
        }
        return accum

    }, _ids)

/*     console.log('ids')
    console.log(ids.barcodes[0])
    console.log(ids.recnums[0]) */

    console.log(jquery.queries[0])

    jquery.queries[0].expr[0].operands = _ids.barcodes
    jquery.queries[2].expr[0].operands = _ids.recnums

    const jqueryString = JSON.stringify(jquery, null, 2)

    // synchronous
    fs.writeFile('./dataOut/jquery.txt', jqueryString, (err, jqueryString) => {
        if (err) console.log(err);
        console.log("Successfully written to file")
    })

}

jsontojquery()