
const fs = require('fs')
const fyData = require('./fund_distro_fy2019_prod.json')

console.log('starting')

let locFundLines = [];

function count(str, c) {
    var result = 0, i = 0;
    for (i; i < str.length; i++)if (str[i] == c) result++;
    return result;
};

function writeToFile( { filename, data}) {
    const datastring = JSON.stringify(data, null, 2)
    
    fs.writeFile(filename, datastring, function(err, datastring){
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
}



fyData.forEach(
    ({ recnum, fund, loc, pAmt, copies }) => {

        let costPerItem = pAmt / copies;

        /**
         * TODO : REFACTOR
         */
        let locArray = []
        if (count(loc, '.') === 0) {
            locArray.push(loc)
        } else {
            locArray = loc.split('.')
        }


        let fundArray = []
        if (count(fund, '.') === 0) {
            fundArray.push(fund)
        } else {
            fundArray = fund.split('.')
        }

        locArray.forEach((loc, index) => {


            let lineFund = fundArray[0]
            if (fundArray.length > 1) {
                lineFund = fundArray[index]
            }

            let quantRegex = /([a-z]+)\((\d+)\)/g
            let regLoc = quantRegex.exec(loc)

            let times = 1;
            if (!!regLoc) {

                times = regLoc[2]
                loc = regLoc[1]
            }

            /** Remember to reset the index of the regex, 
             * or it will start from the last position 
             * from the previous call to exec 
             **/
            quantRegex = /([a-z]+)\((\d+)\)/g
            let regFund = quantRegex.exec(lineFund)
            if (!!regFund) {
                lineFund = regFund[1]
            }

            locFundLines.push({
                recnum: recnum,
                loc: loc,
                fund: lineFund,
                pItem: +costPerItem,
                quantity: +times,
                pTotal: +times * +costPerItem
            })

        }, this)





    })

writeToFile({ filename: './fundDistOutput/locFundLines.txt', data: locFundLines})


const uniqueLocs = [...new Set(locFundLines.map(item => item.loc))].map(val => ({
    branch: val,
    total: 0
}))

const uniqueFunds = [...new Set(locFundLines.map(item => item.fund))]
.map(  val => ({
    fund : val,
    items: 0,
    total: 0,
    byBranch : uniqueLocs.map( ({branch}) => ({
        branch : branch,
        total: 0,
        items: 0
    }) )
}));

/* console.log(`uniqueLocs`)
console.log(uniqueLocs)
console.log()

console.log(`uniqueFunds[0].byBranch **Remember this is just fund[0]'s by branch object`)
console.log(uniqueFunds[0].byBranch)
console.log()

console.log(`uniqueFunds[1].byBranch **Remember this is just fund[1]'s by branch object`)
console.log(uniqueFunds[1].byBranch)
console.log() */

/**
 * uniqueLocsAuth !== uniqueLocs
 * uniqueLocsAuth != uniqueLocs
 * 
 * I believe I could also use 
 * const a = u.map( {...rest}=> ({
 * ...rest
 * }))
 * Confirmed.
 */
const l = uniqueLocs.map(({...rest}) => ({...rest}))

const [...uniqueLocsAuth] = uniqueLocs
const [...uniqueFundsAuth] = uniqueFunds


/**
 * aggFunds, prev, and uniqueFunds are all the === same object
 * (i.e. it's pass by reference)
 */
let aggFunds = locFundLines.reduce((prev, { fund, pTotal, quantity, loc }) => {

    prev.forEach( element => {
        if (element.fund === fund) {
            element.total += +pTotal
            element.items = +element.items + +quantity
            element.byBranch.forEach( branch => {
                if (branch.branch === loc) {
                    branch.items = +branch.items + +quantity
                    branch.total = +branch.total + +pTotal
                }
            })
        }
    })
    return prev
}, uniqueFunds)


writeToFile({ filename: './fundDistOutput/aggFunds.txt', data: aggFunds})


let formattedFunds = aggFunds.map(  ({fund, total, items, ...rest}) => {
    return {
        fund: fund,
        items: items,
        total: total.toFixed(2),
        ...rest
    }
 })

 writeToFile({ filename: './fundDistOutput/formattedFunds.txt', data: formattedFunds})






let agg = locFundLines
    .reduce((prev, { loc, pTotal }) => {

        prev.forEach( element => {
            if (element.branch === loc) {
                element.total += pTotal
            }
        })
        return prev
    }, uniqueLocs)


 let formatted = agg.map(  ({branch, total, ...rest}) => {
    return {
        branch: branch,
        total: total.toFixed(2),
        ...rest
    }
 })
 writeToFile({ filename: './fundDistOutput/formatted.txt', data: formatted})


 writeToFile({ filename: './fundDistOutput/locFundLines_formatted.txt', data: locFundLines})


let forSpreadsheet = formattedFunds.reduce((accum, curr, index, array) => {

    return accum.concat(curr.byBranch.map(({ ...rest }) => ({
        fund: curr.fund,
        ...rest
    })))
}, new Array())

/* console.log("forSpreadsheet")
console.log(forSpreadsheet)
console.log("<<") */

/* 
console.log("unique locations")
console.log(formatted)
console.log("end unique locations") */

writeToFile({ filename: './fundDistOutput/temp.txt', data: forSpreadsheet})

