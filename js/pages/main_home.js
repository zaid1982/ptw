function MainHome() {

    const className = 'MainHome';
    let self = this;
    let modalConfirmDeleteClass;
    let refClient;
    let refSite;
    let refContract;
    let refUser;
    let refPpmGroup;
    let refAssetGroup;
    let refAssetCategory;
    let refAssetType;
    let refStatus;
    let userClient;
    let clientId = '1';
    let siteId = '0';
    let currentMonth;
    let currentYear;
    let reportId = '2';
    let reportType = 'Work Order';
    let oTableWo;
    let oTablePpm;
    let totalPpm = 0;
    let totalLate = 0;
    const monthFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.init = function () {

        self.generateChartWoBySite();
        self.generateChartWoByCategory();
        self.generateChartWoByType();
        self.generateChartWoTop5Execute();
       // self.generateChartWoBottom5Execute();
        //self.runChart();
    };

    this.setOptionSite = function () {
        siteId = '0';
        $('#divHmeSite').html('');
        $.each(refSite, function (_siteId, _site) {
            if (typeof _site !== 'undefined') {
                if (_site['clientId'] === clientId) {
                    $('#divHmeSite').append('<a class="dropdown-item lnkHmeSite" href="#" id="lnkHmeSite_'+_siteId+'">'+_site['siteDesc']+'</a>');
                }
            }
        });
        $('#lnkHmeSite_'+siteId).addClass('active').addClass('text-white');

        $('.lnkHmeSite').off('click').on('click', function () {
            const linkId = $(this).attr('id');
            const linkIndex = linkId.indexOf('_');
            ShowLoader();
            setTimeout(function () {
                try {
                    if (linkIndex > 0) {
                        $('#lnkHmeSite_'+siteId).removeClass('active').removeClass('text-white');
                        siteId = linkId.substr(linkIndex + 1);
                        $('#lnkHmeSite_'+siteId).addClass('active').addClass('text-white');
                        self.runChart();
                    }
                } catch (e) {
                    toastr['error'](e.message, _ALERT_TITLE_ERROR);
                }
                HideLoader();
            }, 200);
        });
    };

    this.runChart = function () {
        if (reportId === '1') {
            $('.divHmeTopStats_ppm, #divHmeTable_ppm').show();
            $('.divHmeTopStats_wo, #divHmeTable_wo').hide();
            self.generateTotalAsset();
            self.generateTotalPpmTask();
            self.generateTotalPpmLate();
            self.generatePercPpmDone();
            self.generateChartPpmBySite();
            self.generateChartPpmByTrade();
            self.generateChartPpmTop5Execute();
            self.generateChartPpmBottom5Execute();
            self.generateChartPpmAverageExecuteByTrade();
            self.genTableHmeDataPpm();
        } else if (reportId === '2') {
            $('.divHmeTopStats_ppm, #divHmeTable_ppm').hide();
            $('.divHmeTopStats_wo, #divHmeTable_wo').show();
            self.generateChartWoBySite();
            self.generateChartWoByCategory();
            self.generateChartWoByTrade();
            self.generateChartWoAverageExecuteByTrade();
            self.generateChartWoTop5Execute();
            self.generateChartWoBottom5Execute();
            self.genTableHmeDataWo();
        }
        $('#lblHmeSelected').html(reportType+' <i>('+refClient[clientId]['clientName']+' - '+refSite[siteId]['siteDesc']+', '+monthFull[currentMonth]+' '+currentYear+')</i>');
    };

    this.generateChartWoBySite = function () {
        const series = [{name: "Completed", woTaskStatus: "16", data: [63, 57]},
            {name: "Completed", woTaskStatus: "16", data: [63, 57]},
            {name: "Responding", woTaskStatus: "24|26", data: [5, 6]},
            {name: "In Progress", woTaskStatus: "13|21", data: [9, 17]},
            {name: "Verify", woTaskStatus: "15", data: [1, 9]},
            {name: "Cancelled", woTaskStatus: "25", data: [6, 4]}];

        Highcharts.chart('chartHme1', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'PTW'
            },
            subtitle: {
                text: 'Total PTW by Status'
            },
            xAxis: {
                categories: ['Normal', 'Critical'],
                title: {
                    text: ''
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total PTW'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    },
                    borderRadius: 3,
                    borderWidth: 0
                },
                series: {
                    point: {
                        events: {
                            click: function(event) {
                                //oTableWo.search('').columns().search('').draw();
                                // oTableWo.column(16).search(siteIds[siteDescs.indexOf(this.category)], false, true, false);
                                // oTableWo.column(18).search(event.point.series.userOptions.woTaskStatus, true, false).draw();
                            }
                        }
                    }
                }
                /*series: {
                    events: {
                        legendItemClick: function () {
                            const visibility = this.visible ? 'visible' : 'hidden';
                            if (!confirm('The series is currently ' +
                                visibility + '. Do you want to change that?')) {
                                return false;
                            }
                        }
                    }
                }*/
            },
            /*legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 40,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },*/
            credits: {
                enabled: false
            },
            series: series
        });
    };

    this.generateChartWoByCategory = function () {
        const series = [
            {name: "Near Miss", data: [63, 57, 13, 23, 3]},
            {name: "Accident", data: [5, 6, 6, 12, 1]},
            {name: "Security Incident", data: [9, 17, 23, 43, 23]}]

        Highcharts.chart('chartHme2', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Incident'
            },
            subtitle: {
                text: 'Total Incident by Event'
            },
            xAxis: {
                categories: ['Health', 'Safety', 'Fire', 'Environment', 'Security'],
                title: {
                    text: ''
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Incident'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
            },
            plotOptions: {
                column: {
                    dataLabels: {
                        enabled: true
                    },
                    borderRadius: 3,
                    borderWidth: 0
                },
                series: {
                    point: {
                        events: {
                            click: function(event) {
                                //oTableWo.search('').columns().search('').draw();
                                // oTableWo.column(16).search(siteIds[siteDescs.indexOf(this.category)], false, true, false);
                                // oTableWo.column(18).search(event.point.series.userOptions.woTaskStatus, true, false).draw();
                            }
                        }
                    }
                }
                /*series: {
                    events: {
                        legendItemClick: function () {
                            const visibility = this.visible ? 'visible' : 'hidden';
                            if (!confirm('The series is currently ' +
                                visibility + '. Do you want to change that?')) {
                                return false;
                            }
                        }
                    }
                }*/
            },
            /*legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -10,
                y: 40,
                floating: true,
                borderWidth: 1,
                backgroundColor:
                    Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
                shadow: true
            },*/
            credits: {
                enabled: false
            },
            series: series
        });
    };

    this.generateChartWoByType = function () {
        const series = [
            {name: "Open", y: 15},
            {name: "Close", y: 35}];

        Highcharts.chart('chartHme3', {
            chart: {
                type: 'pie'
            },
            title: {
                text: 'Action Tracking & Reporting'
            },
            subtitle: {
                text: 'ATAR by Status'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y} - {point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        formatter: function() {
                            if (this.y !== 0) {
                                return this.y;
                            } else {
                                return null;
                            }
                        },
                        //format: '<b>{point.name}</b><br>{point.y}',
                        distance: -20
                    },
                    showInLegend: true,
                    borderWidth: 0
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Total',
                colorByPoint: true,
                data: series
            }]
        });
    };

    this.generateChartWoByProgress = function () {
        $.ajax({
            url: 'api/wo.php?type=total_by_status&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme5', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Work Order Progress'
                        },
                        subtitle: {
                            text: 'Total Work Order by Current Progress'
                        },
                        xAxis: {
                            categories: resp.result.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total WO',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y} - {point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTableWo.search('').columns().search('').draw();
                                            oTableWo.column(18).search(this.woTaskStatus, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Total',
                            data: resp.result.data,
                            color: '#f45b5b'
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartWoByTrade = function () {
        $.ajax({
            url: 'api/wo.php?type=total_by_group&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme3', {
                        chart: {
                            type: 'pie'
                        },
                        title: {
                            text: 'Trade'
                        },
                        subtitle: {
                            text: 'Total Work Order by Trade'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y} - {point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    formatter: function() {
                                        if (this.y !== 0) {
                                            return this.y;
                                        } else {
                                            return null;
                                        }
                                    },
                                    //format: '<b>{point.name}</b><br>{point.y}',
                                    distance: -20
                                },
                                showInLegend: true,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTableWo.search('').columns().search('').draw();
                                            oTableWo.column(17).search(this.ppmGroupId, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Total',
                            colorByPoint: true,
                            data: resp.result
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartWoAverageExecuteByTrade = function () {
        $.ajax({
            url: 'api/wo.php?type=average_execute_by_trade&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme4', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Execution Time'
                        },
                        subtitle: {
                            text: 'Average Execution Time by Trade'
                        },
                        xAxis: {
                            categories: resp.result.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Average WO Execution Time (minutes)'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.display} ({point.y:.2f} minutes)</b>'
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.display}</b>',
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTableWo.search('').columns().search('').draw();
                                            oTableWo.column(10).search(this.ppmGroupName, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Average Time',
                            data: resp.result.data,
                            color: '#00b8d4'
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartWoTop5Execute = function () {
        const series = [
            {color: "#1b5e20", y: 35},
            {color: "#388e3c", y: 33},
            {color: "#4caf50", y: 23},
            {color: "#81c784", y: 16},
            {color: "#c8e6c9", y: 12}];

        Highcharts.chart('chartHme5', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Top 5 Submission'
            },
            subtitle: {
                text: 'The Most Submission U See U Act'
            },
            xAxis: {
                categories: ['Mohd Shafari Bin Saharuddin', 'Nabil Fikri bin Mahat', 'Azman Redza bin Badzly', 'Izzudin bin Lee', 'Shifaa bte Harun'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total Submission',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    },
                    borderRadius: 3,
                    borderWidth: 0
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Total',
                data: series
            }]
        });
    };

    this.generateChartWoBottom5Execute = function () {
        const series = [
            {color: "#ffccbc", y: 35},
            {color: "#ff8a65", y: 33},
            {color: "#ff5722", y: 23},
            {color: "#e64a19", y: 16},
            {color: "#bf360c", y: 12}];

        Highcharts.chart('chartHme6', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Bottom 5 Executor'
            },
            subtitle: {
                text: 'The Most Submission U See U Act'
            },
            xAxis: {
                categories: ['Mohd Shafari Bin Saharuddin', 'Nabil Fikri bin Mahat', 'Azman Redza bin Badzly', 'Izzudin bin Lee', 'Shifaa bte Harun'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Total WO Executed',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    },
                    borderRadius: 3,
                    borderWidth: 0
                }
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Total',
                data: series
            }]
        });
    };

    this.generateChartPpmBySite = function () {
        $.ajax({
            url: 'api/ppm.php?type=total_by_site_status&clientId='+clientId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    let siteDescs = [];
                    let siteIds = resp.result.categories;
                    siteIds.forEach(function(key){
                        siteDescs.push(refSite[key]['siteDesc']);
                    });
                    Highcharts.chart('chartHme1', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'PPM By Site'
                        },
                        subtitle: {
                            text: 'Total PPM Status by Site'
                        },
                        xAxis: {
                            categories: siteDescs,
                            title: {
                                text: ''
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total PPM'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function (event) {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(27).search(siteIds[siteDescs.indexOf(this.category)], false, true, false);
                                            oTablePpm.column(30).search(event.point.series.userOptions.ppmTaskStatus, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: resp.result.series
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartPpmByTrade = function () {
        $.ajax({
            url: 'api/ppm.php?type=total_by_site_trade&clientId='+clientId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    let siteDescs = [];
                    let siteIds = resp.result.categories;
                    siteIds.forEach(function(key){
                        siteDescs.push(refSite[key]['siteDesc']);
                    });
                    Highcharts.chart('chartHme2', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'PPM By Trade'
                        },
                        subtitle: {
                            text: 'Total PPM by Trade'
                        },
                        xAxis: {
                            categories: siteDescs,
                            crosshair: true
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total PPM'
                            }
                        },
                        tooltip: {
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true
                                },
                                borderWidth: 0,
                                borderRadius: 3
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function(event) {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(27).search(siteIds[siteDescs.indexOf(this.category)], false, true, false);
                                            oTablePpm.column(29).search(event.point.series.userOptions.assetGroupId, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: resp.result.series
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartPpmByTradePerSite = function () {
        $.ajax({
            url: 'api/ppm.php?type=total_by_trade&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme3', {
                        chart: {
                            type: 'pie'
                        },
                        title: {
                            text: 'PPM Trade'
                        },
                        subtitle: {
                            text: 'Total PPM by Trade'
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y} - {point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    formatter: function() {
                                        if (this.y !== 0) {
                                            return this.y;
                                        } else {
                                            return null;
                                        }
                                    },
                                    distance: -20
                                },
                                showInLegend: true,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(29).search(this.assetGroupId, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Total',
                            colorByPoint: true,
                            innerSize: '30%',
                            data: resp.result
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartPpmByProgress = function () {
        $.ajax({
            url: 'api/ppm.php?type=total_by_status&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme4', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'PPM Progress'
                        },
                        subtitle: {
                            text: 'Total PPM by Current Progress'
                        },
                        xAxis: {
                            categories: resp.result.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total PPM',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.y} - {point.percentage:.1f}%</b>'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(30).search(this.ppmTaskStatus, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Total',
                            data: resp.result.data,
                            color: '#f45b5b'
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartPpmByLateness = function () {
        if (totalPpm >= totalLate) {
            Highcharts.chart('chartHme3', {
                chart: {
                    type: 'pie'
                },
                title: {
                    text: 'PPM Lateness'
                },
                subtitle: {
                    text: 'Total PPM Execution by Lateness Status'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.y} - {point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            formatter: function () {
                                if (this.y !== 0) {
                                    return this.y;
                                } else {
                                    return null;
                                }
                            },
                            //format: '<b>{point.name}</b><br>{point.y}',
                            distance: -20
                        },
                        showInLegend: true,
                        borderWidth: 0
                    },
                    series: {
                        point: {
                            events: {
                                click: function () {
                                    oTablePpm.search('').columns().search('').draw();
                                    oTablePpm.column(24).search(this.name, true, false).draw();
                                }
                            }
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Total',
                    colorByPoint: true,
                    data: [
                        {
                            name: 'Late',
                            y: totalLate,
                            sliced: true,
                            selected: true,
                            color: '#f45b5b'
                        }, {
                            name: 'On-time',
                            y: totalPpm - totalLate
                        }]
                }]
            });
        }
    };

    this.generateChartPpmTop5Execute = function () {
        $.ajax({
            url: 'api/ppm.php?type=top5_execute&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme5', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Top 5 Executor'
                        },
                        subtitle: {
                            text: 'Total PPM Executed'
                        },
                        xAxis: {
                            categories: resp.result.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total PPM Executed',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(32).search(this.ppmTaskServicedBy, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Total',
                            data: resp.result.data
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartPpmBottom5Execute = function () {
        $.ajax({
            url: 'api/ppm.php?type=bottom5_execute&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme6', {
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: 'Bottom 5 Executor'
                        },
                        subtitle: {
                            text: 'Total PPM Executed'
                        },
                        xAxis: {
                            categories: resp.result.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Total PPM Executed',
                                align: 'high'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                    //format: '<b>{point.woTaskFixedBy}</b>',
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(32).search(this.ppmTaskServicedBy, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Total',
                            data: resp.result.data
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.generateChartPpmAverageExecuteByTrade = function () {
        $.ajax({
            url: 'api/ppm.php?type=average_execute_by_trade&clientId='+clientId+'&siteId='+siteId+'&year='+currentYear+'&month='+currentMonth,
            type: 'GET', headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
            dataType: 'json', async: true,
            success: function (resp) {
                if (resp.success) {
                    Highcharts.chart('chartHme4', {
                        chart: {
                            type: 'column'
                        },
                        title: {
                            text: 'Execution Time'
                        },
                        subtitle: {
                            text: 'Average Execution Time by Trade'
                        },
                        xAxis: {
                            categories: resp.result.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: 'Average PPM Execution Time (minutes)'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.display} ({point.y:.2f} minutes)</b>'
                        },
                        plotOptions: {
                            column: {
                                dataLabels: {
                                    enabled: true,
                                    format: '<b>{point.display}</b>',
                                },
                                borderRadius: 3,
                                borderWidth: 0
                            },
                            series: {
                                point: {
                                    events: {
                                        click: function() {
                                            oTablePpm.search('').columns().search('').draw();
                                            oTablePpm.column(29).search(this.assetGroupId, true, false).draw();
                                        }
                                    }
                                }
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        series: [{
                            name: 'Average Time',
                            data: resp.result.data,
                            color: '#00b8d4'
                        }]
                    });
                } else {
                    throw new Error(_ALERT_MSG_ERROR_DEFAULT);
                }
            },
            error: function () {
                throw new Error(_ALERT_MSG_ERROR_DEFAULT);
            }
        });
    };

    this.deleteWo = function (_woTaskId) {
        ShowLoader();
        setTimeout(function () {
            try {
                mzCheckFuncParam([_woTaskId]);
                mzAjaxRequest('wo.php?woTaskId='+_woTaskId, 'DELETE');
                self.genTableHmeDataWo();
            } catch (e) {
                toastr['error'](e.message, _ALERT_TITLE_ERROR);
            }
            HideLoader();
        }, 300);
    };

    this.getClassName = function () {
        return className;
    };

    this.setRefClient = function (_refClient) {
        refClient = _refClient;
    };

    this.setRefSite = function (_refSite) {
        refSite = _refSite;
    };

    this.setRefContract = function (_refContract) {
        refContract = _refContract;
    };

    this.setRefUser = function (_refUser) {
        refUser = _refUser;
    };

    this.setRefPpmGroup = function (_refPpmGroup) {
        refPpmGroup = _refPpmGroup;
    };

    this.setRefAssetGroup = function (_refAssetGroup) {
        refAssetGroup = _refAssetGroup;
    };

    this.setRefAssetCategory = function (_refAssetCategory) {
        refAssetCategory = _refAssetCategory;
    };

    this.setRefAssetType = function (_refAssetType) {
        refAssetType = _refAssetType;
    };

    this.setRefStatus = function (_refStatus) {
        refStatus = _refStatus;
    };

    this.setModalConfirmDeleteClass = function (_modalConfirmDeleteClass) {
        modalConfirmDeleteClass = _modalConfirmDeleteClass;
    };
}