/**
 * Created by fy on 16-12-29.
 */
'use strict';
(function (W) {

    !function () {
        W.grid_selector = "#grid-table";
        W.pager_selector = "#grid-pager";
        W.search_form = '#search-form-id';
        W.str = location.search;
        W._title = 'DNA提取管理';
        W._url = BASE_URL + "dna/extract/list";
        W._sortname = 'input_date';
        W._sortorder = 'ASC';
        W._postData = {};
        W._colNames = ['序号', '条码编号', '采血管出库人', '接收组样本剩余量', '提取组接收人', '提取组接收时间',
            'qbite浓度', 'epoch浓度', '纯度', '片段大小', '打断后片段', '提取人员', '提取时间', '提取审核人', '提取审核时间',
            '提取出库人', '提取组样本剩余量', '', '状态'];
        W._colModel = [
            {name: 'id', width: 40, index: 'id', align: 'center', sortable: false, frozen: true},
            {name: 'barcode_long', width: 120, index: 'barcode_long', align: 'center', sortable: false, frozen: true},
            // {name: 'barcode_short', width: 100, index: 'barcode_short', align: 'center', sortable: false, frozen: true},
            {name: 'sample_outer', width: 100, index: 'sample_outer', align: 'center', sortable: false},
            {name: 'sample_out_residue', width: 100, index: 'sample_out_residue', align: 'center', sortable: false},
            {name: 'extract_handover', width: 100, index: 'extract_handover', align: 'center', sortable: false},
            {name: 'extract_handover_date', width: 130, index: 'extract_handover_date', align: 'center', sortable: false},
            {name: 'extract_qbite_deep', width: 100, index: 'extract_qbite_deep', align: 'center', sortable: false},
            {name: 'extract_epoch_deep', width: 100, index: 'extract_epoch_deep', align: 'center', sortable: false},
            {name: 'extract_purity_deep', width: 100, index: 'extract_purity_deep', align: 'center', sortable: false},
            {name: 'extract_part_size', width: 100, index: 'extract_part_size', align: 'center', sortable: false},
            {name: 'extract_part_after_break', width: 100, index: 'extract_part_after_break', align: 'center', sortable: false},
            {name: 'extracter', width: 100, index: 'extracter', align: 'center', sortable: false},
            {name: 'extract_date', width: 130, index: 'extract_date', align: 'center', sortable: false},
            {name: 'extract_checker', width: 100, index: 'extract_checker', align: 'center', sortable: false},
            {name: 'extract_check_date', width: 130, index: 'extract_check_date', align: 'center', sortable: false},
            {name: 'extract_outer', width: 100, index: 'extract_outer', align: 'center', sortable: false},
            {name: 'extract_out_residue', width: 100, index: 'extract_out_residue', align: 'center', sortable: false},
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
                            text = '已审批';
                            break;
                        case 3:
                            text = '已入库';
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
            $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;录入DNA提取信息');
            $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
            $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量出库');
        };
        W.updateActionIcons();

        W.onSelectRow = function (ids, status) { //单击选择行
            var myIds = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var selectedLength = myIds.length;
            if (selectedLength == 1) {
                var row = $(grid_selector).jqGrid('getRowData', myIds[0]);
                if (row.extract_date) { // 修改
                    $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;修改DNA提取信息');
                } else {
                    $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;录入DNA提取信息');
                }
                $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
                $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;出库');
            } else if (selectedLength > 1) {
                $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;录入DNA提取信息');
                $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量审核');
                $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量出库');
            } else { // 0
                $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;录入DNA提取信息');
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

        showSearchMore($('#btn-search-more'), [2, 3], '_dna_extract_is_search_more');
    }();

    /**
     * 录入DNA提取信息
     * @param btn
     */
    W.showEditDialog = function (btn) {
        W.selectUser('DNA提取录入人员', function (userId) {
            var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            if (ids && ids.length == 1) {
                var row = $(grid_selector).jqGrid('getRowData', ids[0]);
                var id = row.id;
                var barcode_long = row.barcode_long;
                var status = parseInt(row.status);
                if (status < 6) { // 未审批状态
                    W.showDialog('preEdit', '/dna/extract/preEdit?id=' + id + '&userId=' + userId, '录入DNA提取数据:' + barcode_long,
                        '70%', '350px', function (contextWindow, dialog) {
                            $('#edit-form', contextWindow.document).submit();
                        });
                } else {
                    Toast.show('此记录已审批,不能修改:' + barcode_long);
                }
            } else {
                Toast.show('请先勾选一行数据');
            }
        });
    };

    /**
     * 修改的回调
     * @param changedRows
     * @param error
     */
    W.editCb = function (changedRows, error) {
        if (changedRows) {
            Toast.show('保存成功');
            $('#preEdit').dialog('close').remove();
            jQuery(grid_selector).trigger('reloadGrid');
        } else {
            Toast.show('保存失败,请联系管理员!');
            localStorage.setItem('_error_editExtract_Cb', error);
        }
    };

    /**
     * 审核
     * @param btn
     */
    W.showShDialog = function (btn) {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnRows = [];
            // var okRows = [];
            for (var i in ids) {
                var id = ids[i];
                if (id) {
                    var row = $(grid_selector).jqGrid('getRowData', id);
                    if (row.status != 5) { // 提取且已保存
                        $(grid_selector).jqGrid('setSelection', id, false);
                        warnRows.push(row.barcode_long);
                        // }else{
                        //     okRows.push(row.barcode_short);
                    }
                }
            }
            if (warnRows.length > 0) {
                Toast.show('您选择的这些行不符合审批要求,已经取消选中:' + warnRows.join(','));
            }
            ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');

            if (ids && ids.length) {

                W.selectUser('审核人员', function (userId) {
                    bootbox.dialog({
                        message: "<span class='bigger-110' style='font-size:25px;'>请审批,注意:审批后无法再次编辑<span style='font-size:18px;'></span></span>",
                        buttons: {
                            "success": {
                                "label": "<i class='icon-ok'></i> &nbsp;&nbsp;&nbsp;&nbsp;合&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
                                "className": "btn-sm btn-success",
                                "callback": function () {
                                    $.post('dna/extract/addSh', {checker: userId, ids: ids.join(',')}, function (result) {
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
                                    });
                                }
                            },
                            "click": {
                                "label": "重提取!",
                                "className": "btn-sm btn-warning",
                                "callback": function () {
                                    var warnRows = [];
                                    for (var i in ids) {
                                        var id = ids[i];
                                        var row = $(grid_selector).jqGrid('getRowData', id);
                                        var count = parseInt(row.sample_out_residue);
                                        if (count < 1) { // 没有剩余试管用于重做
                                            $(grid_selector).jqGrid('setSelection', id, false);
                                            warnRows.push(id);
                                        }
                                    }
                                    if (warnRows.length > 0) {
                                        Toast.show('部分选中行,在上一环节已没有剩余试管,已取消选中');
                                    }
                                    ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
                                    $.post('dna/extract/redo', {checker: userId, ids: ids.join(',')}, function (result) {
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
                                    });
                                }
                            },
                            "danger": {
                                "label": "废弃!",
                                "className": "btn-sm btn-danger",
                                "callback": function () {
                                    $.post('dna/extract/addSh', {checker: userId, ids: ids.join(',')}, function (result) {
                                        if (result.changedRows > 0) {
                                            if (result.changedRows == 1) {
                                                Toast.show(userId + ',审核成功!');
                                            } else {
                                                Toast.show(userId + ',批量审核成功!');
                                            }
                                            jQuery(grid_selector).trigger('reloadGrid');
                                        } else {
                                            Toast.show(userId + ',审核失败,请联系管理员!');
                                            localStorage.setItem('_error_addSh_extract', result.err);
                                        }
                                    });
                                }
                            }
                        }
                    });

                });
            }
        } else {
            Toast.show('请先在列表中勾选您要审核的数据行');
        }
    };

    /**
     * 出库
     * @param btn
     */
    W.showCkDialog = function (btn) {
        var idArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnRows = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                var status = row.status;
                if (status == 6) { // 6为审核通过
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnRows.push(row.barcode_long);
                }
            }

            if (warnRows.length > 0) {
                Toast.show('您选择的这些行不符合出库要求,已经取消选中:' + warnRows.join(','));
            }
            ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');

            if (ids && ids.length) {
                W.selectUser('出库人员', function (ckUserId) {
                    W.selectUser('交接人员', function (jjUserId) {
                        $.post('dna/extract/addCk', {
                            ckUserId: ckUserId,
                            jjUserId: jjUserId,
                            ids: idArray.join(',')
                        }, function (result) {
                            if (result.changedRows > 0) {
                                if (result.changedRows == 1) {
                                    Toast.show('出库成功!');
                                } else {
                                    Toast.show('批量出库成功!');
                                }
                                jQuery(grid_selector).trigger('reloadGrid');
                            } else {
                                Toast.show('出库失败,请联系管理员!');
                                localStorage.setItem('_error_addCk_extract', result.err);
                            }
                        });
                    }, '建库管理');
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
            localStorage.setItem('_error_addCkCb_extract', error);
        }
    };

    /**
     * 导出excel文件
     */
    W.exportCvs = function () {
        $('#search-form-id')
            .off('submit').attr('action', 'dna/extract/exportExcel').attr('method', 'post').attr('target', '_blank').submit()
            .on('submit', searchFormSubmitHandler).removeAttr('action').removeAttr('target');
    };

})(window);