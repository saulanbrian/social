type InfiniteQueryPage<T> = {
  count:number;
  next:string | null;
  previous: string | null;
  results: T[]
}

type InfiniteQueryData<T> = {
  pageParams: number[];
  pages: InfiniteQueryPage<T>[];
}

export const summarizeQueryPagesResult = <T>(data:InfiniteQueryData<T>):T[] => {
  let res: T[] = []
  if (data.pages && data.pages.length >= 1){
    for (let page of data.pages){
      res.push(...page.results)
    }
  }
  return res
}


type InfiniteQueryUpdaterParams<T> = {
  data:InfiniteQueryData<T>;
  id: string;
  updateField: Partial<T>;
}

export const updateInfiniteQuerySingleResultById = <T>({
  data,
  id,
  updateField
}:InfiniteQueryUpdaterParams<T>): InfiniteQueryData<T> => {
  
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


type QueryResultsUpdaterProps<T> = {
  data:InfiniteQueryData<T>;
  updateField:Partial<T>
}

export const infiniteQueryUpdateAllResults = <T>({
  data,
  updateField
}:QueryResultsUpdaterProps<T>):InfiniteQueryData<T> => {
  
  
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


type InfiniteQueryAppenderProps = {
  data: InfiniteQueryData<unknown>,
  newData: unknown
}

export const infiniteQueryAppendResultAtTop = ({
  data,
  newData
}:InfiniteQueryAppenderProps): InfiniteQueryData<unknown> => {
  
  return {
    ...data,
    pages:data.pages.map((page,i) => ({
      ...page,
      results: [i === 0 && newData, ...page.results]
    }))
  }
  
}