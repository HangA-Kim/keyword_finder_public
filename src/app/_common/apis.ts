export const BASE_URL = 'http://127.0.0.1:8000';
export const GET_CATEGORY_URL = `${BASE_URL}/categories`;
export const GET_TRENDS_URL = `${BASE_URL}/analysis/keywords`;
export const GET_AGE_URL = `${BASE_URL}/analysis/shoping/age`;
export const GET_GENDER_URL = `${BASE_URL}/analysis/shoping/gender`;
export const GET_RECOMMAND_KEYWORD_URL = `${BASE_URL}/openai/recommand`;

export const getCategory = async (category_name: string, sub_category_name: string) => {
  try {
    // 슬래시를 다른 특수 문자로 대체
    const encodedCategoryName = category_name.replace(/\//g, '|');
    const encodedSubCategoryName = sub_category_name.replace(/\//g, '|');
    const url = `${GET_CATEGORY_URL}/${encodedCategoryName}/${encodedSubCategoryName}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
};

export const recommandKeyword = async(keyword:string, ...category) => {
  try{
    const categoryString = category.join('>'); // 카테고리들을 '>'로 연결
    const url = `${GET_RECOMMAND_KEYWORD_URL}?category=${encodeURIComponent(categoryString)}&subject=${encodeURIComponent(keyword)}`;
    const res = await fetch(url);
    const data = await res.json() as string[];
    return data;
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }  
}