import React, { Component } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

interface ToggleBtnProps {
  timeUnit: string;
  handleTimeUnitChange: (event: React.MouseEvent<HTMLElement>, newAlignment: string) => void;
}

export class ToggleBtn extends Component<ToggleBtnProps> {

  render() {
    return (
      <ToggleButtonGroup
              color="secondary"
              value={this.props.timeUnit}
              exclusive
              onChange={this.props.handleTimeUnitChange}
              aria-label="Platform"
            >
              <ToggleButton value="date">일간</ToggleButton>
              <ToggleButton value="week">주간</ToggleButton>
              <ToggleButton value="month">월간</ToggleButton>
            </ToggleButtonGroup>
    )
  }
}

export default ToggleBtn
