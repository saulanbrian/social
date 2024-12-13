import { InfiniteData } from "@tanstack/react-query";

export type InfiniteQueryPage<T> = {
  count:number;
  next:string | null;
  previous: string | null;
  results: T[]
}



export const summarizeQueryPagesResult = <T>(data:InfiniteData<InfiniteQueryPage<T>>):T[] => {
  let res: T[] = []
  if (data.pages && data.pages.length >= 1){
    for (let page of data.pages){
      res.push(...page.results)
    }
  }
  return res
}


type InfiniteQueryUpdaterParams<T> = {
  data:InfiniteData<InfiniteQueryPage<T>>;
  id: string | number;
  updateField: Partial<T>;
}

export const updateInfiniteQuerySingleResultById = <T extends { id: string | number }>({
  data,
  id,
  updateField
}:InfiniteQueryUpdaterParams<T>): InfiniteData<InfiniteQueryPage<T>> => {
  
  return {
    ...data,
    pages:data.pages.map(page => ({
      ...page,
      results:page.results.map(result => {
        return result.id === id? ({
          ...result,
          ...updateField
        }): result
      })
    }))
  }
}

type MultipleResultUpdaterProps<T> = {
  data:InfiniteData<InfiniteQueryPage<T>>,
  updateField:Partial<T>,
  item_ids:(string | number)[]
}


export const infinitQueryUpdateMultipleResults = <T extends { id:string | number }>({
  data,
  updateField,
  item_ids
}:MultipleResultUpdaterProps<T>): InfiniteData<InfiniteQueryPage<T>> => {
  
  return {
    ...data,
    pages:data.pages.map(page => ({
      ...page,
      results:page.results.map(result => {
        if(item_ids.includes(result.id)){
          return {
            ...result,
            ...updateField,
          }
        }else return result
      })
    }))
  }
}


type QueryResultsUpdaterProps<T> = {
  data:InfiniteData<InfiniteQueryPage<T>>;
  updateField:Partial<T>
}

export const infiniteQueryUpdateAllResults = <T extends { id: string | number }>({
  data,
  updateField
}:QueryResultsUpdaterProps<T>):InfiniteData<InfiniteQueryPage<T>> => {
  
  
  return  {
    ...data,
    pages:data.pages.map(page => ({
      ...page,
      results:page.results.map(result => ({
        ...result,
        ...updateField
      }))
    }))
  }
  
}


type InfiniteQueryAppenderProps<T> = {
  data: InfiniteData<InfiniteQueryPage<T>>,
  dataToAppend: T
}

export const infiniteQueryAppendResultAtTop = <T>({
  data,
  dataToAppend
}:InfiniteQueryAppenderProps<T>): InfiniteData<InfiniteQueryPage<T>> => {
  
  return {
    ...data,
    pages: data.pages.map((page, i) => ({
      ...page,
      results:[i === 0 && dataToAppend , ...page.results].filter(Boolean) as T[]
    }))
  }
  
}