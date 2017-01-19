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
        id, barcode_long, hospital, sample_code, sample_date, receive_date, real_name, id_card, age, pregnancy_week, pregnancy_condition,
        pregnancy_bad_history, comments, inputter, input_date, changer, change_date, checker, check_date, sample_outer,
        sample_out_residue, extract_handover, extract_handover_date, extract_qbite_deep, extract_epoch_deep, extract_purity_deep, extract_part_size, 
        extract_part_after_break, extracter, extract_date, extract_checker, extract_check_date, extract_outer, extract_out_residue, storage_handover, 
        storage_handover_date, storage_deep, storage_part_size, storager, storage_date, storage_checker, storage_check_date, storage_outer, 
        storage_out_residue, operate_handover, operate_handover_date, operate_chip_code, operate_reads_val, operate_q30_val, operater, operate_date,
        operate_checker, operate_check_date, operate_outer, operate_out_residue, report_handover, report_handover_date, report_result, report_advice, 
        report_is_send, reporter, report_date, report_sender, report_send_date, status
    FROM dna_flow `;

    let whereSql = " WHERE 1 = 1 \n";
    params.id && (whereSql += " AND id LIKE '%:id%' /**/\n");
    params.barcode_long && (whereSql += " AND barcode_long LIKE '%:barcode_long%' /*条码编号*/\n");
    params.hospital && (whereSql += " AND hospital LIKE '%:hospital%' /*医院名称*/\n");
    params.sample_code && (whereSql += " AND sample_code LIKE '%:sample_code%' /*样本编号*/\n");
    params.sample_date && (whereSql += " AND sample_date LIKE '%:sample_date%' /*采样日期*/\n");
    params.receive_date && (whereSql += " AND receive_date LIKE '%:receive_date%' /*接收日期*/\n");
    params.real_name && (whereSql += " AND real_name LIKE '%:real_name%' /*姓名*/\n");
    params.id_card && (whereSql += " AND id_card LIKE '%:id_card%' /*身份证*/\n");
    params.age && (whereSql += " AND age LIKE '%:age%' /*出生日期*/\n");
    params.pregnancy_week && (whereSql += " AND pregnancy_week LIKE '%:pregnancy_week%' /*孕周*/\n");
    params.pregnancy_condition && (whereSql += " AND pregnancy_condition LIKE '%:pregnancy_condition%' /*妊娠情况*/\n");
    params.pregnancy_bad_history && (whereSql += " AND pregnancy_bad_history LIKE '%:pregnancy_bad_history%' /*不良孕产史*/\n");
    params.comments && (whereSql += " AND comments LIKE '%:comments%' /*备注*/\n");
    params.inputter && (whereSql += " AND inputter LIKE '%:inputter%' /*录入人员*/\n");
    params.input_date && (whereSql += " AND input_date LIKE '%:input_date%' /*录入日期*/\n");
    params.changer && (whereSql += " AND changer LIKE '%:changer%' /*换管人员*/\n");
    params.change_date && (whereSql += " AND change_date LIKE '%:change_date%' /*换管日期*/\n");
    params.checker && (whereSql += " AND checker LIKE '%:checker%' /*审批人员*/\n");
    params.check_date && (whereSql += " AND check_date LIKE '%:check_date%' /*审批日期*/\n");
    // params.barcode_short && (whereSql += " AND barcode_short LIKE '%:barcode_short%' /*短条码编号*/\n");
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
    params.storage_deep && (whereSql += " AND storage_deep LIKE '%:storage_deep%' /*建库浓度*/\n");
    params.storage_part_size && (whereSql += " AND storage_part_size LIKE '%:storage_part_size%' /*建库片段大小*/\n");
    params.storager && (whereSql += " AND storager LIKE '%:storager%' /*建库人*/\n");
    params.storage_date && (whereSql += " AND storage_date LIKE '%:storage_date%' /*建库时间*/\n");
    params.storage_checker && (whereSql += " AND storage_checker LIKE '%:storage_checker%' /*建库审查人*/\n");
    params.storage_check_date && (whereSql += " AND storage_check_date LIKE '%:storage_check_date%' /*建库审查时间*/\n");
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
    params.report_result && (whereSql += " AND report_result LIKE '%:report_result%' /*分析结果*/\n");
    params.report_advice && (whereSql += " AND report_advice LIKE '%:report_advice%' /*建议*/\n");
    params.report_is_send && (whereSql += " AND report_is_send LIKE '%:report_is_send%' /*是否发送（1、不发送；2、发送）*/\n");
    params.reporter && (whereSql += " AND reporter LIKE '%:reporter%' /*分析人*/\n");
    params.report_date && (whereSql += " AND report_date LIKE '%:report_date%' /*分析时间*/\n");
    params.report_sender && (whereSql += " AND report_sender LIKE '%:report_sender%' /*报告发送人*/\n");
    params.report_send_date && (whereSql += " AND report_send_date LIKE '%:report_send_date%' /*报告发送时间*/\n");
    // params.status && (whereSql += " AND status LIKE '%:status%' /*状态（０、已删除；1、已录入采血单；2、已更换采血管；3、已审批且入库；４、交接后未提取；５、提取且已保存；６、提取审核-合格；７、提取审核-废弃；８、提取审核-重提取；９、交接后未建库；10、建库且已保存；11、建库审核-合格；12、建库审核-废弃；13、建库审核-重建库；14、交接后未上机；15、上机已保存；16、上机审核-合格；17、上机审核-废弃；18、上机审核-重上机；19、交接后未分析；20、分析已保存；21、报告已发送）*/\n");

    let status = params.status;
    if (status == '-1' || status == undefined) { // 全部
        whereSql += " \n";
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

