/**
 * Created by fy on 2016/12/30.
 */

const db = require('../../config/db');
const util = require('../../lib/utils');


let str = `0、已删除；1、已录入采血单；2、已更换采血管；3、已审批且入库；4、交接后未提取；5、提取且已保存；6、提取审核-合格；7、提取审核-废弃；8、提取审核-重提取；9、交接后未建库；10、建库且已保存；11、建库审核-合格；12、建库审核-废弃；13、建库审核-重建库；14、交接后未上机；15、上机已保存；16、上机审核-合格；17、上机审核-废弃；18、上机审核-重上机；19、交接后未分析；20、分析已保存；21、报告已发送`;


let statusArray = str.split('；');



for(let idx in statusArray){
    let status = statusArray[idx];
    let  sa = status.split('、');
    let value = sa[0];
    let label = sa[1];
    console.log(`${value}: '${label}',`)
}


for(let idx in statusArray){
    let status = statusArray[idx];
    let  sa = status.split('、');
    let value = sa[0];
    let label = sa[1];
    console.log(`option(value='${value}') ${label}`)
}

console.log('\n\n\n');

for(let idx in statusArray){
    let status = statusArray[idx];
    let  sa = status.split('、');
    let value = sa[0];
    let label = sa[1];
    console.log(`case ${value}:
    text = '${label}';
    break;`)
}