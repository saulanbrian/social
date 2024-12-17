import User from "@/types/user"
import { useQuery, useSuspenseQuery, } from "@tanstack/react-query"
import api from ".."


export const useGetUser = (id:string | number) => {
  return useSuspenseQuery<User>({
    queryKey:['user',id],
    queryFn:async() => {
      const res = await api.get(`user/${id}/`)
      return res.data
    },
    staleTime:5 * 60 * 10000
  })
}