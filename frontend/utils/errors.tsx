export type FormErrorType = {
  error: object
}

// -------------------------------------- //
type FormErrorFilterProps = FormErrorType &  {
  filter:string
}

function filterFormError({error,filter}:FormErrorFilterProps){
  const result = Object.entries(error).filter(
    ([field,message]) => field === filter)
  return result
}


// -------------------------------------- //
type DestructureErrorProps = FormErrorType & {
  keys:str[]
}

export function destructureFormErrorByKey({error,keys}:DestructureErrorProps){
  let res = {}
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

