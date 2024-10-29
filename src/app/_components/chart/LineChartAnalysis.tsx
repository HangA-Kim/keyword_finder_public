import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { LineChart } from '@mui/x-charts/LineChart';
import type { TrendsDatas, AgeDatas } from '~/common/types';
import { orangeBrown, paperColor } from '~/styles/colors';
import { BarChart } from '@mui/x-charts/BarChart';

export const LineChartAnalysis = async () => {
  const keyword_analysis_url = 'http://127.0.0.1:8000/analysis/keywords?keywords=%EC%9D%B8%EC%8A%A4%ED%83%80,%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4&time_unit=month'
  const age_analysis_url = 'http://127.0.0.1:8000/analysis/shoping/gender?categorys=%EA%B0%80%EA%B5%AC/%EC%9D%B8%ED%85%8C%EB%A6%AC%EC%96%B4,DIY%EC%9E%90%EC%9E%AC/%EC%9A%A9%ED%92%88,%EB%A6%AC%EB%AA%A8%EB%8D%B8%EB%A7%81,%EC%B0%BD%EB%AC%B8/%EC%B0%BD%ED%98%B8/%EC%83%88%EC%8B%9C&keyword=%EC%83%B7%EC%8B%9C%EB%A0%88%EC%9D%BC&time_unit=week'
  const res = await fetch(
    age_analysis_url
  );
  // const data = (await res.json()) as TrendsDatas[];
  const res_data = (await res.json()) as AgeDatas[];
  // console.log('Fetched data:', data);
  console.log('Is array:', Array.isArray(res_data));
  console.log('Array length:', res_data.length);


  // if (data.length > 0 && data[0]) {
  //   const keyword = data[0].keyword; // 첫 번째 객체의 'keyword' 값 추출
  //   console.log('Keyword:', keyword);
  // } else {
  //   console.error('Invalid data format or empty array.');
  // }

  // const googleData = data[0]?.google_data || [];
  // const naverData = data[0]?.naver_data || [];

  // console.log(googleData);
  // console.log(naverData);

  const colors = [orangeBrown, paperColor];
  const allPeriods = new Set();
res_data.forEach(item => {
  item.data.forEach(subItem => {
    allPeriods.add(subItem.period);
  });
});

// 배열로 변환하여 정렬
const xAxis_data = Array.from(allPeriods).sort();
console.log('xAxis size ', xAxis_data.length);

// 모든 series 데이터를 xAxis_data와 일치하도록 보정
const series = res_data.map((item, index) => {
  const periodMap = new Map(item.data.map(subItem => [subItem.period, subItem.ratio]));

  // xAxis_data를 기준으로 누락된 period에 대해 값을 null로 채웁니다.
  const filledData = xAxis_data.map(period => periodMap.get(period as string) || null);

  return {
    data: filledData,
    label: item.group,
    color: colors[index % colors.length], // 색상 순환, 필요에 따라 색상 배열 사용
    stack: 'total',
    id: item.group + 'Id'
  };
});

  return (
    // <LineChart  // age
    <BarChart
      width={500}
      height={300}
      series={series}
      // series={[  // engine
      //   { data: data[0].data.map(item => item.ratio), label: '20', color: orangeBrown },
      //   { data: data[1].data.map(item => item.ratio), label: '30', color: paperColor },
      // ]}
      // xAxis={[{ scaleType: 'point', data: xAxis_data }]} // age
      xAxis={[{ scaleType: 'band', data: xAxis_data }]} // gender
    />
    // <BarChart  // engine
    //   xAxis={[{ scaleType: 'band', data: naverData.map(item => item.period) }]}
    //   series={[
    //     { data: googleData.map(item => item.ratio), label: 'global', color: paperColor }, 
    //     { data: naverData.map(item => item.ratio), label: 'korea', color: orangeBrown }]}
    //   width={500}
    //   height={300}
    // />
  )
}
