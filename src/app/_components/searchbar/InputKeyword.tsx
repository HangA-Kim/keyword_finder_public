import {
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { useSnackbar } from "~/app/_context/SnackbarContext";

interface InputKeywordProps {
  addKeyword(keyword: string): void;
}
const InputKeyword = (props: InputKeywordProps) => {
  const [keyword, setKeyword] = useState("");
  const { showSnackbar } = useSnackbar();

  const handleClickAdd = () => {
    if (keyword.trim() !== "") {
    props.addKeyword(keyword);
    setKeyword('')
    } else {
      showSnackbar('키워드를 입력해 주세요', 'warning')
    }
  };
  return (
    <OutlinedInput
      id="keyword"
      type={"text"}
      placeholder="추천받을 키워드를 입력하세요"
      sx={{width:'300px'}}
      value={keyword}
      onChange={(e) => setKeyword(e.target.value)}
      endAdornment={
        <InputAdornment position="end">
          <IconButton aria-label="add" onClick={handleClickAdd} edge="end">
            <AddIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
};

export default InputKeyword;
