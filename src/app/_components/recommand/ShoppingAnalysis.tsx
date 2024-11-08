import { Stack } from '@mui/material'
import React, { Component } from 'react'
import AverageTable from '../table/AverageTable'
import { ShoppingTabs } from '../tab/BasicTabs'
import type { APIShoppingDatas } from '~/common/types'

interface ShoppingAnalysisProps {
  title: string,
  headers: string[],
  shoppingData: APIShoppingDatas
}

export class ShoppingAnalysis extends Component<ShoppingAnalysisProps> {
  render() {
    return (
      <Stack direction={"row"} spacing={5} alignItems={"center"} justifyContent={"center"}>
        {
          (this.props.shoppingData?.average && this.props.shoppingData.average.length > 0) &&
            <AverageTable title={this.props.title} headers={this.props.headers} 
            isTrend={false}
            averageData={this.props.shoppingData.average} />
        }
        <Stack>
          {
            (this.props.shoppingData?.shopping && this.props.shoppingData.shopping.length > 0) &&
            (
              <ShoppingTabs 
              shoppings={this.props.shoppingData.shopping}/>
            )
          }
        </Stack>
      </Stack>
    )
  }
}

export default ShoppingAnalysis
