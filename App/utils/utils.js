/**
 * this function convert the supported currencies codes response
 * to array of currencies codes.
 * @param currencyCodesJsonObj
 * @returns {*[]}
 */
export function convertJsonToArray (currencyCodesJsonObj) {
    let currencyCodesArr = [];
    for (const key in currencyCodesJsonObj) {
        currencyCodesArr.push({[key]: {
                "currencyId": currencyCodesJsonObj[key].currencyId,
                "currencyName": currencyCodesJsonObj[key].currencyName
            }});
    }
    return currencyCodesArr;
}