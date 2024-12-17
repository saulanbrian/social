import { useQuery, useMutation } from '@tanstack/react-query'
import api from '..'

export const useUpdateUserMutation = (id:string |  number) => {
  return useMutation({
    mutationFn:async( data: FormData) => {
      const res = await api.patch(`user/${id}/update/`,data,{
        headers:{
          'Content-Type': 'multipart/form-data'
        }
      })
      return res.data
    }
  })
}