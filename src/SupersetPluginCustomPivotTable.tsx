/**
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
import React, { useEffect, useState } from 'react';
// import { styled } from '@superset-ui/core';
import { SupersetPluginCustomPivotTableProps } from './types';
// , SupersetPluginCustomPivotTableStylesProps
import { SheetComponent, SheetComponentOptions, Switcher } from '@antv/s2-react';

import {
  S2DataConfig,
  ThemeCfg,
  setLang,
  BaseEvent,
  S2Event,
  getPalette
} from '@antv/s2';
// import { emitFilterControl } from '@superset-ui/chart-controls';
// S2Options, TooltipContentType, Pagination, Aggregation
// import '@antv/s2-react/dist/style.min.css';

// The following Styles component is a <div> element, which has been styled using Emotion
// For docs, visit https://em.sh/docs/styled

// Theming variables are provided for your use via a ThemeProvider
// imported from @superset-ui/core. For variables available, please visit
// https://github.com/apache-superset/superset-ui/blob/master/packages/superset-ui-core/src/style/index.ts

const css = `
.antv-s2-html-icon{display:inline-block}.antv-s2-html-icon svg{width:12px;height:12px}.antv-s2-tooltip-operator{color:#000000a6;font-size:12px;line-height:32px;background:#f9f9f9;padding:0 12px;border:0;cursor:pointer}.antv-s2-tooltip-operator .ant-dropdown-trigger,.antv-s2-tooltip-operator-dropdown{padding:0 6px 0 0}.antv-s2-tooltip-operator-menus.ant-menu-vertical.ant-menu{font-size:12px;line-height:32px;color:#000000a6;border:0;margin:0 -12px}.antv-s2-tooltip-operator-menus.ant-menu-vertical.ant-menu .ant-menu-item{height:30px}.antv-s2-tooltip-operator-menus.ant-menu-vertical.ant-menu .ant-menu-item:not(:last-child){margin:0}.antv-s2-tooltip-operator-menus.ant-menu-vertical.ant-menu .ant-menu-submenu>.ant-menu-submenu-title{height:30px}.antv-s2-tooltip-operator-menus.ant-menu-vertical.ant-menu .ant-menu-submenu>.ant-menu-submenu-title .ant-menu-submenu-arrow{color:#000000a6}.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-item,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-item,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-item,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-item{font-size:12px;line-height:32px;padding:0 12px;border:0;margin:0}.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-item:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-item:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-item:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-item:not(.ant-menu-item-active){color:#000000a6}.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title{padding:0 12px;font-size:12px;line-height:32px;margin:0}.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title:not(.ant-menu-item-active),.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title:not(.ant-menu-item-active){color:#000000a6}.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title .ant-dropdown-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-dropdown-menu-submenu-vertical .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-dropdown-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title .ant-menu-title-content,.antv-s2-tooltip-operator-menus.ant-menu-vertical .ant-menu-submenu-vertical .ant-menu-submenu-title .ant-menu-title-content{margin-right:12px}.antv-s2-tooltip-operator-submenu-popup .ant-dropdown-menu-item,.antv-s2-tooltip-operator-submenu-popup .ant-menu-item{font-size:12px;line-height:32px;padding:0 12px}.antv-s2-tooltip-operator-submenu-popup .ant-dropdown-menu-item:not(.ant-menu-item-active),.antv-s2-tooltip-operator-submenu-popup .ant-menu-item:not(.ant-menu-item-active){color:#000000a6}.antv-s2-tooltip-operator-submenu-popup .ant-menu-vertical .ant-menu-item{margin:0;height:30px;line-height:32px}.antv-s2-tooltip-operator-submenu-popup .ant-menu-vertical .ant-menu-item:not(:last-child){margin:0}.antv-s2-tooltip-operator-icon{vertical-align:middle;margin-right:4px}.antv-s2-tooltip-operator-icon svg{width:12px;height:12px}.antv-s2-tooltip-container{position:fixed;user-select:text;min-width:200px;max-width:640px;max-height:100vh;overflow:auto;z-index:1024;display:inline-block;background:rgba(255,255,255,.96);border-radius:2px;box-shadow:0 1px 4px #0003;font-size:12px;font-family:Roboto,PingFang SC,Chinese Quote,BlinkMacSystemFont,Segoe UI,Hiragino Sans GB,Microsoft YaHei,Helvetica Neue,Helvetica,Arial,sans-serif}.antv-s2-tooltip-container-hide{opacity:0;visibility:hidden;pointer-events:none}.antv-s2-tooltip-container-hide *{transition:none}.antv-s2-tooltip-container-show{opacity:1;visibility:visible;pointer-events:all}.antv-s2-tooltip-tips,.antv-s2-tooltip-name{padding:12px;line-height:16px;overflow-wrap:break-word;color:#000000d9}.antv-s2-tooltip-description{padding:0 12px 12px;line-height:16px;overflow-wrap:break-word;color:#000000a6}.antv-s2-tooltip-tips{padding:4px 12px;color:#00000073}.antv-s2-tooltip-infos{padding:4px 12px;line-height:20px;color:#00000073;overflow:hidden;text-overflow:ellipsis;-webkit-line-clamp:2;display:-webkit-box;-webkit-box-orient:vertical;overflow-wrap:break-word;background:rgba(249,249,249,.96);border-radius:0 0 2px 2px;background-color:#f9f9f9}.antv-s2-tooltip-summary{line-height:20px;color:#000000a6;overflow:hidden;padding:12px}.antv-s2-tooltip-summary-item{display:flex}.antv-s2-tooltip-summary-key{margin-right:20px}.antv-s2-tooltip-summary-val{flex:1;text-align:right;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.antv-s2-tooltip-interpretation{color:#000000a6;overflow:hidden;padding:12px}.antv-s2-tooltip-interpretation+.antv-s2-tooltip-head-info-list{border-top:1px solid #e9e9e9}.antv-s2-tooltip-interpretation .antv-s2-tooltip-interpretation-head{margin-bottom:12px}.antv-s2-tooltip-interpretation .antv-s2-tooltip-interpretation-head .antv-s2-tooltip-interpretation-icon{width:14px;height:14px}.antv-s2-tooltip-interpretation .antv-s2-tooltip-interpretation-head .antv-s2-tooltip-interpretation-name{color:#000}.antv-s2-tooltip-head-info-list{color:#a2a2a2;padding:12px 12px 4px;line-height:20px}.antv-s2-tooltip-bold,.antv-s2-tooltip-selected{font-weight:700}.antv-s2-tooltip-selected{margin-right:5px}.antv-s2-tooltip-highlight{color:#000000d9}.antv-s2-tooltip-detail-list{padding:2px 12px 8px}.antv-s2-tooltip-detail-list .antv-s2-tooltip-detail-item{color:#000000a6;overflow:hidden;margin:4px 0;display:flex;justify-content:space-around;align-items:center}.antv-s2-tooltip-detail-list .antv-s2-tooltip-detail-item-key{margin-right:20px}.antv-s2-tooltip-detail-list .antv-s2-tooltip-detail-item-val{flex:1;text-align:right;text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.ant-dropdown-menu-item.operation-item{font-size:12px}.antv-s2-icon{color:inherit;vertical-align:-.125em}.antv-s2-advanced-sort{display:inline-block}.antv-s2-advanced-sort-btn.ant-btn{display:flex;align-items:center}.antv-s2-advanced-sort-btn.ant-btn .antv-s2-icon{padding-top:2px}.antv-s2-advanced-sort-modal{min-width:640px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-sider-layout.ant-layout-sider{border-right:1px solid #d9d9d9;background:#fff}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-sider-layout .antv-s2-advanced-sort-title{font-size:12px;padding:8px 16px;border-bottom:1px solid #d9d9d9}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-sider-layout .antv-s2-advanced-sort-dimension-item{height:32px;padding:8px 5px;cursor:pointer;align-items:center;color:#000000a6;font-size:12px;margin-left:10px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout{background:#fff}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-title{font-size:12px;padding:8px 16px;border-bottom:1px solid #d9d9d9}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form{padding:8px 0 0 16px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-form-item-label>label,.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-select,.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-select-item,.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-form label{font-size:12px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-radio-group{margin-left:16px;font-size:12px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-form-item{margin-bottom:4px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-form-item .ant-cascader-picker,.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-form-item .ant-select{width:120px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-custom-form.ant-form .ant-form-item-control-input-content{display:flex;align-items:center}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-rule-end{margin-left:16px;font-size:12px}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-rule-end label{font-size:12px;margin:0}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-rule-end-delete{cursor:pointer;right:0;position:absolute}.antv-s2-advanced-sort-modal .antv-s2-advanced-sort-content-layout .antv-s2-advanced-sort-field-prefix{position:relative;padding:0 6px;color:#000000a6;font-weight:400;font-size:12px;text-align:center;background-color:#fafafa;border:1px solid #d9d9d9;border-radius:2px 0 0 2px;height:24px;display:inline-block;line-height:21px;margin-left:8px}.antv-s2-advanced-sort-modal .ant-cascader-menus{height:100px}.antv-s2-advanced-sort-modal .ant-cascader-menus ul{height:104px}.antv-s2-advanced-sort-modal .ant-cascader-menu-item,.antv-s2-advanced-sort-modal .ant-cascader-picker-label{font-size:12px}.antv-s2-advanced-sort-custom-modal .antv-s2-advanced-sort-card-content .ant-card-body{padding:0;font-size:12px}.antv-s2-advanced-sort-custom-modal .antv-s2-advanced-sort-card-content .ant-card-body .antv-s2-advanced-sort-split-value{height:32px;color:#333;line-height:32px;padding:0 10px 0 7px}.antv-s2-advanced-sort-custom-modal .antv-s2-advanced-sort-card-content .ant-card-body .antv-s2-advanced-sort-split-value .antv-s2-advanced-sort-split-icon{float:right;cursor:pointer;width:30px}.antv-s2-advanced-sort-custom-modal .antv-s2-advanced-sort-card-content .ant-card-body .antv-s2-advanced-sort-split-value:nth-child(odd){background:#f7f9fb}.antv-s2-switcher-item{height:24px;border-radius:3px;display:flex}.antv-s2-switcher-item-text{overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.antv-s2-switcher-item.normal-item{padding:0 12px;background-color:#d9eeff;align-items:center}.antv-s2-switcher-item.checkable-item{padding:0 4px;background-color:#d3f4e5;align-items:baseline}.antv-s2-switcher-item.checkable-item.item-collapse{transition:border-radius 0s .2s;border-radius:3px!important}.antv-s2-switcher-item.checkable-item.unchecked{color:#00000040}.antv-s2-switcher-item.checkable-item:not(:last-child){border-radius:3px 3px 0 0}.antv-s2-switcher-item.checkable-item .ant-checkbox{margin-right:4px}.antv-s2-switcher-normal-list,.antv-s2-switcher-checkable-list{border-radius:3px}.antv-s2-switcher-normal-list+.antv-s2-switcher-normal-list,.antv-s2-switcher-normal-list+.antv-s2-switcher-checkable-list,.antv-s2-switcher-checkable-list+.antv-s2-switcher-normal-list,.antv-s2-switcher-checkable-list+.antv-s2-switcher-checkable-list{margin-top:4px}.antv-s2-switcher-normal-list.dragging,.antv-s2-switcher-checkable-list.dragging{box-shadow:0 0 2px 1px #0000001a}.antv-s2-switcher-normal-list.disable-dragging,.antv-s2-switcher-checkable-list.disable-dragging{cursor:not-allowed}.antv-s2-switcher-normal-list .child-items,.antv-s2-switcher-checkable-list .child-items{transition:max-height .2s,opacity .4s;overflow:hidden;max-height:1000px}.antv-s2-switcher-normal-list .child-items .checkable-item,.antv-s2-switcher-checkable-list .child-items .checkable-item{padding:0 12px;background-color:#effbf6;margin-top:0;border-radius:0}.antv-s2-switcher-normal-list .child-items .checkable-item:last-child,.antv-s2-switcher-checkable-list .child-items .checkable-item:last-child{border-radius:0 0 3px 3px}.antv-s2-switcher-normal-list .child-items.item-hidden,.antv-s2-switcher-checkable-list .child-items.item-hidden{max-height:0;opacity:0}.antv-s2-switcher-tooltip .ant-tooltip-inner{max-width:180px}.antv-s2-switcher-dimension{width:185px;background-color:transparent}.antv-s2-switcher-dimension.long-dimension{grid-row:span 2}.antv-s2-switcher-dimension-header{display:flex;align-items:center;margin-bottom:8px;justify-content:space-between;height:18px}.antv-s2-switcher-dimension-header .title{display:inline-flex;align-items:center}.antv-s2-switcher-dimension-header .title span{margin-left:8px}.antv-s2-switcher-dimension-header .expand-option .description{margin-left:4px}.antv-s2-switcher-dimension-items{height:calc(100% - 22px);min-height:120px;max-height:160px;padding:8px;border:1px solid rgba(0,0,0,.15);border-radius:3px;overflow-y:auto}.antv-s2-switcher-dimension-items-highlight{border:1px solid #6b9cff;box-shadow:0 0 2px 1px #2e5bd933}.antv-s2-switcher-dimension-items::-webkit-scrollbar-thumb{border-radius:5px;background-color:#00000026}.antv-s2-switcher-dimension-items::-webkit-scrollbar-thumb:hover{background-color:#00000040}.antv-s2-switcher-dimension-items::-webkit-scrollbar{width:6px}.antv-s2-switcher-dimension-long-items{max-height:358px}.antv-s2-switcher-content-header,.antv-s2-switcher-content-main{margin-bottom:16px}.antv-s2-switcher-content-header{font-size:14px;font-weight:700}.antv-s2-switcher-content-main{display:grid;grid-gap:16px;grid-auto-flow:column;font-size:12px}.antv-s2-switcher-content-three-dimensions{grid-template-rows:1fr 1fr;grid-template-columns:1fr 1fr}.antv-s2-switcher-content-one-dimension{grid-template-rows:1fr;grid-template-columns:1fr}.antv-s2-switcher-content-footer{display:flex;align-items:center;justify-content:space-between}.antv-s2-switcher-content-footer-reset-button.ant-btn{font-size:14px;padding:0}.antv-s2-switcher-content-footer-actions .action-button+.action-button{margin-left:8px}.antv-s2-switcher-content .ant-checkbox-inner{height:14px;width:14px}.antv-s2-switcher-content .ant-checkbox-inner:after{width:4.8px;height:8px}.antv-s2-switcher-entry-button.ant-btn{display:inline-flex;align-items:center}.s2-header{padding:0;margin:0 0 16px;box-sizing:border-box;color:#000000d9;font-size:14px;list-style:none;position:relative;background-color:#fff}.s2-header-heading{display:flex;flex-wrap:wrap;justify-content:space-between}.s2-header-heading-left{display:flex;align-items:center;margin:4px 0;overflow:hidden}.s2-header-heading-title{margin-right:12px;margin-bottom:0;color:#000000d9;font-weight:600;font-size:20px;line-height:32px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.s2-header-heading-extra{display:flex;align-items:center;margin:4px 0;white-space:nowrap}.s2-header-heading-extra .antv-s2-icon{margin-right:2px}.s2-header-heading-extra>*{white-space:unset}.s2-header-content{padding-top:12px}.antv-s2-spin.ant-spin-nested-loading,.antv-s2-spin>.ant-spin-container{height:100%}.antv-s2-wrapper{padding:0;margin:0;display:flex;flex-direction:column;height:100%}.antv-s2-container{overflow:auto;flex:1 1 auto}.antv-s2-container canvas{display:block}.antv-s2-pagination{display:flex;align-items:center;z-index:1024}.antv-s2-pagination-count{margin-left:12px;text-overflow:ellipsis;white-space:nowrap;max-width:64px}.s2-strategy-sheet-tooltip{line-height:20px;font-size:12px;color:#000000a6;overflow:hidden;padding:12px}.s2-strategy-sheet-tooltip ul,.s2-strategy-sheet-tooltip li{list-style:none;margin:0;padding:0}.s2-strategy-sheet-tooltip .s2-strategy-sheet-tooltip-divider{border-top:1px solid #e9e9e9;margin:10px -12px}.s2-strategy-sheet-tooltip .s2-strategy-sheet-tooltip-description{overflow-wrap:break-word}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-row .s2-strategy-sheet-tooltip-value{font-weight:700}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-col .s2-strategy-sheet-tooltip-name{margin-right:20px}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-col .s2-strategy-sheet-tooltip-value{color:#000000d9}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-header{display:flex;justify-content:space-between;align-items:center}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-header .header-label{font-weight:700;margin-right:20px}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-original-value{text-align:right}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values{position:relative;margin:0;padding:0;list-style:none}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item{display:flex;justify-content:space-between;align-items:center}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item .derived-value-group{color:#000000a6;margin-left:10px}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item .derived-value-group .derived-value-trend-icon{display:inline-block;width:0;height:0;margin-right:4px;border-right:4px solid transparent;border-bottom:9px solid #000;border-left:4px solid transparent;transform:rotate(0)}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item .derived-value-group.derived-value-trend-up{color:#f46649}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item .derived-value-group.derived-value-trend-up .derived-value-trend-icon{border-bottom-color:#f46649}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item .derived-value-group.derived-value-trend-down{color:#2aa491}.s2-strategy-sheet-tooltip.s2-strategy-sheet-tooltip-data .s2-strategy-sheet-tooltip-derived-values li.derived-value-item .derived-value-group.derived-value-trend-down .derived-value-trend-icon{transform:rotate(180deg);border-bottom-color:#2aa491}.s2-drill-down{width:260px;min-height:20px;position:relative}.s2-drill-down-header{display:flex;height:32px;font-size:14px;padding:0 16px;margin-top:16px}.s2-drill-down-header button{position:absolute;right:0;top:-4px;font-size:12px;color:#1890ff;letter-spacing:-.2px;line-height:20px}.s2-drill-down-search{height:24px;width:228px!important;margin:0 16px;border:1px solid rgba(0,0,0,.15);border-radius:2px;background-color:#fff}.s2-drill-down-search input,.s2-drill-down-search span{font-size:12px}.s2-drill-down-menu{max-height:314px;overflow-y:auto;overflow-x:hidden}.s2-drill-down-menu-item{height:32px!important;line-height:32px!important;font-size:12px;opacity:.65}.s2-drill-down-menu-item span:last-child{line-height:32px}.s2-drill-down-menu-item svg{margin-right:8px}.s2-drill-down-empty{padding:18px 18px 0;font-size:12px}.antv-s2-drag-copy-mask{position:absolute;top:-4px;left:-4px;z-index:9;background-color:#c2d5fe80;cursor:crosshair}.antv-s2-drag-copy-point{position:absolute;z-index:9;width:8px;height:8px;background-color:#c2d5fe;cursor:crosshair;user-select:none}.s2-edit-cell{position:absolute;box-shadow:0 0 0 2px #2a83fa!important;resize:none;box-sizing:border-box} .antv-s2-switcher-entry-button.ant-btn{margin-top: 30px;}
`;

/**
 * ******************* WHAT YOU CAN BUILD HERE *******************
 *  In essence, a chart is given a few key ingredients to work with:
 *  * Data: provided via `props.data`
 *  * A DOM element
 *  * FormData (your controls!) provided as props by transformProps.ts
 */

