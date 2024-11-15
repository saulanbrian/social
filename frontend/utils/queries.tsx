type InfiniteQueryPage = {
  count:number;
  next:string | null;
  previous: string | null;
  results: any[]
}

type InfiniteQueryData = {
  data: {
    pageParams: number[];
    pages: InfiniteQueryPage[];
  }
}

export const summarizeQueryPagesResult = (data:InfiniteQueryData) => {
  let res: any[] = []
  for (let page of data.pages){
    res.push(...page.results)
  }
  return res
}