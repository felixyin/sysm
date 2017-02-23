/**
 * Created by fy on 2016/12/29.
 */

'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const utils = require('../../lib/utils');
const extractService = require('../../service/dna/extract');
const excel = require('node-excel-export');

router.get('/', (req, res) => {
    res.render('dna/extract/list');
});

router.route('/list').get(extractService.list).post(extractService.list);

/**
 * 显示修改界面
 */
router.get('/preEdit', (req, res) => {
    extractService.selectDnaFlowById(req.query.id, (err, rows) => {
        console.error(err);
        if (rows && rows.length == 1) {
            let row = rows[0];
            row.action = '/dna/extract/edit';
            row.extracter = req.query.userId;
            row.status = 5;// 提取已保存
            res.render('dna/extract/edit', row);
        }
    });
});

/**
 * 修改信息
 */
router.post('/edit', (req, res) => {
    let params = req.body;
    params.extract_date = utils.now();
    extractService.updateDnaFlowById(params, (err, result) => {
        console.error(err);
        let errMsg = JSON.stringify(err);
        utils.jsonpAndEnd(res, `parent.parent.editCb(${result ? result.changedRows : null}, '${errMsg}');`);
    });
});

/**
 * 审核
 */
router.post('/addSh', (req, res) => {
    extractService.updateSh(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 保存出库信息
 */
router.post('/addCk', (req, res) => {
    extractService.insertCk(req.body, (err, result) => {
        res.send({
            changedRows: result.changedRows,
            err: err
        });
    });
});

/**
 * 查询剩余数量
 */
router.post('/getByBarcodeShort', (req, res) => {
    extractService.selectDnaFlowByBarcodeShort(req.body.barcode_long, (err, rows) => {
        console.log(err);
        if (err)throw err;
        res.send(rows);
    });
});

/**
 * 导出excel
 */
router.post('/exportExcel', (req, res) => {
    // let dataStr = req.body.data;
    // let params = JSON.parse(dataStr);
    extractService.listAll(req.body, (err, rows) => {
        if (err)throw err;
        if (rows && rows.length > 0) {
            let dataset = JSON.parse(JSON.stringify(rows));

            let styles = {
                title: {
                    font: {
                        sz: 30,
                        bold: true
                    }
                },
                header: {
                    font: {
                        color: {
                            // rgb: 'FFFFFFFF'
                        },
                        sz: 14,
                        bold: true,
                        underline: false
                    }
                },
                cell: {}
            };

            let heading = [
                [{value: '标签接收数据导出', style: styles.header}],
            ];

            let specification = {
                barcode_long: {
                    displayName: '条码编号',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                // barcode_short: {
                //     displayName: '短条码编号',
                //     headerStyle: styles.header,
                //     cellStyle: styles.cell,
                //     cellFormat: function (value, row) {
                //         return value || '';
                //     },
                //     width: '15'
                // },
                sample_outer: {
                    displayName: '采血管出库人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                sample_out_residue: {
                    displayName: '接收组样本剩余量',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_handover: {
                    displayName: '提取组接收人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_handover_date: {
                    displayName: '提取组接收时间',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_qbite_deep: {
                    displayName: 'Qubit浓度(ng/ul)',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_epoch_deep: {
                    displayName: 'epoch浓度(ng/ul)',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_purity_deep: {
                    displayName: '纯度(%)',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_part_size: {
                    displayName: '片段大小(bp)',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_part_after_break: {
                    displayName: '打断后片段(bp)',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extracter: {
                    displayName: '提取人员',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_date: {
                    displayName: '提取时间',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_checker: {
                    displayName: '提取审核人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_check_date: {
                    displayName: '提取审核时间',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_outer: {
                    displayName: '提取出库人',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                extract_out_residue: {
                    displayName: '提取组样本剩余量',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        return value || '';
                    },
                    width: '15'
                },
                status: {
                    displayName: '状态',
                    headerStyle: styles.header,
                    cellStyle: styles.cell,
                    cellFormat: function (value, row) {
                        let text = '';
                        switch (value) {
                            case 0:
                                text = '已删除';
                                break;
                            case 1:
                                text = '已录入';
                                break;
                            case 2:
                                text = '已审批';
                                break;
                            case 3:
                                text = '已入库';
                                break;
                            case 4:
                                text = '已出库';
                                break;
                            case 5:
                                text = '已提取';
                                break;
                            case 6:
                                text = '提取合格';
                                break;
                            case 7:
                                text = '提取废弃';
                                break;
                            case 8:
                                text = '重提取';
                                break;
                            case 9:
                                text = '提取已交接';
                                break;
                            case 10:
                                text = '已建库';
                                break;
                            case 11:
                                text = '建库合格';
                                break;
                            case 12:
                                text = '建库废弃';
                                break;
                            case 13:
                                text = '重建库';
                                break;
                            case 14:
                                text = '建库已交接';
                                break;
                            case 15:
                                text = '已上机';
                                break;
                            case 16:
                                text = '上机合格';
                                break;
                            case 17:
                                text = '上机废弃';
                                break;
                            case 18:
                                text = '重上机';
                                break;
                            case 19:
                                text = '上机已交接';
                                break;
                            case 20:
                                text = '已分析';
                                break;
                            case 21:
                                text = '报告已发送';
                                break;
                            default:
                                text = '';
                        }
                        return text;
                    },
                    width: '15'
                }
            };

            let report = excel.buildExport(
                [
                    {
                        name: 'DNA提取数据导出',
                        heading: heading,
                        specification: specification,
                        data: dataset
                    }
                ]
            );

            res.attachment('DNA提取数据导出.xlsx'); // This is sails.js specific (in general you need to set headers)
            return res.send(report);
        } else {
            let msg = encodeURI('没有数据可导出');
            return utils.jsonpAndEnd(res, `alert(decodeURI('${msg}'));window.close();`)
        }

    });
});

module.exports = router;
