import { MenuItem } from '@mui/material'
import { FormControl, Select, InputLabel } from '@mui/material'
import React, { Component } from 'react'
import { lightBrown } from '~/styles/colors'
import { bgColor } from '~/styles/colors'

interface SelectNoBorderProps {
  selectedCategories: string;
  categories: string[];
  handleChange: (level: string, value: string) => void;
  level: string;  
}

export class SelectNoBorder extends Component<SelectNoBorderProps> {
  render() {
    return (
      <FormControl sx={{ minWidth: 120,
        '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: bgColor, // 기본 테두리 색상
        },
        '&:hover fieldset': {
        borderColor: lightBrown, // 호버 시 테두리 색상
      },
      }}} size="small">
        <InputLabel>{this.props.level}</InputLabel>
        <Select
          value={this.props.selectedCategories}
          sx={{
            backgroundColor: bgColor, // 배경색 설정
          }}
          onChange={(e) => this.props.handleChange(this.props.level, e.target.value as string)}
        >
          {
            this.props.categories.map((item, index)=>(
              <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
            ))
          }
        </Select>
      </FormControl>
    )
  }
}

export default SelectNoBorder
