import type { APIAnalysisDatas, APIShoppingDatas } from "~/common/types";

let BASE_URL;
if (process.env.NODE_ENV !== "production")
  BASE_URL  = 'http://127.0.0.1:8080';
else BASE_URL = 'http://localhost:8822/fastapi';

// const BASE_URL = 'http://localhost:8822/fastapi';
export const GET_CATEGORY_URL = `${BASE_URL}/categories`;
export const GET_ANALYSIS_KEYWORD_URL = `${BASE_URL}/analysis/keywords`;
export const GET_SHOPPING_AGE_URL = `${BASE_URL}/analysis/shopping/age`;
export const GET_SHOPPING_GENDER_URL = `${BASE_URL}/analysis/shopping/gender`;
export const GET_RECOMMAND_KEYWORD_URL = `${BASE_URL}/openai/recommand`;

export const getCategory = async (category_name: string, sub_category_name: string) => {
  try {
    // 슬래시를 다른 특수 문자로 대체
    const encodedCategoryName = category_name.replace(/\//g, '|');
    const encodedSubCategoryName = sub_category_name.replace(/\//g, '|');
    const url = `${GET_CATEGORY_URL}/${encodedCategoryName}/${encodedSubCategoryName}`;
    const res = await fetch(url);
    const data = await res.json() as string[];
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

type keywords = {
  'keywords': string[]
}
export const recommandKeyword = async(keyword:string, ...category) => {
  try{
    const categoryString = category.join('>'); // 카테고리들을 '>'로 연결
    const url = `${GET_RECOMMAND_KEYWORD_URL}?category=${encodeURIComponent(categoryString)}&subject=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    const data = await res.json() as keywords;
    return data;
  } catch (error) {
    console.error('Error fetching recommandKeyword:', error);
    return null;
  }  
}

export const analysisKeywords = async(time_unit:string, ...keywords) => {
  try{
    const keywordString = keywords.join(','); 
    const url = `${GET_ANALYSIS_KEYWORD_URL}?keywords=${encodeURIComponent(keywordString)}&time_unit=${time_unit}`;
    const res = await fetch(url);
    const data = await res.json() as APIAnalysisDatas;
    return data;
  } catch (error) {
    console.error('Error fetching analysisKeywords:', error);
    return null;
  }
}


const getShoppingData = async(shopping_url:string, time_unit:string, keywords:string[], categorys:string[]) => {
  console.log('shopping_url', shopping_url)
  console.log('time_unit', time_unit)
  console.log('keywords', keywords)
  console.log('categorys', categorys)
  try{
    const categoryString = categorys.join(','); 
    const keywordString = keywords.join(',');
    const url = `${shopping_url}?categorys=${encodeURIComponent(categoryString)}&keywords=${encodeURIComponent(keywordString)}&time_unit=${time_unit}`;
    const res = await fetch(url);
    const data = await res.json() as APIShoppingDatas;
    return data;
  } catch (error) {
    console.error('Error fetching analysisKeywords:', error);
    return null;
  }
}
export const shoppingAge = async(time_unit:string, keywords:string[], ...categorys: string[]) => {
  return getShoppingData(GET_SHOPPING_AGE_URL, time_unit, keywords, categorys)
}

export const shoppingGender = async(time_unit:string, keywords:string[], ...categorys: string[]) => {
  return getShoppingData(GET_SHOPPING_GENDER_URL, time_unit, keywords, categorys)
}

