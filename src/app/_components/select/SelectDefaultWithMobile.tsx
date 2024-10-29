import React, { Component } from 'react'
import { MenuItem, Select } from '@mui/material'

interface MenuItemProps {
  value: string;
  label: string;
  selected?: boolean;
}

interface DefaultWithMobileProps {
  defaltValue: string;
  setValue: (value: string) => void;
  menuItems: MenuItemProps[];
}

export class DefaultWithMobile extends Component<DefaultWithMobileProps> {
  render() {
    return (
      <Select
          value={this.props.defaltValue}
          onChange={(e) => this.props.setValue(e.target.value)}
          sx={{
            mr: { sm: 2 },
          }}
        >
          {this.props.menuItems.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
        </Select>
    )
  }
}

export default DefaultWithMobile
