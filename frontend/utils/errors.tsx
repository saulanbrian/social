export type FormInputErrorType = {
  field:string;
  message:string
}

//--------------------------------------//
export function filterInputError({ errors, filter }: {
  errors:FormInputErrorType[];
  filter:string
}){
  
  const filterResult = errors.some(({field}) => field === filter) ?
    errors.filter(({field}) => field === filter) : null
  return filterResult
}

//--------------------------------------//
type FilterInputErrorsByFieldProps = {
  errors:FormInputErrorType[];
  fields: string[]
}

export const filterInputErrorsByField = (
  {errors,fields}:FilterInputErrorsByFieldProps) => {
  let result = {}
  for(let filter of fields) {
    const filterResult = errors.filter(
      ({field}) => { 
        return field === filter
      })
    result[filter] = filterResult
  }
  return result 
}
