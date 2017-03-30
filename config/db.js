/**
 * Created by yinbin on 2015/9/4.
 */
'use strict';

const mysql = require('mysql');

/**
 * 生产机配置
 */
let poolOptions = {
    // host: process.env.MYSQL_IP || '139.224.1.36',
    host: process.env.MYSQL_IP || 'db',
    user: process.env.MYSQL_USERNAME || 'root',
    password: process.env.MYSQL_PASSWORD || 'Xr2017.',
    database: process.env.MYSQL_SCHEMA || 'sysm',
    dateStrings: true,
    connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 10
};
/*
 var poolOptions = {
 connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 50,
 host: process.env.MYSQL_IP || 'localhost',
 database: process.env.MYSQL_SCHEMA || 'lrs',
 user: process.env.MYSQL_USERNAME || 'root',
 password: process.env.MYSQL_PASSWORD || '123456'
 };
 */
let pool = mysql.createPool(poolOptions);

setInterval(function () {
    pool.query('SELECT 1');
}, 10000);


exports.getConn = function () {
    return mysql.createConnection(poolOptions);
};


exports.pool = pool;
