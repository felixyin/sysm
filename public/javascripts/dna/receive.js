/**
 * Created by fy on 16-12-29.
 */
'use strict';
(function (W) {

    W.grid_selector = "#grid-table";
    W.pager_selector = "#grid-pager";
    W.search_form = '#search-form-id';
    W.str = location.search;
    W._title = '样本接收管理';
    W._url = BASE_URL + "dna/receive/list";
    W._sortname = 'input_date';
    W._sortorder = 'ASC';
    W._postData = {};
    W._colNames = ['序号', '条码编号', '医院名称', '样本编号', '采样日期', '接收日期', '姓名', '身份证号', '出生日期',
        '孕周', '妊娠情况', '不良孕产史', '备注', '录入人员', '录入日期', '换管人员', '换管日期', '审批人员', '审批日期',
        '', '状态'];
    W._colModel = [
        {name: 'id', width: 40, index: 'id', align: 'center', sortable: false, frozen: true},
        {name: 'barcode_long', width: 120, index: 'barcode_long', align: 'center', sortable: false, frozen: true},
        {name: 'hospital', width: 120, index: 'hospital', align: 'center', sortable: false, frozen: true},
        {name: 'sample_code', width: 80, index: 'sample_code', align: 'center', sortable: false, frozen: true},
        {name: 'sample_date', width: 130, index: 'sample_date', align: 'center', sortable: false, frozen: true},
        {name: 'receive_date', width: 130, index: 'receive_date', align: 'center', sortable: false, frozen: true},
        {name: 'real_name', width: 80, index: 'real_name', align: 'center', sortable: false, frozen: true},
        {name: 'id_card', width: 150, index: 'id_card', align: 'center', sortable: true},
        {name: 'age', width: 130, index: 'age', align: 'center', sortable: true},
        {name: 'pregnancy_week', width: 100, index: 'pregnancy_week', align: 'center', sortable: true},
        {name: 'pregnancy_condition', width: 100, index: 'pregnancy_condition', align: 'center', sortable: false},
        {name: 'pregnancy_bad_history', width: 100, index: 'pregnancy_bad_history', align: 'center', sortable: false},
        {name: 'comments', width: 100, index: 'comments', align: 'center', sortable: true},
        {name: 'inputter', width: 100, index: 'inputter', align: 'center', sortable: true},
        {name: 'input_date', width: 100, index: 'input_date', align: 'center', sortable: true},
        {name: 'changer', width: 100, index: 'changer', align: 'center', sortable: true},
        {name: 'change_date', width: 100, index: 'change_date', align: 'center', sortable: true},
        {name: 'checker', width: 100, index: 'checker', align: 'center', sortable: true},
        {name: 'check_date', width: 100, index: 'check_date', align: 'center', sortable: true},
        // {name: 'barcode_short', width: 100, index: 'barcode_short', align: 'center', sortable: false},
        {name: 'status', hidden: true, hidedlg: true},
        {
            name: 'status1', width: 100, index: 'status', align: 'center', sortable: false,
            formatter: function (value, options, row) {
                var text = '';
                switch (row.status) {
                    case 0:
                        text = '已删除';
                        break;
                    case 1:
                        text = '已录入采血单';
                        break;
                    case 2:
                        text = '已更换采血管';
                        break;
                    case 3:
                        text = '已审批且入库';
                        break;
                    case 4:
                        text = '交接后未提取';
                        break;
                    case 5:
                        text = '提取且已保存';
                        break;
                    case 6:
                        text = '提取审核-合格';
                        break;
                    case 7:
                        text = '提取审核-废弃';
                        break;
                    case 8:
                        text = '提取审核-重提取';
                        break;
                    case 9:
                        text = '交接后未建库';
                        break;
                    case 10:
                        text = '建库且已保存';
                        break;
                    case 11:
                        text = '建库审核-合格';
                        break;
                    case 12:
                        text = '建库审核-废弃';
                        break;
                    case 13:
                        text = '建库审核-重建库';
                        break;
                    case 14:
                        text = '交接后未上机';
                        break;
                    case 15:
                        text = '上机已保存';
                        break;
                    case 16:
                        text = '上机审核-合格';
                        break;
                    case 17:
                        text = '上机审核-废弃';
                        break;
                    case 18:
                        text = '上机审核-重上机';
                        break;
                    case 19:
                        text = '交接后未分析';
                        break;
                    case 20:
                        text = '分析已保存';
                        break;
                    case 21:
                        text = '报告已发送';
                        break;
                    default:
                        text = '';
                }
                return text;
            }
        }
    ];

    W.updateActionIcons = function () {
        $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量录入采血单');
        // $('#btn-cxg').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量更换采血管');
        $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
        $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量出库');
    };
    W.updateActionIcons();

    W.onSelectRow = function (ids, status) { //单击选择行
        // if(status)
        var myIds = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        var selectedLength = myIds.length;
        if (selectedLength == 1) {
            $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;修改采血单');
            // $('#btn-cxg').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;更换采血管');
            $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;出库');
        } else if (selectedLength > 1) {
            $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;批量录入采血单');
            // $('#btn-cxg').children('button').prop('disabled', true);
            $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量审核');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量出库');
        } else { // 0
            $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量录入采血单');
            // $('#btn-cxg').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量更换采血管');
            $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量出库');
        }
    };

    $(".ipt-date").datepicker({
        language: 'zh-CN',
        format: "yyyy-MM-dd",
        autoclose: true,
        pickerPosition: "bottom-right"
    });

    $('.ipt-person').selectUser();

    showSearchMore($('#btn-search-more'), [2], '_dna_receive_is_search_more');

    /**
     * 录入采血单
     * @param btn
     */
    W.showCxdDialog = function (btn) {
        W.selectUser('采血单录入人员', function (userId) {
            var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            if (ids && ids.length == 1) {
                var row = $(grid_selector).jqGrid('getRowData', ids[0]);
                var id = row.id;
                var barcode_long = row.barcode_long;
                var status = parseInt(row.status);
                if (status < 3) { // 未审批状态
                    W.showDialog('preEditCxd', '/dna/receive/preEditCxd?id=' + id + '&userId=' + userId, '修改采血单:' + barcode_long, '70%', '450px', function (contextWindow, dialog) {
                        $('#edit-cxd-form', contextWindow.document).submit();
                    });
                } else {
                    Toast.show('此采血单已审批,不能修改:' + barcode_long);
                }
            } else { // 批量录入逻辑
                W.showDialog('preAddCxd', '/dna/receive/preAddCxd?userId=' + userId, '批量录入采血单', '70%', '450px', function (contextWindow, dialog) {
                    $('#edit-cxd-form', contextWindow.document).submit();
                });
            }
        });
    };

    /**
     * 录入采血单回调
     * @param cxdId
     * @param error
     */
    W.addCxdCb = function (cxdId, error) {
        if (cxdId) {
            Toast.show('采血单保存成功,开始录入下一单!');
            $('#preAddCxd').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
            W.showCxdDialog();
        } else {
            Toast.show('采血单保存失败,请联系管理员!');
            localStorage.setItem('_error_addCxd', error);
        }
    };

    /**
     * 修改采血单回调
     * @param changedRows
     * @param error
     */
    W.editCxdCb = function (changedRows, error) {
        if (changedRows) {
            Toast.show('采血单修改成功');
            $('#preEditCxd').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('采血单修改失败,请联系管理员!');
            localStorage.setItem('_error_editCxd', error);
        }
    };

    /**
     * 更换采血管
     * @param btn
     */
    W.showCxgDialog = function (btn) {
        var barcode_long = '';
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length == 1) {
            var row = $(grid_selector).jqGrid('getRowData', ids[0]);
            barcode_long = row.barcode_long;
            var status = row.status;
            if (status >= 3) { // 3 已审批
                Toast.show('此数据已审批,不能修改:' + barcode_long);
                return;
            }
        }
        W.selectUser('采血管更换人员', function (userId) {
            W.showDialog('preAddCxg', '/dna/receive/preAddCxg?userId=' + userId + '&barcode_long=' + barcode_long, '更换采血管:' + barcode_long, '60%', '200px', function (contextWindow, dialog) {
                var ctm = $('#ff-ctmbh', contextWindow.document).val();
                var dtm = $('#ff-dtmbh', contextWindow.document).val();
                if (ctm && dtm) {
                    $('#edit-cxg-form', contextWindow.document).submit();
                } else {
                    Toast.show('请先扫描条码再保存');
                }
            });
        });
    };

    /**
     * 更新采血管回调
     * @param cxgId
     * @param error
     */
    W.addCxgCb = function (cxgId, error) {
        if (cxgId) {
            $('#preAddCxg').dialog('close').remove();

            var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            if (ids && ids.length == 1) {
                var row = $(grid_selector).jqGrid('getRowData', ids[0]);
                var barcode_long = row.barcode_long;
                Toast.show('更换采血管成功,条码编号:' + barcode_long);
            } else {
                Toast.show('更换采血管成功,开始录入下一单!');
                W.showCxgDialog();
            }
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('更换采血管失败,请联系管理员!');
            localStorage.setItem('_error_addCxg', error);
        }
    };

    /**
     * 审核
     * @param btn
     */
    W.showShDialog = function (btn) {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnArray = [];
            var idArray = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                if (row.status == 2) {// 已更换采血管
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnArray.push(id);
                }
            }
            if (warnArray.length > 0) {
                Toast.show('您选择的部分行不符合审核条件(未更换采血管),已经取消选中');
            }
            if (idArray.length > 0) {
                W.selectUser('审核人员', function (userId) {
                    $.post('dna/receive/addSh', {checker: userId, ids: idArray.join(',')}, function (result) {
                        if (result.changedRows > 0) {
                            if (result.changedRows == 1) {
                                Toast.show(userId + ',审核成功!');
                            } else {
                                Toast.show(userId + ',批量审核成功!');
                            }
                            jQuery(grid_selector).trigger('reloadGrid');
                        } else {
                            Toast.show(userId + ',审核失败,请联系管理员!');
                            localStorage.setItem('_error_addSh', result.err);
                        }
                    })
                });
            }
        } else {
            Toast.show('请先在列表中勾选您要审核的数据行');
        }
    };

    /**
     * 入库
     */
    W.showRkDialog = function () {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnArray = [];
            var idArray = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                if (row.status == 2) {// 已审批
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnArray.push(id);
                }
            }
            if (warnArray.length > 0) {
                Toast.show('您选择的部分行不符合入库条件(未审批),已经取消选中');
            }
            if (idArray.length > 0) {
                W.selectUser('入库人员', function (userId) {
                    $.post('dna/receive/addSh', {checker: userId, ids: idArray.join(',')}, function (result) {
                        if (result.changedRows > 0) {
                            if (result.changedRows == 1) {
                                Toast.show(userId + ',入库成功!');
                            } else {
                                Toast.show(userId + ',批量入库成功!');
                            }
                            jQuery(grid_selector).trigger('reloadGrid');
                        } else {
                            Toast.show(userId + ',入库失败,请联系管理员!');
                            localStorage.setItem('_error_addSh', result.err);
                        }
                    })
                });
            }
        } else {
            Toast.show('请先在列表中勾选您要入库的数据行');
        }
    };

    /**
     * 出库
     * @param btn
     */
    W.showCkDialog = function (btn) {
        var barcodeShortArray = [];
        var warnArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                if (row.status == 3) {// 已审批且入库
                    barcodeShortArray.push(row.barcode_long);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnArray.push(id);
                }
            }
            if (warnArray.length > 0) {
                Toast.show('您选择的部分行不符合出库条件(未审批),已经取消选中');
            }
            if (barcodeShortArray.length > 0) {
                W.selectUser('出库人员', function (ckUserId) {
                    W.selectUser('交接人员', function (jjUserId) {
                        W.showDialog('preAddCk', '/dna/receive/preAddCk?sample_outer=' + ckUserId + '&extract_handover=' + jjUserId + '&barcodeShortArray=' + barcodeShortArray, '出库', '60%', '450px',
                            function (contextWindow, dialog) {
                                var dtm = $('.my-dtmbh', contextWindow.document).map(function (i, v) {
                                    var vv = $(v).val();
                                    if (vv)return vv;
                                }).get().join(',');
                                if (dtm) {
                                    $('#edit-ck-form', contextWindow.document).submit();
                                } else {
                                    Toast.show('请先扫描条码再保存出库');
                                }
                            });
                    }, 'DNA提取管理');
                });
            }
        } else {
            Toast.show('请先在列表中勾选您要出库的数据行');
        }
    };

    /**
     * 出库回调
     * @param changedRows
     * @param error
     */
    W.addCkCb = function (changedRows, error) {
        if (changedRows) {
            Toast.show('已出库!');
            $('#preAddCk').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('出库失败,请联系管理员!');
            localStorage.setItem('_error_addCk', error);
        }
    };

    /**
     * 导出excel文件
     */
    W.exportCvs = function () {
        $('#search-form-id')
            .off('submit').attr('action', 'dna/receive/exportExcel').attr('method', 'post').attr('target', '_blank').submit()
            .on('submit', searchFormSubmitHandler).removeAttr('action').removeAttr('target');
    };

})(window);