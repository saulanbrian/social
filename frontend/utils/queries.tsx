type InfiniteQueryPage = {
  count:number;
  next:string | null;
  previous: string | null;
  results: any[]
}

type InfiniteQueryData = {
  pageParams: number[];
  pages: InfiniteQueryPage[];
}

export const summarizeQueryPagesResult = (data:InfiniteQueryData) => {
  let res: any[] = []
  if (data.pages && data.pages.length >= 1){
    for (let page of data.pages){
      res.push(...page.results)
    }
  }
  return res
}


type InfiniteQueryUpdaterParams = {
  data:InfiniteQueryData;
  id: string;
  updateField: object;
}

export const updateInfiniteQuerySingleResultById = ({
  data,
  id,
  updateField
}:InfiniteQueryUpdaterParams ) => {
  
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