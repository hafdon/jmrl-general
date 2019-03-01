const fs = require('fs')
const Json2csvParser = require('json2csv').Parser;

const circDataPath = './dataIn/converted.json'
const patronDataPath = './dataIn/patronInfo.json'


// synchronous use of fs, since grabbing locally
const circObj = JSON.parse(fs.readFileSync(circDataPath, 'utf8'));
const patronObj = JSON.parse(fs.readFileSync(patronDataPath, 'utf8'));

function main() {

    console.log('circObj[0]')
    console.log(circObj[0])



    // TODO : get unique vendor values by using Set and destructuring and map
    const uniqueVendorCodes = ['od', 'recbk', 'freading'];

    const mappedPatronObj = patronObj.map( value => ({
        barcode : value["P BARCODE"],
        ptype: value["P TYPE"],
        homelib :value["HOME LIBR"],
        recnum: value["RECORD #"].substr(1,7)
    }))

    console.log('mappedPatronObj')
    console.log(mappedPatronObj[0])

    var test = 0;
    var test2 = 0;

    const patronCircData = circObj.map( 
        ({id, checkouts, vendor, rundate, month, year}) => {

            // always returns an array of objects, even if just 1
            const matchingPatronRecords = mappedPatronObj.filter( ({recnum, barcode}) => {
/*                 if (test2 < 15) {
                    console.log('filtering mapped patrons')
                    console.log(id, recnum, barcode)
                    test2++
                } */

                return (id === recnum || id === barcode) 
            })

/*             if (test < 5) {
                console.log('matches found')
                console.log(matchingPatronRecords)
                test++
            } */
/* 
            fs.appendFile('./matchingPatrons.json', JSON.stringify(matchingPatronRecords), (err, data) => {
                if (err) console.log(err)
                console.log('written successfully')
            }) */
            
            if (matchingPatronRecords.length === 0) {
                return {
                    status : "notfound",
                    id : id,
                    checkouts: checkouts,
                    vendor: vendor,
                    rundate: rundate,
                    month: month,
                    year: year
                }
            }

            return {
                status: "found",
                barcode: matchingPatronRecords[0].barcode,
                recnum: matchingPatronRecords[0].id,
                homelib: matchingPatronRecords[0].homelib,
                ptype: matchingPatronRecords[0].ptype,
                circTotal: checkouts,
/*                 circByVendor: {
                    od: 0,
                    recbk: 0,
                    freading: 0
                }, */
                circByVendor: { [vendor] : checkouts},
                rundate : rundate,
                runperiod : {
                    year : year,
                    period : month
                }
            }



    })

    fs.writeFile('./dataOut/patronCircData.json', JSON.stringify(patronCircData), (err, data) => {
        if (err) console.log(err)
        console.log('written successfully')
    }) 



    const stubPatronCircData = patronCircData.map( ({barcode, ptype, circTotal})=> ({
        barcode : barcode,
        ptype: ptype,
        circ: circTotal
    }))

/*
CONVERT TO CSV AND WRITE TO FILE

*/
    const fields = ['barcode', 'ptype', 'circ'];
    const opts = { fields };
     

    /**
     * you can also use the convenience method parse

const json2csv = require('json2csv').parse;
const fields = ['field1', 'field2', 'field3'];
const opts = { fields };
 
try {
  const csv = json2csv(myData, opts);
  console.log(csv);
} catch (err) {
  console.error(err);
}
     */
    try {
        const parser = new Json2csvParser(opts);
        const csv = parser.parse(stubPatronCircData);

        fs.writeFile('./dataOut/stubPatronCircData.csv', csv, (err, data) => {
            if (err) console.log(err)
            console.log('written successfully')
        })
        console.log('successful convert to csv');
    } catch (err) {
        console.error(err);
    }


    /**
     * PIPE: CREATE OVERVIEW
     */
    let uniquePtypes = [ ...new Set(patronCircData.map( ({ptype}) => {
        return ptype
    }).filter( (el)=> {
        return el !== undefined
    }))]

    uniquePtypes = uniquePtypes.map(el=> {
        return {
            ptype: el,
            circulation : +0
        }
    })

/*     
    console.log('uniquePtypes')
    console.log(uniquePtypes) */

    const totalCircByPtype = patronCircData.reduce( (accum, {ptype: patronPtype, circTotal}) => {
        accum.forEach( ({ptype: globalPtype}, index) => {
            if (globalPtype === patronPtype) {
                accum[index].circulation += +circTotal
                return accum
            }
        })
        return accum
    }, uniquePtypes)

    console.log('totalCircByPtype')
    console.log(totalCircByPtype)

    const uniqueJurisdictions = [ {
        jurisdiction : 'Albemarle',
        circulation: +0,
        ptypes : [0,1,12]
    },{
        jurisdiction : 'Charlottesville',
        circulation: +0,
        ptypes : [2,3,13]
    },{
        jurisdiction : 'Greene',
        circulation: +0,
        ptypes : [4,5,14]
    },{
        jurisdiction : 'Louisa',
        circulation: +0,
        ptypes : [6,7,15]
    },{
        jurisdiction : 'Nelson',
        circulation: +0,
        ptypes : [8,9,16]
    },{
        jurisdiction : 'OA',
        circulation: +0,
        ptypes : [10,11,17]
    }, {
        jurisdiction : 'Staff',
        circulation: +0,
        ptypes : [18,19,20,21,22]
    }]

    console.log('uniqueJurisdictions')
console.log(uniqueJurisdictions)

    const circByJurisdictions = totalCircByPtype.reduce( (accum, {ptype, circulation}) => {

        accum.forEach( ({ptypes}, index) => {
            if (ptypes.includes(+ptype)) {
                accum[index].circulation += +circulation
                return accum
            }
        })
        return accum
    }, uniqueJurisdictions)


const stubCircByJurisdictions = circByJurisdictions.map (({jurisdiction, circulation}) => ({
    jurisdiction : jurisdiction,
    circulation : circulation
}))

console.log('stubCircByJurisdictions')
console.log(stubCircByJurisdictions)
    
}
main()