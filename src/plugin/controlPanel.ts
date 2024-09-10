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
import { t, validateNonEmpty } from '@superset-ui/core';
import { ControlPanelConfig, sections, sharedControls, emitFilterControl } from '@superset-ui/chart-controls';
import { Aggregation } from '@antv/s2';

console.log('emitFilterControl: ', emitFilterControl);

const config: ControlPanelConfig = {
  /**
   * The control panel is split into two tabs: "Query" and
   * "Chart Options". The controls that define the inputs to
   * the chart data request, such as columns and metrics, usually
   * reside within "Query", while controls that affect the visual
   * appearance or functionality of the chart are under the
   * "Chart Options" section.
   *
   * There are several predefined controls that can be used.
   * Some examples:
   * - groupby: columns to group by (translated to GROUP BY statement)
   * - series: same as groupby, but single selection.
   * - metrics: multiple metrics (translated to aggregate expression)
   * - metric: sane as metrics, but single selection
   * - adhoc_filters: filters (translated to WHERE or HAVING
   *   depending on filter type)
   * - row_limit: maximum number of rows (translated to LIMIT statement)
   *
   * If a control panel has both a `series` and `groupby` control, and
   * the user has chosen `col1` as the value for the `series` control,
   * and `col2` and `col3` as values for the `groupby` control,
   * the resulting query will contain three `groupby` columns. This is because
   * we considered `series` control a `groupby` query field and its value
   * will automatically append the `groupby` field when the query is generated.
   *
   * It is also possible to define custom controls by importing the
   * necessary dependencies and overriding the default parameters, which
   * can then be placed in the `controlSetRows` section
   * of the `Query` section instead of a predefined control.
   *
   * import { validateNonEmpty } from '@superset-ui/core';
   * import {
   *   sharedControls,
   *   ControlConfig,
   *   ControlPanelConfig,
   * } from '@superset-ui/chart-controls';
   *
   * const myControl: ControlConfig<'SelectControl'> = {
   *   name: 'secondary_entity',
   *   config: {
   *     ...sharedControls.entity,
   *     type: 'SelectControl',
   *     label: t('Secondary Entity'),
   *     mapStateToProps: state => ({
   *       sharedControls.columnChoices(state.datasource)
   *       .columns.filter(c => c.groupby)
   *     })
   *     validators: [validateNonEmpty],
   *   },
   * }
   *
   * In addition to the basic drop down control, there are several predefined
   * control types (can be set via the `type` property) that can be used. Some
   * commonly used examples:
   * - SelectControl: Dropdown to select single or multiple values,
       usually columns
   * - MetricsControl: Dropdown to select metrics, triggering a modal
       to define Metric details
   * - AdhocFilterControl: Control to choose filters
   * - CheckboxControl: A checkbox for choosing true/false values
   * - SliderControl: A slider with min/max values
   * - TextControl: Control for text data
   *
   * For more control input types, check out the `incubator-superset` repo
   * and open this file: superset-frontend/src/explore/components/controls/index.js
   *
   * To ensure all controls have been filled out correctly, the following
   * validators are provided
   * by the `@superset-ui/core/lib/validator`:
   * - validateNonEmpty: must have at least one value
   * - validateInteger: must be an integer value
   * - validateNumber: must be an integer or decimal value
   */

  // For control input types, see: superset-frontend/src/explore/components/controls/index.js
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'cols',
            config: {
              ...sharedControls.groupby,
              label: t('Columns'),
              description: t('Columns to group by'),
            },
          },
        ],
        [
          {
            name: 'rows',
            config: {
              ...sharedControls.groupby,
              label: t('Rows'),
              description: t('Rows to group by'),
            },
          },
        ],
        [
          {
            name: 'metrics',
            config: {
              ...sharedControls.metrics,
              // it's possible to add validators to controls if
              // certain selections/types need to be enforced
              validators: [validateNonEmpty],
            },
          },
        ],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: sharedControls.row_limit,
          },
        ],
      ],
    },
    {
      label: t('Header & Footer'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'header_text',
            config: {
              type: 'TextControl',
              default: '',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Header Text'),
              description: t('The text you want to see in the header above the table'),
            },
          },
        ],
        [
          {
            name: 'footer_text',
            config: {
              type: 'TextControl',
              default: '',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Footer Text'),
              description: t('The text you want to see in the footer under the table'),
            },
          },
        ],
        // [
        //   ...emitFilterControl
        // ],
        [{
          name: 'emit_filter',
          config: {
            type: 'CheckboxControl',
            label: t('Emit dashboard cross filters'),
            default: false,
            renderTrigger: true,
            description: t('Emit dashboard cross filters.')
          }
        }],
      ],
    },
    {
      label: t('Totals'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'total_Label',
            config: {
              type: 'TextControl',
              default: 'Total',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Total Lable'),
              description: t('The text you want to see as the total label'),
            },
          },
        ],
        [
          {
            name: 'subtotal_label',
            config: {
              type: 'TextControl',
              default: 'Subttotal',
              renderTrigger: true,
              // ^ this makes it apply instantaneously, without triggering a "run query" button
              label: t('Subtotal Lable'),
              description: t('The text you want to see as the subtotal label'),
            },
          },
        ],
        [
          {
            name: 'show_row_totals',
            config: {
              type: 'CheckboxControl',
              default: false,
              renderTrigger: true,
              label: t('Show Row Totals'),
              description: t('Turn row totals on/off'),
            },
          },
        ],
		[
          {
            name: 'show_row_subtotals',
            config: {
              type: 'CheckboxControl',
              default: false,
              renderTrigger: true,
              label: t('Show Row Subtotals'),
              description: t('Turn row subtotals on/off'),
            },
          },
        ],
		[
          {
            name: 'show_col_totals',
            config: {
              type: 'CheckboxControl',
              default: false,
              renderTrigger: true,
              label: t('Show Column Totals'),
              description: t('Turn column totals on/off'),
            },
          },
        ],
		    [
          {
            name: 'show_col_subtotals',
            config: {
              type: 'CheckboxControl',
              default: false,
              renderTrigger: true,
              label: t('Show Column Subtotals'),
              description: t('Turn column subtotals on/off'),
            },
          },
        ],
        [
          {
            name: 'row_total_aggr',
            config: {
              type: 'SelectControl',
              label: t('Row Total Aggregation'),
              default: 'SUM',
              choices: [
                [Aggregation.SUM, 'SUM()'],
                [Aggregation.AVG, 'AVG()'],
                [Aggregation.MAX, 'MAX()'],
                [Aggregation.MIN, 'MIN()'],
              ],
              renderTrigger: true,
              description: t('The row totals aggregation function'),
            },
          },
        ],
		    [
          {
            name: 'row_subtotal_aggr',
            config: {
              type: 'SelectControl',
              label: t('Row Subotal Aggregation'),
              default: 'SUM',
              choices: [
                ['SUM', 'SUM()'],
                ['AVG', 'AVG()'],
                ['MAX', 'MAX()'],
                ['MIN', 'MIN()'],
              ],
              renderTrigger: true,
              description: t('The row subtotals aggregation function'),
            },
          },
        ],
		    [
          {
            name: 'col_total_aggr',
            config: {
              type: 'SelectControl',
              label: t('Column Total Aggregation'),
              default: 'SUM',
              choices: [
                ['SUM', 'SUM()'],
                ['AVG', 'AVG()'],
                ['MAX', 'MAX()'],
                ['MIN', 'MIN()'],
              ],
              renderTrigger: true,
              description: t('The column totals aggregation function'),
            },
          },
        ],
		    [
          {
            name: 'col_subtotal_aggr',
            config: {
              type: 'SelectControl',
              label: t('Column Subtotal Aggregation'),
              default: 'SUM',
              choices: [
                ['SUM', 'SUM()'],
                ['AVG', 'AVG()'],
                ['MAX', 'MAX()'],
                ['MIN', 'MIN()'],
              ],
              renderTrigger: true,
              description: t('The column subtotals aggregation function'),
            },
          },
        ],
      ],
    }
        // [
        //   {
        //     name: 'bold_text',
        //     config: {
        //       type: 'CheckboxControl',
        //       label: t('Bold Text'),
        //       renderTrigger: true,
        //       default: true,
        //       description: t('A checkbox to make the '),
        //     },
        //   },
        // ],
        // [
        //   {
        //     name: 'header_font_size',
        //     config: {
        //       type: 'SelectControl',
        //       label: t('Font Size'),
        //       default: 'xl',
        //       choices: [
        //         // [value, label]
        //         ['xxs', 'xx-small'],
        //         ['xs', 'x-small'],
        //         ['s', 'small'],
        //         ['m', 'medium'],
        //         ['l', 'large'],
        //         ['xl', 'x-large'],
        //         ['xxl', 'xx-large'],
        //       ],
        //       renderTrigger: true,
        //       description: t('The size of your header font'),
        //     },
        //   },
        // ],
    //   ],
    // },
  ],
};

export default config;