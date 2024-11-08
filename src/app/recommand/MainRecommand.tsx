"use client";

import React, { useEffect, useState } from 'react';
import { Stack, Box, Button, Typography, Divider, IconButton, InputAdornment, OutlinedInput, InputLabel, FormControl, CircularProgress } from '@mui/material';
import { paperColor, textColor } from '~/styles/colors';
import { getCategory, recommandKeyword, analysisKeywords, shoppingAge, shoppingGender } from '~/common/apis';
import SelectNoBorder from '../_components/select/SelectNoBorder';
import InputKeyword from "../_components/recommand/InputKeyword";
import { useSnackbar } from "~/app/_context/SnackbarContext";
import SearchChips from "../_components/SearchChips";
import AddIcon from '@mui/icons-material/Add';
import ToggleBtn from '../_components/button/ToggleBtn';
import type { APIAnalysisDatas, APIShoppingDatas } from '~/common/types';
import TrendAnalysis from '../_components/recommand/TrendAnalysis';
import ShoppingAnalysis from '../_components/recommand/ShoppingAnalysis';

const CategorySelection: React.FC = () => {
  const { showSnackbar } = useSnackbar();
  const [categoryState, setCategoryState] = useState({
    selected: {
      대분류: '',
      중분류: '',
      소분류: '',
      세분류: '',
    },
    options: {
      '대분류': [] as string[],
      '중분류': [] as string[],
      '소분류': [] as string[],
      '세분류': [] as string[],
    },
  });

  const [keyword, setKeyword] = useState<string>('');
  const [keywordList, setKeywordList] = useState<{ word: string }[]>([]);
  const [showAddKeyword, setShowAddKeyword] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
  const [timeUnit, setTimeUnit] = React.useState('month');
  const [analysisData, setAnalysisData] = useState<APIAnalysisDatas>();
  const [shoppingAgeData, setShoppingAgeData] = useState<APIShoppingDatas>();
  const [shoppingGenderData, setShoppingGenderData] = useState<APIShoppingDatas>();
  const [isLoading, setIsLoading] = useState(false);

  const levels = ['대분류', '중분류', '소분류', '세분류'] as const; // 반복을 위한 배열
  type LevelType = typeof levels[number];

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        // 첫 번째 단계(대분류)의 카테고리 데이터를 로드
        const data = await getCategory('대분류', '대분류');
        if(!data) return
        console.log('fetchCategory', 'data > ', data)
        if (Array.isArray(data)) {
          setCategoryState((prev) => ({
            ...prev,
            options: { ...prev.options, '대분류': data },
          }));
        } else {
          console.error("getCategory returned a non-array value:", data);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
  
    void fetchCategory();
  }, []);

  useEffect(() => {

    if (!analysisData) {
      setIsLoading(false)
      return;
    }
    const categories = Object.values(categoryState.selected).filter((value) => value !== '');
    const keywordListArray = keywordList.map((item) => item.word); // 키워드 배열 생성
    void shoppingAge(timeUnit, keywordListArray, ...categories).then((data) => {
      console.log('shoppingAge:', data);
      if (data) {
        setShoppingAgeData(data);
      }
      setIsLoading(false)
    });
  }, [timeUnit, analysisData]);

  useEffect(() => {
    if (!shoppingAgeData) {
      setIsLoading(false)
      return;
    }
    const categories = Object.values(categoryState.selected).filter((value) => value !== '');
    const keywordListArray = keywordList.map((item) => item.word); // 키워드 배열 생성
    void shoppingGender(timeUnit, keywordListArray, ...categories).then((data) => {
      console.log('shoppingGender:', data);
      if (data) {
        setShoppingGenderData(data);
      }
      setIsLoading(false)
    });
  }, [timeUnit, shoppingAgeData]);

  const handleTimeUnitChange = (
    event: React.MouseEvent<HTMLElement>,
    newTimeUnit: string,
  ) => {
    getAnalysisData(newTimeUnit);
    setTimeUnit(newTimeUnit);
  };

  const handleCategoryChange = (level: string, value: string) => {
    console.log(level, value);

    setCategoryState((prev) => {
      const newState = { ...prev };
      const levelIndex = levels.indexOf(level as LevelType);

      // 선택된 값을 업데이트
      newState.selected = {
        ...prev.selected,
        [level]: value,
      };

      // 선택된 level 이후의 모든 값을 초기화
      levels.slice(levelIndex + 1).forEach((lvl) => {
        newState.selected[lvl] = '';
        newState.options[lvl] = [];
      });

      return newState;
    });

    // 다음 단계 카테고리 데이터를 로드할 조건 설정
    const nextLevelIndex = levels.indexOf(level as LevelType) + 1;
    console.log('nextLevelIndex', nextLevelIndex);
    if (nextLevelIndex <= levels.length - 1) {
      const nextLevel = levels[nextLevelIndex]!;
      const nextCategoryType = nextLevelIndex === 1 ? '중분류' : nextLevelIndex === 2 ? '소분류' : '세분류';
      console.log(nextLevel, nextCategoryType);
      void getCategory(value, nextCategoryType).then((data) => {
        console.log(data);
        if (Array.isArray(data)) {
          setCategoryState((prev) => ({
            ...prev,
            options: { ...prev.options, [nextLevel]: data },
          }));
        } else {
          console.error("getCategory returned a non-array value:", data);
        }
      });
    }
  };

  const handleRecommendClick = () => {
    // categoryState의 모든 selected 값이 비어 있는지 확인
    const categories = Object.values(categoryState.selected).filter((value) => value !== '');

    if (categories.length === 0) {
      showSnackbar('카테고리를 선택해주세요!');
      return;
    }

    if (!keyword || keyword.trim() === '') {
      showSnackbar('판매상품을 입력하세요');
      return;
    }

    void recommandKeyword(keyword, ...categories).then((data) => {
      console.log(data);
      if(data) {
        const test = data.keywords.map((word) => ({ word }));
        console.log(test);
        setKeywordList(test);
      }
    });
  };

  const deleteKeyword = async (keyword: string) => {
    setKeywordList(keywordList.filter((item) => item.word !== keyword));
    setShowAddKeyword(true);
  };

  const selectKeyword = (keyword: string) => {
    console.log("selectKeyword", keyword);
    // setSearchWord(keyword);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleClickAddKeyword = () => {
    const keywords = keywordList.filter((item) => item.word !== inputValue);
    setKeywordList([...keywords, { word: inputValue }]);
  };

  const getAnalysisData = (newTimeUnit: string) => {
    void analysisKeywords(newTimeUnit, ...keywordList.map((item) => item.word)).then((data) => {
      console.log(data);
      if (data) {
        setAnalysisData(data);
      }
    });
  };

  const handleAnalysisClick = () => {
    getAnalysisData(timeUnit);
    setIsLoading(true);
  };

  return (
    <>
      <Stack sx={{ p: 2, backgroundColor: paperColor, m: 3, borderRadius: 2, display: 'flex', gap: 2 }}>
        <Typography variant="body1" color={textColor} fontWeight="bold">
          카테고리를 선택하세요.
        </Typography>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={2}>
            {levels.map((level, index) => {
              const isLastLevel = level === '세분류'; // 마지막 단계인지 확인
              const hasPreviousSelection = index === 0 || categoryState.selected[levels[index - 1]!];
              const hasOptions = categoryState.options[level].length > 0;

              return hasPreviousSelection ? (
                hasOptions ? (
                  <SelectNoBorder
                    key={level}
                    selectedCategories={categoryState.selected[level]}
                    categories={categoryState.options[level]}
                    handleChange={handleCategoryChange}
                    level={level}
                  />
                ) : isLastLevel ? (
                  <InputKeyword key={level} keyword={keyword} setKeyword={setKeyword} /> // 세분류 단계에서 옵션이 없을 경우 InputKeyword 표시
                ) : null
              ) : null;
            })}

            {/* 세분류까지 모두 선택이 완료되었거나 옵션이 없는 경우 InputKeyword 표시 */}
            {categoryState.selected['세분류'] && (
              <InputKeyword key="final-input" keyword={keyword} setKeyword={setKeyword} />
            )}
          </Stack>
          <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleRecommendClick}>
            추천받기
          </Button>
        </Box>

        {keywordList.length > 0 && (
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SearchChips
                keywordList={keywordList}
                deleteKeyword={deleteKeyword}
                clickKeyword={selectKeyword}
              />
              {keywordList.length < 5 && showAddKeyword && (
                <FormControl sx={{ m: 1, width: '18ch' }} variant="outlined" size='small'>
                  <InputLabel>직접입력</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type='text'
                    value={inputValue}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label='직접입력'
                          onClick={handleClickAddKeyword}
                          edge="end"
                        >
                          <AddIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              )}
            </Stack>
            {keywordList.length > 1 && (
              <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleAnalysisClick}>
                분석하기
              </Button>
            )}
          </Box>
        )}

        {keywordList.length > 1 && (
          <Typography variant='caption' color={textColor}>
            추천된 키워드 목록 입니다. 최대 5개까지 분석을 할 수 있습니다. 직접 키워드 입력을 원할 경우에는 추천된 키워드를 삭제후 검색할 키워드를 입력해 주세요. 
          </Typography>
        )}
      </Stack>

      {isLoading ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',  // 화면 전체 높이 사용
          }}
        >
          <CircularProgress color="secondary" size="3rem" />
        </Box>
      ) : (
        analysisData && (
          <Stack sx={{ p: 3 }}>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <ToggleBtn timeUnit={timeUnit} handleTimeUnitChange={handleTimeUnitChange} />
              <Typography variant='caption' color={textColor}>
                *ratio : 구간별 검색량의 상대적 비율. 구간별 결과에서 가장 큰 값을 100으로 설정한 상댓값입니다.
              </Typography>
            </Box>
            <Divider variant="middle" sx={{ m: 3 }} />
            <TrendAnalysis analysisData={analysisData} />
            {shoppingAgeData && (
              <>
                <Divider variant="middle" sx={{ m: 3 }} />
                <ShoppingAnalysis
                  title={'연령별 네이버 쇼핑인사이트 분석'}
                  headers={['순위', '10~19세', '20~29세', '30~39세', '40~49세', '50~59세', '60세이상', '순위']}
                  shoppingData={shoppingAgeData}
                />
              </>
            )}
            {shoppingGenderData && (
              <>
                <Divider variant="middle" sx={{ m: 3 }} />
                <ShoppingAnalysis
                  title={'성별 네이버 쇼핑인사이트 분석'}
                  headers={['순위', '남성', '여성', '순위']}
                  shoppingData={shoppingGenderData}
                />
              </>
            )}
          </Stack>
        )
      )}
    </>
  );
};

export default CategorySelection;
