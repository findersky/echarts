/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['exports', 'echarts'], factory);
    } else if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        // CommonJS
        factory(exports, require('echarts'));
    } else {
        // Browser globals
        factory({}, root.echarts);
    }
}(this, function (exports, echarts) {
    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    }
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }
    if (!echarts.registerMap) {
        log('ECharts Map is not loaded')
        return;
    }


    const boundaryLineNameMap = {
        156990000: '南海',
        156980000: '香港特别行政区',
        156970000: '新疆维吾尔自治区附近',
        156950000: '海南省海域与广东省海域',
        156940000: '江苏省与上海市沿江',
        156930000: '浙江省海域与上海市海域',
        156910000: '浙江省海域与福建省海域',
        156900000: '广东省海域与福建省海域',
        156659900: '',
        156653199: '',
        156653099: ''
    };
    geoJSON.features.forEach((feature) => {
        const properties = feature.properties;
        const gbcode = properties.gb;
        if (properties.name === '境界线' || (gbcode in boundaryLineNameMap)) {
            // Because they may have different style, we use different names.
            properties.name = (boundaryLineNameMap[gbcode] || gbcode) + '境界线';

            const echartsStyle = properties.echartsStyle = {
                z: 10,
                silent: true,
                label: {
                    show: false
                },
                emphasis: {
                    label: {
                        show: false
                    }
                }
            };
            if (
                gbcode === '156980000' ||
                gbcode === '156970000' ||
                gbcode === '156659900' ||
                gbcode === '156653199' ||
                gbcode === '156653099'
            ) {
                echartsStyle.itemStyle = (echartsStyle.itemStyle || {});
                echartsStyle.itemStyle = {
                    borderType: [5, 5],
                    borderWidth: 2
                };
            }
            if (gbcode === '156970000') {
                echartsStyle.itemStyle = (echartsStyle.itemStyle || {});
                // Developers should set this to chart background color
                echartsStyle.itemStyle.borderColor = '#fff';
            }
        }
    });

    echarts.registerMap('china', geoJSON);
}));