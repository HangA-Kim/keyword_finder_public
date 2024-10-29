import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'
import React, { Component } from 'react'

interface RadioProps{
  label: string;
  value: string;
}
interface RadioButtonsProps{
  label: string;
  value: string;
  onChange: (value:string) => void
  radioArray: RadioProps[]
}
export class RadioButtons extends Component<RadioButtonsProps> {

  render() {
    return (
      <FormControl
          sx={{
            mr: { sm: 1 }, // PC에서 오른쪽 여백 추가
            pl: 1,
            pr: 1,
          }}
        >
          <FormLabel>
            {this.props.label}
          </FormLabel>
          <RadioGroup
            row
            value={this.props.value}
            onChange={(e) => this.props.onChange(e.target.value)}
          >
          {
            this.props.radioArray.map(((item) => (
              <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
            )))
          }
          </RadioGroup>
        </FormControl>
    )
  }
}

export default RadioButtons
