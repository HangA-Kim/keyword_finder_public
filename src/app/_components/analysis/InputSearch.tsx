import { useEffect, useState } from "react";
import {
  Paper,
  InputBase,
  IconButton,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import dayjs, { type Dayjs } from "dayjs";
import DetailSearch from "./DetailSearch";
import type { NaverRequestType } from "~/common/types";

interface InputSearchProps {
  search(this:void, requestData: NaverRequestType): void;
  keyword: string;
}

const InputSearch = ({ search, keyword }:InputSearchProps) => {
  const [inputText, setInputText] = useState(keyword);
  const [detailSearchCheck, setDetailSearchCheck] = useState(false);

  const [startDate, setStartDate] = useState<Dayjs>(
    dayjs().subtract(1, "month")
  );
  const [timeUnit, setTimeUnit] = useState("date");
  const [device, setDevice] = useState("pc");
  const [gender, setGender] = useState("f");

  useEffect(() => {
    setInputText(keyword);
  }, [keyword]);

  const handleSearch = () => {
    console.log("input text ", inputText);
    const requestData: NaverRequestType = {
      searchText: inputText,
      startDate: startDate.format("YYYY-MM-DD"),
      timeUnit,
      device,
      gender,
    };
    if (detailSearchCheck) {
      search(requestData);
    }
    else
      search({
        ...requestData,
        timeUnit: "date",
        device: "",
        gender: "",
      });
  };

  return (
    <Box sx={{ m: { xs: 1, sm: 3 } }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: { xs: "stretch", sm: "center" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "row", sm: "row" },
            justifyContent: { xs: "space-between", sm: "flex-start" },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <Paper
            variant="outlined"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: 500 },
              mr: { sm: 2 },
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Keyword"
              inputProps={{ "aria-label": "search keyword" }}
              autoFocus={true}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            {/* IconButton에 직접 onClick을 설정하고 SearchIcon에서는 제거 */}
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={handleSearch}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>

        <FormControlLabel
          sx={{ mt: { xs: 2, sm: 0 } }}
          control={
            <Checkbox
              checked={detailSearchCheck}
              onChange={(e) => setDetailSearchCheck(e.target.checked)}
            />
          }
          label="상세검색"
        />
      </Box>
      {detailSearchCheck && (
        <DetailSearch
          startDate={startDate}
          setStartDate={setStartDate}
          timeUnit={timeUnit}
          setTimeUnit={setTimeUnit}
          device={device}
          setDevice={setDevice}
          gender={gender}
          setGender={setGender}
        />
      )}
    </Box>
  );
};

export default InputSearch;
