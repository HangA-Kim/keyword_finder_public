import { Stack } from '@mui/material'
import React, { Component } from 'react'
import AverageTable from '../table/AverageTable'
import {TrendTabs} from '../tab/BasicTabs'
import { APIAnalysisDatas } from '~/common/types'

interface TrendAnalysisProps {
  analysisData: APIAnalysisDatas
}
export class TrendAnalysis extends Component<TrendAnalysisProps> {
  
  render() {
    return (
      <Stack direction={"row"} spacing={5} alignItems={"center"} justifyContent={"center"}>
        {
          (this.props.analysisData && this.props.analysisData.averageData && this.props.analysisData.averageData.length > 0) &&
            <AverageTable title='키워드 검색량 분석' headers={['순위', '글로벌', '한국']} 
            isTrend={true} 
            averageData={this.props.analysisData.averageData} />
        }
        <Stack>
          {
            (this.props.analysisData && this.props.analysisData.trendsData && this.props.analysisData.trendsData.length > 0) &&
            (
              <TrendTabs trendData={this.props.analysisData.trendsData}/>
            )
          }
        </Stack>
      </Stack>
    )
  }
}

export default TrendAnalysis
