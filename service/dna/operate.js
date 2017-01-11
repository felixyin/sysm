/**
 * Created by fy on 16-12-29.
 */
'use strict';
const sp = require('../../lib/pager/select-pager');
const db = require('../../config/db');
const util = require('../../lib/utils');
const _ = require('underscore');

function getSqls(params) {
    let selectSql = `SELECT 
        id,
        barcode_long,
        barcode_short,
        storage_outer,
        storage_out_residue,
        operate_handover,
        operate_handover_date,
        operate_chip_code,
        operate_reads_val,
        operate_q30_val,
        operater,
        operate_date,
        operate_checker,
        operate_check_date,
        operate_outer,
        operate_out_residue,
        report_handover,
        report_handover_date,
        status
    FROM dna_flow `;

    let whereSql = " WHERE 1 = 1 \n";
    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*长条码编号*/\n");
    params.barcode_short && (whereSql += " AND barcode_short LIKE '%:barcode_short%' /*短条码编号*/\n");
    params.storage_outer && (whereSql += " AND storage_outer LIKE '%:storage_outer%' /*建库组出库人*/\n");
    params.storage_out_residue && (whereSql += " AND storage_out_residue LIKE '%:storage_out_residue%' /*建库组试管剩余数量*/\n");
    params.operate_handover && (whereSql += " AND operate_handover LIKE '%:operate_handover%' /*上机组接收人*/\n");
    params.operate_handover_date && (whereSql += " AND operate_handover_date LIKE '%:operate_handover_date%' /*上机组接收时间*/\n");
    params.operate_chip_code && (whereSql += " AND operate_chip_code LIKE '%:operate_chip_code%' /*上机芯片编码*/\n");
    params.operate_reads_val && (whereSql += " AND operate_reads_val LIKE '%:operate_reads_val%' /*上机reads数*/\n");
    params.operate_q30_val && (whereSql += " AND operate_q30_val LIKE '%:operate_q30_val%' /*上机q30值*/\n");
    params.operater && (whereSql += " AND operater LIKE '%:operater%' /*上机人*/\n");
    params.operate_date && (whereSql += " AND operate_date LIKE '%:operate_date%' /*上机时间*/\n");
    params.operate_checker && (whereSql += " AND operate_checker LIKE '%:operate_checker%' /*上机审查人*/\n");
    params.operate_check_date && (whereSql += " AND operate_check_date LIKE '%:operate_check_date%' /*上机审查时间*/\n");
    params.operate_outer && (whereSql += " AND operate_outer LIKE '%:operate_outer%' /*上机组出库人*/\n");
    params.operate_out_residue && (whereSql += " AND operate_out_residue LIKE '%:operate_out_residue%' /*上机组试管剩余数量*/\n");
    params.report_handover && (whereSql += " AND report_handover LIKE '%:report_handover%' /*分析报告组接收人*/\n");
    params.report_handover_date && (whereSql += " AND report_handover_date LIKE '%:report_handover_date%' /*分析报告组接收时间*/\n");
    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " AND status IN (14,15,16,17,18) /*状态*/\n";
    } else {
        whereSql += " AND status = :status /*状态*/\n";
    }

    return {
        selectSql: selectSql,
        whereSql: whereSql,
        sql: selectSql + whereSql
    };
}

/**
 * 分页sql
 * @param req
 * @param res
 */
exports.list = (req, res) => {
    let sqls = getSqls(req.body);
    sp.selectPager(req, res, db, sqls.selectSql, sqls.whereSql);
};

/**
 * 查询所有
 * @params params
 * @params cb
 */
exports.listAll = (params, cb) => {
    let sqls = getSqls(params);
    sp.selectAll(db, sqls.sql, params, cb);
};

/**
 * 修改信息
 * @param dnaFlow
 * @param cb
 */
exports.updateDnaFlowById = (dnaFlow, cb) => {
    let id = dnaFlow.id;
    delete dnaFlow.id;
    dnaFlow.operate_date = util.now();
    let uss = util.getUpdateSeletiveSql(dnaFlow);
    uss.param.push(id);
    db.pool.query('UPDATE dna_flow SET' + uss.sql + 'WHERE id=?', uss.param, cb);
};

/**
 * 查询数据,根据id
 * @param id
 * @param cb
 */
exports.selectDnaFlowById = (id, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.id=?', id, cb);
};

/**
 * 审核
 * @param sh
 * @param cb
 */
exports.updateSh = (sh, cb) => {
    console.log(sh.ids);
    let sql = 'UPDATE dna_flow AS t SET t.operate_checker="' + sh.checker + '", t.operate_check_date=NOW(), t.operate_out_residue =2, t.status=16 WHERE t.id in (' + sh.ids + ')';
    console.log(sql);
    db.pool.query(sql, cb);
};

/**
 * 保存出库信息
 * @param ck
 * @param cb
 */
exports.insertCk = (ck, cb) => {
    let operate_outer = ck.ckUserId;
    let report_handover = ck.jjUserId;
    let ids = ck.ids;
    console.log(ids);
    let updateSql = ['UPDATE dna_flow SET operate_outer="', operate_outer, '", report_handover="', report_handover, '", report_handover_date=NOW(), operate_out_residue=(operate_out_residue - 1), status=19 /*交接后未建库*/  WHERE id IN (', ids, ')'].join('');
    console.log(updateSql);
    db.pool.query(updateSql, cb);
};

/**
 * 根据barcode short查询
 * @param barcodeShort
 * @param cb
 */
exports.selectDnaFlowByBarcodeShort = (barcodeShort, cb) => {
    db.pool.query('SELECT * FROM dna_flow AS t WHERE t.barcode_short=?', barcodeShort, cb);
};
