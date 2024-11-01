import React, { Component } from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { orangeBrown, paperColor } from '~/styles/colors';
import type { TrendsDatas } from '~/common/types';

interface CustomBarChartProps {
  trend_data: TrendsDatas;
}

export class CustomBarChart extends Component<CustomBarChartProps> {
  colors = [orangeBrown, paperColor];

  render() {
    return (
      <BarChart  // engine
      xAxis={[{ scaleType: 'band', data: this.props.trend_data.naver_data.map(item => item.period) }]}
        series={[
          { data: this.props.trend_data.google_data.map(item => item.ratio), label: 'global', color: paperColor },
          { data: this.props.trend_data.naver_data.map(item => item.ratio), label: 'korea', color: orangeBrown },
        ]}
        width={500}
        height={300}
    />
    )
  }
}

export default CustomBarChart