export default function SupersetPluginCustomPivotTable(props: SupersetPluginCustomPivotTableProps) {
  // height and width are the height and width of the DOM element as it exists in the dashboard.
  // There is also a `data` prop, which is, of course, your DATA 🎉
  // const { data, height, width } = props;
  const { data, width, height, cols, rows, metrics,
    headerText, footerText, totalLabel, subtotalLabel, allowPivoting,
    showRowTotals,
		showRowSubtotals,
		showColTotals,
		showColSubtotals,
    rowTotalAggr,
    rowSubtotalAggr,
    colTotalAggr,
    colSubtotalAggr,
    emitFilter
    , setDataMask
    , filterState
    , emitCrossFilters
    , filters
  } = props;

  console.log('-- Plugin props 1', props);
  console.dir(props);
  console.log(setDataMask);

  function getInitPalette() {
    // try {
    //   return JSON.parse(localStorage.getItem(STORE_KEY) || '');
    // } catch (err) {}
    const palette = getPalette('gray');
    console.log('-- getInitPalette --');
    let basicColors = palette.basicColors;
    basicColors[3] = '#FFFFFF';
    basicColors[10] = '#FFFFFF';
    console.dir(palette);
    const res = {...palette, basicColors };
    console.dir(res);
    return palette;
  }

  const [palette, setPalette] = useState(getInitPalette());
  // const [filterSet, setFilterState] = useState(filterState);

  console.log('-- palette --');
  console.dir(palette);
  // const rootElem = createRef<HTMLDivElement>();

  // Often, you just want to access the DOM and do whatever you want.
  // Here, you can do that with createRef, and the useEffect hook.
  useEffect(() => {
    // const root = rootElem.current as HTMLElement;
    // console.log('Plugin element', root);
  });

  // ************************************************
  // get metrics 
  let metricNames: any = [];
  let colNames: any = [];
  let rowNames: any = [];

  let i = 0;
  while (i < metrics.length) {
      metricNames.push(metrics[i]['label']);
      i++;
  }
  // console.log('metricNames', metricNames);

  i = 0;
  while (i < cols.length) {
    if(cols[i]['label'] == undefined) {
      colNames.push(cols[i]);
    } else {
      colNames.push(cols[i]['label']);
    }
    i++;
  }

  i = 0;
  while (i < rows.length) {
    if(rows[i]['label'] == undefined) {
      rowNames.push(rows[i]);
    } else {
      rowNames.push(rows[i]['label']);
    }
    i++;
  }

  const defaultFields = {
    rows: rowNames,
    columns: colNames,
    values: metricNames,
  };

  // const defaultSwitcherFields = {
  //   rows: rowNames.map((item: any) => ({id: item})),
  //   columns: colNames.map((item: any) => ({id: item})),
  //   values: metricNames.map((item: any) => ({id: item})),
  // };

  const defaultSwitcherFields = {
    rows: {
      items: rowNames.map((item: any) => ({id: item})),
    },
    columns: {
      items: colNames.map((item: any) => ({id: item})),
    },
    values: {
      selectable: true,
      items: metricNames.map((item: any) => ({id: item})),
    }
  };

  const [fields, setFields] = useState(defaultFields);
  const [switcherFields, setSwitcherFields] = useState(
    defaultSwitcherFields,
  );

  function generateSwitcherFields(updatedResult: any) {
    return {
      rows: { items: updatedResult.rows.items },
      columns: { items: updatedResult.columns.items },
      values: {
        selectable: true,
        items: updatedResult.values.items,
      },
    };
  }

  function generateFields(updatedResult: any) {
    return {
      rows: updatedResult.rows.items.map((i: any) => i.id),
      columns: updatedResult.columns.items.map((i: any) => i.id),
      values: updatedResult.values.items
        .filter(
          (i: any) =>
            !updatedResult.values.hideItems.find((hide: any) => hide.id === i.id),
        )
        .map((i: any) => i.id),
    };
  }

  const onSubmitSwitcher = (result: any) => {
    console.log('-- SupersetPluginCustomPivotTable -- result:', result);
    setFields(generateFields(result));
    setSwitcherFields(generateSwitcherFields(result));
  };

  console.log('-- SupersetPluginCustomPivotTable -- fields');
  console.dir(fields);
  console.log('-- SupersetPluginCustomPivotTable -- switcherFields');
  console.dir(switcherFields);

  const s2DataConfig: S2DataConfig = {
    data: data,
    fields: fields,
    /*{
      rows: rowNames,
      columns: colNames,
      values: metricNames
    },*/
    // filterParams: [
    //   {
    //       filterKey: 'Город',
    //       filteredValues: ['Москва'],
    //   }
    // ]
  };

  console.log('-- SupersetPluginCustomPivotTable --');
  console.dir(s2DataConfig);

  // Interactions
  class CellClick extends BaseEvent {
    filterSet = {};

    bindEvents() {
      this.spreadsheet.on(S2Event.COL_CELL_CLICK, (event) => {
        console.log('-- CellClick COL:');
        // console.dir(JSON.stringify(event));
        
        const cell = this.spreadsheet.getCell(event.target);
        const meta = cell.getMeta();
        if (meta.field != "$$extra$$") {
          // console.log(meta.field, ' = ', meta.value);
          const field = meta.field === undefined ? '' : meta.field.toString();
          const value = meta.value === undefined ? '' : meta.value.toString();
          // console.log(field, ' = ', value);
          
          console.log('-- this.filterSet 1 = ', this.filterSet);

          this.filterSet = {
            "extraFormData": {
              "filters": [
                  {
                      "col": field,
                      "op": "IN",
                      "val": [
                        value
                      ]
                  }
              ]
            },
            "filterState": {
                "label": value,
                "value": [
                    [
                      value
                    ]
                ],
                "filters": {
                    field: [
                      value
                    ]
                }
            }
          };

          console.log('-- this.filterSet 2 = ', this.filterSet);

          setDataMask(this.filterSet);
        }
      });
      this.spreadsheet.on(S2Event.ROW_CELL_CLICK, (event) => {
        console.log('-- CellClick ROW:');
        // console.dir(JSON.stringify(event));
        console.log('-- filterSet --');
        console.dir(props);
        const cell = this.spreadsheet.getCell(event.target);
        const meta = cell.getMeta();
        // console.log(meta.field, ' = ', meta.value);
        const field = meta.field === undefined ? '' : meta.field.toString();
        const value = meta.value === undefined ? '' : meta.value.toString();
        // console.log(field, ' = ', value);
        
        console.log('-- this.filterSet 1 = ', this.filterSet);

        this.filterSet = {
          "extraFormData": {
            "filters": [
                {
                    "col": field,
                    "op": "IN",
                    "val": [
                      value
                    ]
                }
            ]
          },
          "filterState": {
              "label": value,
              "value": [
                  [
                    value
                  ]
              ],
              "filters": {
                  field: [
                    value
                  ]
              }
          }
        };

        console.log('-- this.filterSet 2 = ', this.filterSet);

        setDataMask(this.filterSet);
      });
      // this.spreadsheet.on(S2Event.COL_CELL_DOUBLE_CLICK, (event) => {
      //   const cell = this.spreadsheet.getCell(event.target);
      //   const meta = cell.getMeta();
      //   this.spreadsheet.interaction.hideColumns([meta.field]);
      // });
  
      // this.spreadsheet.on(S2Event.LAYOUT_COLS_EXPANDED, (cell) => {
      //   console.log('列头展开:', cell);
      // });
  
      // this.spreadsheet.on(
      //   S2Event.LAYOUT_COLS_HIDDEN,
      //   (currentHiddenColumnsInfo, hiddenColumnsDetail) => {
      //     console.log('列头隐藏:', currentHiddenColumnsInfo, hiddenColumnsDetail);
      //   },
      // );
    }
  }
  //customFilter: (row) => row['city'] === '杭州市' || row['city'] === '宁波市',
  //const s2CustomOptions: S2Options<TooltipContentType, Pagination> = {
  const s2CustomOptions: SheetComponentOptions = {
    width: width,
    height: height,
    hierarchyType: 'tree',
    frozenFirstRow: true,
    cornerText: 'ПРИВЕТЫ',
    style: {
       hierarchyCollapse: true
    },
    interaction: {
      enableCopy: true,
      selectedCellsSpotlight: true,
      hoverHighlight: true,
      customInteractions: [
        {
          key: 'CellClick',
          interaction: CellClick,
        },
      ],
    },
    totals: {
      row: {
        showGrandTotals: showRowTotals,
        showSubTotals: showRowSubtotals,
        reverseLayout: true,
        reverseSubLayout: true,
        
        label: totalLabel,
        subLabel: subtotalLabel,
        calcTotals: {
          aggregation: rowTotalAggr,
        },
        calcSubTotals: {
          aggregation: rowSubtotalAggr,
        },
      },
      col: {
        showGrandTotals: showColTotals,
        showSubTotals: showColSubtotals,
        reverseLayout: true,
        reverseSubLayout: true,
        
        label: totalLabel,
        subLabel: subtotalLabel,
        calcTotals: {
          aggregation: colTotalAggr,
        },
        calcSubTotals: {
          aggregation: colSubtotalAggr,
        },
      },
    },
  
  }

  const CELL_ACTIVE_BACK_COLOR = '#D9DBE4';

  const thm: ThemeCfg = {
    // name: "gray"
    theme: {
      cornerCell: {
        cell: {
          interactionState: {
            hover: {
              // backgroundColor: CELL_ACTIVE_BACK_COLOR,
              // backgroundOpacity: 1,
              // borderColor: CELL_ACTIVE_BACK_COLOR,
            },
            selected: {
              // backgroundColor: CELL_ACTIVE_BACK_COLOR,
            },
          },
          // horizontalBorderColor: BORDER_COLOR,
          // verticalBorderColor: BORDER_COLOR,
          // padding: {
          //   top: 12,
          //   right: 8,
          //   bottom: 12,
          //   left: 8,
          // },
          // backgroundColor: HEADER_BACK_COLOR,
        },
        // text: {
        //   fill: '#fff',
        // },
        // bolderText: {
        //   fill: '#fff',
        //   opacity: 0.4,
        // },
      },
      colCell: {
        cell: {
          // horizontalBorderColor: BORDER_COLOR,
          // verticalBorderColor: BORDER_COLOR,
          // verticalBorderWidth: 2,
          // horizontalBorderWidth: 2,
          // padding: {
          //   top: 12,
          //   right: 8,
          //   bottom: 12,
          //   left: 8,
          // },
          // backgroundColor: HEADER_BACK_COLOR,
          interactionState: {
            hover: {
              // backgroundColor: CELL_ACTIVE_BACK_COLOR,
              // backgroundOpacity: 1,
              // borderColor: CELL_ACTIVE_BACK_COLOR,
            },
            selected: {
              // backgroundColor: CELL_ACTIVE_BACK_COLOR,
            },
          },
        },
        // text: {
        //   fill: '#fff',
        // },
        // bolderText: {
        //   fill: '#fff',
        //   opacity: 0.4,
        // },
      },
      dataCell: {
        cell: {
          interactionState: {
            // hover: {
            //   backgroundColor: CELL_ACTIVE_BACK_COLOR,
            //   backgroundOpacity: 1,
            // },
            hoverFocus: {
              // backgroundColor: CELL_ACTIVE_BACK_COLOR,
              // backgroundOpacity: 1,
              // borderColor: CELL_ACTIVE_BACK_COLOR,
            },
            selected: {
              // backgroundColor: CELL_ACTIVE_BACK_COLOR,
              backgroundOpacity: 1,
            },
            unselected: {
              backgroundOpacity: 1,
              opacity: 1,
            },
            prepareSelect: {
              // borderColor: CELL_ACTIVE_BACK_COLOR,
            },
          },
          // horizontalBorderColor: BORDER_COLOR,
          // verticalBorderColor: BORDER_COLOR,
          // verticalBorderWidth: 2,
          // horizontalBorderWidth: 2,
          padding: {
            top: 0,
            right: 8,
            bottom: 2,
            left: 0,
          },
          // backgroundColorOpacity: 0.9,
          // backgroundColor: BACK_COLOR,
          // crossBackgroundColor: BACK_COLOR,
        },
        text: {
          fill: '#000000',
        },
      },
    },
    palette: palette
  };

  setLang('ru_RU');
  
  console.log('-- emitFilter: ', emitFilter);
  console.log('-- emitCrossFilters = ', emitCrossFilters);

  return (
    <>
      <style>{css}</style>
      <div>Header: {headerText}</div>
      {allowPivoting && <Switcher sheetType="pivot" {...switcherFields} onSubmit={onSubmitSwitcher} />}
      <SheetComponent
        dataCfg={s2DataConfig}
        options={s2CustomOptions}
        //options={}
        themeCfg={thm}
      />
      <div>Footer: {footerText}</div>
    </>
  );

  // return (
  //   <Styles
  //     ref={rootElem}
  //     boldText={props.boldText}
  //     headerFontSize={props.headerFontSize}
  //     height={height}
  //     width={width}
  //   >
  //     <h3>{props.headerText}</h3>
  //     <pre>${JSON.stringify(data, null, 2)}</pre>
  //   </Styles>
  // );
}
