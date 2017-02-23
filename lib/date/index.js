/**
 * Created by fy on 15-9-7.
 */
'use strict';
const dateFormat = require('date-format');

/**
 * 返回当前的时间字符串
 * @param pattern　日期的格式，默认不传递则是：yyyy-MM-dd HH:mm:ss
 * @returns {*}
 */
exports.now = function (pattern) {
    if (!pattern) pattern = 'yyyy-MM-dd hh:mm:ss';
    return dateFormat.asString(pattern, new Date());
};

exports.format = function (date, pattern) {
    if (!pattern) pattern = 'yyyy-MM-dd hh:mm:ss';
    return dateFormat.asString(pattern, date);
};