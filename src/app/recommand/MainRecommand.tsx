"use client";

import React, { useEffect, useState } from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';
import { paperColor, textColor } from '~/styles/colors';
import { getCategory, recommandKeyword } from '~/app/_common/apis';
import SelectNoBorder from '../_components/select/SelectNoBorder';
import InputKeyword from "../_components/recommand/InputKeyword";
import { useSnackbar } from "~/app/_context/SnackbarContext";
import SearchChips from "../_components/SearchChips";

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

  const [keyword, setKeyword] = useState<string | undefined>();
  const [keywordList, setKeywordList] = useState<{ word: string }[]>([]);

  const levels = ['대분류', '중분류', '소분류', '세분류'] as const; // 반복을 위한 배열
  type LevelType = typeof levels[number];

  useEffect(() => {
    // 첫 번째 단계(대분류)의 카테고리 데이터를 로드
    getCategory('대분류', '대분류').then((data) => {
      console.log(data)
      if (Array.isArray(data)) {
        setCategoryState((prev) => ({
          ...prev,
          options: { ...prev.options, '대분류': data },
        }));
      } else {
        console.error("getCategory returned a non-array value:", data);
      }
    });
  }, []);

  const handleCategoryChange = (level: string, value: string) => {
    console.log(level, value)

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
        newState.selected[lvl as LevelType] = '';
        newState.options[lvl as LevelType] = [];
      });
  
      return newState;
    });

    // 다음 단계 카테고리 데이터를 로드할 조건 설정
    const nextLevelIndex = levels.indexOf(level as LevelType) + 1;
    console.log('nextLevelIndex', nextLevelIndex)
    if (nextLevelIndex <= levels.length - 1) {
      const nextLevel = levels[nextLevelIndex] as typeof levels[number];
      const nextCategoryType = nextLevelIndex === 1 ? '중분류' : nextLevelIndex === 2 ? '소분류' : '세분류';
      console.log(nextLevel, nextCategoryType)
      getCategory(value, nextCategoryType).then((data) => {
        console.log(data)
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
      
    recommandKeyword(keyword, ...categories).then((data) => {
      console.log(data)
      const test = data.keyword.map((word) => ({ word }))
      console.log(test)
      // setKeywordList();
    })
  };

  const deleteKeyword = async (keyword: string) => {
    // await utils.analysis.deleteKeyword.fetch({ keyword });
    // await utils.analysis.deleteKeyword.invalidate();
    // await utils.analysis.getKeywordList.refetch();
  };

  const selectKeyword = (keyword: string) => {
    console.log("selectKeyword", keyword);
    // setSearchWord(keyword);
  };

  return (
    <Stack sx={{ p: 2, backgroundColor: paperColor, m: 3, borderRadius: 2, display: 'flex', gap: 2 }}>
      <Typography variant="body1" color={textColor} fontWeight="bold">
        카테고리를 선택하세요.
      </Typography>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2}>
          {levels.map((level, index) => {
            const isLastLevel = level === '세분류'; // 마지막 단계인지 확인
            const hasPreviousSelection = index === 0 || categoryState.selected[levels[index - 1] as LevelType];
            const hasOptions = categoryState.options[level as keyof typeof categoryState.options].length > 0;

            return hasPreviousSelection ? (
              hasOptions ? (
                <SelectNoBorder
                  key={level}
                  selectedCategories={categoryState.selected[level as keyof typeof categoryState.selected]}
                  categories={categoryState.options[level as keyof typeof categoryState.options]}
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
      {keywordList ? (
        <SearchChips
          keywordList={keywordList}
          deleteKeyword={deleteKeyword}
          clickKeyword={selectKeyword}
        />
      ) : (
        null
      )}
    </Stack>
  );
};

export default CategorySelection;
