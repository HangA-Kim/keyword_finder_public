import { Paper, TableBody, TableRow, TableHead, TableCell, Table, Stack, Typography } from '@mui/material'
import { TableContainer } from '@mui/material'
import React, { Component } from 'react'
import type { KeywordAverage } from '~/common/types'
import { textColor } from '~/styles/colors';

interface AverageTableProps {
  title: string
  headers: string[]
  averageData: KeywordAverage[]
}
export class AverageTable extends Component<AverageTableProps> {
  render() {
    return (
      <Stack alignItems='center'>
        <Typography variant='h6' color={textColor}>{this.props.title}</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {
              this.props.headers.map((header) => (
                <TableCell>{header}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.averageData.map((row, index) => (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              {
                Object.values(row).map((item, index) => (
                  index !== 0 ? (
                    <TableCell key={index} component="th" scope="row">
                      {item}
                    </TableCell>
                  ) : null
                ))
              }
            </TableRow>
          ))}
        </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    )
  }
}

export default AverageTable
