import { LineChart } from '@mui/x-charts/LineChart'
import React, { Component } from 'react'
import { orangeBrown, textColor, darkGreen, darkBrown, lightGreen } from '~/styles/colors';
import { ShoppingDatas } from '~/common/types';

interface CustomLineChartProps {
  shoppingDatas: ShoppingDatas[]
}
export class CustomLineChart extends Component<CustomLineChartProps> {
  render() {
    const allPeriods = new Set();
    this.props.shoppingDatas.forEach(item => {
      item.data.forEach(subItem => {
        allPeriods.add(subItem.period);
      });
    });

    // 배열로 변환하여 정렬
    const xAxis_data = Array.from(allPeriods).sort();

    const colors = [orangeBrown, textColor, darkGreen, darkBrown, lightGreen];
    // 모든 series 데이터를 xAxis_data와 일치하도록 보정
    const series = this.props.shoppingDatas.map((item, index) => {
      const periodMap = new Map(item.data.map(subItem => [subItem.period, subItem.ratio]));

      // xAxis_data를 기준으로 누락된 period에 대해 값을 null로 채웁니다.
      const filledData = xAxis_data.map(period => periodMap.get(period as string) || null);

      return {
        data: filledData,
        label: item.group,
        color: colors[index],
        stack: 'total',
        id: item.group + 'Id'
      };
    });


    
    return (
      <>
      {
        this.props.shoppingDatas && (
        <LineChart
          width={500}
          height={300}
          series={series}
          xAxis={[{ scaleType: 'point', data: xAxis_data }]} 
          ></LineChart>
      )
      }
      </>
    )
  }
}

export default CustomLineChart
