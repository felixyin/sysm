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
        W._title = '分析报告管理';
        W._url = BASE_URL + "dna/report/list";
        W._sortname = 'input_date';
        W._sortorder = 'ASC';
        W._postData = {};
        W._colNames = ['序号', '长条码编号', '短条码编号', '上机组发送人', '上机组试管剩余数量', '分析报告组接收人', '分析报告组接收时间', '分析结果',
            '建议', '是否发送', '分析人', '分析时间', '报告发送人', '报告发送时间', '', '状态'];
        W._colModel = [
            {name: 'id', width: 40, index: 'id', align: 'center', sortable: false, frozen: true},
            {name: 'barcode_long', width: 120, index: 'barcode_long', align: 'center', sortable: false, frozen: true},
            {name: 'barcode_short', width: 100, index: 'barcode_short', align: 'center', sortable: false, frozen: true},
            {name: 'operate_outer', width: 100, index: 'operate_outer', align: 'center', sortable: false},
            {
                name: 'operate_out_residue',
                width: 100,
                index: 'operate_out_residue',
                align: 'center',
                sortable: false,
                formatter: function (value, options, row) {
                    return value;
                }
            },
            {name: 'report_handover', width: 100, index: 'report_handover', align: 'center', sortable: false},
            {name: 'report_handover_date', width: 130, index: 'report_handover_date', align: 'center', sortable: false},
            {name: 'report_result', width: 100, index: 'report_result', align: 'center', sortable: false},
            {name: 'report_advice', width: 100, index: 'report_advice', align: 'center', sortable: false},
            {
                name: 'report_is_send', width: 100, index: 'report_is_send', align: 'center', sortable: false, formatter: function (value, options, row) {
                return value;
            }
            },
            {name: 'reporter', width: 100, index: 'reporter', align: 'center', sortable: false},
            {name: 'report_date', width: 130, index: 'report_date', align: 'center', sortable: false},
            {name: 'report_sender', width: 100, index: 'report_sender', align: 'center', sortable: false},
            {name: 'report_send_date', width: 130, index: 'report_send_date', align: 'center', sortable: false},
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
            $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;录入分析报告信息');
            // $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
            $('#btn-fs').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;发送');
            // $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量发送');
        };
        W.updateActionIcons();

        W.onSelectRow = function (ids, status) { //单击选择行
            var myIds = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
            var selectedLength = myIds.length;
            if (selectedLength == 1) {
                var row = $(grid_selector).jqGrid('getRowData', myIds[0]);
                if (row.report_date) { // 修改
                    $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;修改分析报告信息');
                } else {
                    $('#btn-cxd').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;录入分析报告信息');
                }
                // $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
                $('#btn-fs').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;发送');
                // $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;发送');
            } else if (selectedLength > 1) {
                $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;录入分析报告信息');
                // $('#btn-sh').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量审核');
                $('#btn-fs').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量发送');
                // $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量发送');
            } else { // 0
                $('#btn-cxd').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;录入分析报告信息');
                // $('#btn-sh').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;审核');
                $('#btn-fs').children('button').prop('disabled', true).first().children('i').html('&nbsp;&nbsp;&nbsp;发送');
                // $('#btn-ck').children('button').prop('disabled', false).first().children('i').html('&nbsp;&nbsp;&nbsp;批量发送');
            }
        };

        $(".ipt-date").datepicker({
            language: 'zh-CN',
            format: "yyyy-MM-dd",
            autoclose: true,
            pickerPosition: "bottom-right"
        });

        var _dna_report_is_search_more = localStorage.getItem('_dna_report_is_search_more');
        if (_dna_report_is_search_more == 'true') {
            getSearchTr([1, 2]).show();
            $('#btn-search-more').text('隐藏更多搜索项');
        } else {
            getSearchTr([1, 2]).hide();
            $('#btn-search-more').text('显示更多搜索项');
        }

        $('#btn-search-more').click(function () {
            var _dna_report_is_search_more = localStorage.getItem('_dna_report_is_search_more');
            if (_dna_report_is_search_more == 'false') {
                getSearchTr([1, 2]).show();
                $(this).text('隐藏更多搜索项');
                localStorage.setItem('_dna_report_is_search_more', 'true');
            } else {
                getSearchTr([1, 2]).hide();
                $(this).text('显示更多搜索项');
                localStorage.setItem('_dna_report_is_search_more', 'false');
            }
        });
    }();

    /**
     * 录入分析报告信息
     * @param btn
     */
    W.showEditDialog = function (btn) {
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length == 1) {
            var row = $(grid_selector).jqGrid('getRowData', ids[0]);
            var id = row.id;
            var barcode_short = row.barcode_short;
            var status = parseInt(row.status);
            if (status < 21) { // 未发送状态
                W.selectUser('分析报告录入人员', function (userId) {
                    W.showDialog('preEdit', '/dna/report/preEdit?id=' + id + '&userId=' + userId, '录入分析报告数据:' + barcode_short,
                        '70%', '350px', function (contextWindow, dialog) {
                            $('#edit-form', contextWindow.document).submit();
                        });
                });
            } else {
                Toast.show('此报告已发送,不能修改:' + barcode_short);
            }
        } else {
            Toast.show('请先勾选一行数据');
        }
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
            localStorage.setItem('_error_editreport_Cb', error);
        }
    };


    /**
     * 发送
     * @param btn
     */
    W.showFsDialog = function (btn) {
        var idArray = [];
        var ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');
        if (ids && ids.length) {
            var warnRows = [];
            // var alreadySendRows = [];
            for (var i in ids) {
                var id = ids[i];
                var row = $(grid_selector).jqGrid('getRowData', id);
                var status = row.status;
                if (status == 20) { // 20,已保存,可发送
                    idArray.push(id);
                } else {
                    $(grid_selector).jqGrid('setSelection', id, false);
                    warnRows.push(row.barcode_short);
                }
            }

            if (warnRows.length > 0) {
                Toast.show('您选择的这些行不符合发送要求(未分析,或已发送),已经取消选中:' + warnRows.join(','));
            }
            ids = $(grid_selector).jqGrid('getGridParam', 'selarrrow');

            if (ids && ids.length) {
                W.selectUser('发送人员', function (userId) {
                    $.post('dna/report/addFs', {
                        userId: userId,
                        ids: idArray.join(',')
                    }, function (result) {
                        if (result.changedRows > 0) {
                            if (result.changedRows == 1) {
                                Toast.show('发送成功!');
                            } else {
                                Toast.show('批量发送成功!');
                            }
                            jQuery(grid_selector).trigger('reloadGrid');
                        } else {
                            Toast.show('发送失败,请联系管理员!');
                            localStorage.setItem('_error_addFs_report', result.err);
                        }
                    });
                }, '分析报告管理');
            }
        } else {
            Toast.show('请先在列表中勾选您要发送的数据行');
        }

    };

    /**
     * 导出excel文件
     */
    W.exportCvs = function () {
        $('#search-form-id')
            .off('submit').attr('action', 'dna/report/exportExcel').attr('method', 'post').attr('target', '_blank').submit()
            .on('submit', searchFormSubmitHandler).removeAttr('action').removeAttr('target');
    };

})(window);