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
        sample_outer,
        sample_out_residue,
        extract_handover,
        extract_handover_date,
        extract_qbite_deep,
        extract_epoch_deep,
        extract_purity_deep,
        extract_part_size,
        extract_part_after_break,
        extracter,
        extract_date,
        extract_checker,
        extract_check_date,
        extract_outer,
        extract_out_residue,
        storage_handover,
        storage_handover_date,
        status
    FROM dna_flow `;

    let whereSql = " WHERE 1 = 1 \n";
    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*长条码编号*/\n");
    params.barcode_short && (whereSql += " AND barcode_short LIKE '%:barcode_short%' /*短条码编号*/\n");
    params.sample_outer && (whereSql += " AND sample_outer LIKE '%:sample_outer%' /*短采血管出库人*/\n");
    params.sample_out_residue && (whereSql += " AND sample_out_residue LIKE '%:sample_out_residue%' /*接收组试管剩余数量*/\n");
    params.extract_handover && (whereSql += " AND extract_handover LIKE '%:extract_handover%' /*提取组接收人*/\n");
    params.extract_handover_date && (whereSql += " AND extract_handover_date LIKE '%:extract_handover_date%' /*提取组接收时间*/\n");
    params.extract_qbite_deep && (whereSql += " AND extract_qbite_deep LIKE '%:extract_qbite_deep%' /*qbite浓度*/\n");
    params.extract_epoch_deep && (whereSql += " AND extract_epoch_deep LIKE '%:extract_epoch_deep%' /*epoch浓度*/\n");
    params.extract_purity_deep && (whereSql += " AND extract_purity_deep LIKE '%:extract_purity_deep%' /*纯度*/\n");
    params.extract_part_size && (whereSql += " AND extract_part_size LIKE '%:extract_part_size%' /*片段大小*/\n");
    params.extract_part_after_break && (whereSql += " AND extract_part_after_break LIKE '%:extract_part_after_break%' /*打断后片段*/\n");
    params.extracter && (whereSql += " AND extracter LIKE '%:extracter%' /*提取人员*/\n");
    params.extract_date && (whereSql += " AND extract_date LIKE '%:extract_date%' /*提取时间*/\n");
    params.extract_checker && (whereSql += " AND extract_checker LIKE '%:extract_checker%' /*提取审核人*/\n");
    params.extract_check_date && (whereSql += " AND extract_check_date LIKE '%:extract_check_date%' /*提取审核时间*/\n");
    params.extract_outer && (whereSql += " AND extract_outer LIKE '%:extract_outer%' /*提取出库人*/\n");
    params.extract_out_residue && (whereSql += " AND extract_out_residue LIKE '%:extract_out_residue%' /*提取组试管剩余数量*/\n");
    params.storage_handover && (whereSql += " AND storage_handover LIKE '%:storage_handover%' /*建库组接收人*/\n");
    params.storage_handover_date && (whereSql += " AND storage_handover_date LIKE '%:storage_handover_date%' /*建库组接收时间*/\n");
    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " AND status IN (4,5,6,7,8) /*状态*/\n";
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
    dnaFlow.input_date = util.now();
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
    let sql = 'UPDATE dna_flow AS t SET t.extract_checker="' + sh.checker + '", t.extract_check_date=NOW(), t.extract_out_residue =2, t.status=6 WHERE t.id in (' + sh.ids + ')';
    console.log(sql);
    db.pool.query(sql, cb);
};

/**
 * 保存出库信息
 * @param ck
 * @param cb
 */
exports.insertCk = (ck, cb) => {
    let extract_outer = ck.ckUserId;
    let storage_handover = ck.jjUserId;
    let ids = ck.ids;
    console.log(ids);
    let updateSql = ['UPDATE dna_flow SET extract_outer="', extract_outer, '", storage_handover="', storage_handover, '", storage_handover_date=NOW(), extract_out_residue=(extract_out_residue - 1), status=9 /*交接后未建库*/  WHERE id IN (', ids, ')'].join('');
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
