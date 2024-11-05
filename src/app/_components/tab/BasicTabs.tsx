import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Shopping, TrendsDatas } from '~/common/types';
import CustomBarChart from '../chart/CustomBarChart';
import CustomLineChart from '../chart/CustomLineChart';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      key={index}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box key={index} sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TrendTabsProps {
  trendData:TrendsDatas[], 
}
export function TrendTabs(props:TrendTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          {
            props.trendData.map((item, index) => (
              <Tab key={index} label={item.keyword} {...a11yProps(index)} />
            ))
          }
        </Tabs>
      </Box>
      {
        props.trendData.map((item, index) => (
          <CustomTabPanel key={index} value={value} index={index} children={<CustomBarChart key={index} trend_data={item} />}/>
        ))
      }
    </Box>
  );
}


interface ShoppingTabsProps {
  shoppings:Shopping[], 
}
export function ShoppingTabs(props:ShoppingTabsProps) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} >
          {
            props.shoppings.map((item, index) => (
              <Tab key={index} label={item.keyword} {...a11yProps(index)} />
            ))
          }
        </Tabs>
      </Box>
      {
        props.shoppings.map((item, index) => (
          <CustomTabPanel key={index} value={value} index={index} children={<CustomLineChart key={index} shoppingDatas={item.shoppingDatas} />}/>
        ))
      }
    </Box>
  );
}