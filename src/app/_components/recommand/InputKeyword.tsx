import {
  OutlinedInput,
} from "@mui/material";
import React from "react";

import { bgColor } from '~/styles/colors';

interface InputKeywordProps {
  keyword:string;
  setKeyword(keyword: string): void;
}
const InputKeyword = (props: InputKeywordProps) => {
  
  return (
    <OutlinedInput
      id="keyword"
      type={"text"}
      placeholder="판매상품을 입력하세요"
      sx={{width:'250px',
        backgroundColor: bgColor,  // 배경색 설정
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: bgColor,  // 테두리 색상 설정
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: bgColor,  // 호버 시 테두리 색상
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: bgColor,  // 포커스 시 테두리 색상
        },}}
      value={props.keyword}
      onChange={(e) => props.setKeyword(e.target.value)}
      size="small"
    />
  );
};

export default InputKeyword;
