export type FormErrorType = Record<string,string | string[]>


// -------------------------------------- //
type FormErrorFilterProps = {
  filter:string
  error:FormErrorType
}

function filterFormError({error,filter}:FormErrorFilterProps){
  const result = Object.entries(error).filter(
    ([field,message]) => field === filter)
  return result
}


// -------------------------------------- //
type DestructureErrorProps = {
  error:FormErrorType;
  keys:string[]
}

export function destructureFormErrorByKey({error,keys}:DestructureErrorProps){

  let res:Record<string,string[]> = {};
  const entries = Object.entries(error)
  for(let key of keys){
  entries.forEach(([field,message]) => {
    if(field === key){
      res[key] = Array.isArray(message)? message: [message,]
    }
  })
  }

  return res
} 

