import { useNuxtApp } from '#imports'
import { useFetch } from '#imports'

export default {
  fetchCategory: async () => {
    // const { $http } = useNuxtApp()
    const { data } = await  useFetch('https://api.dvorfs.com/api/category')
    return data.value
  },
  fetchSubCategory: async () => {
    // const { $http } = useNuxtApp()
    const { data } = await useFetch("https://api.dvorfs.com/api/category/subCategory")
    // console.log(
    //     data.value
    // )
    return data.value
  },
  fetchSubCategoryById: async (id: any) => {
    // const { $http } = useNuxtApp()
    // console.log(`https://api.dvorfs.com/api/category/subCategory/${id}`)
    const { data } = await useFetch(`https://api.dvorfs.com/api/category/subCategory/${id}`)
    // console.log(data.value)
    return data.value
  },
  // fetchChronologyRoute: async (params: object) => {
  //   const url = 'https://691b-95-174-102-182.ngrok-free.app/api/predict'
  //   const response = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(params)
  //   }).then(resp => resp.json())
  //   return response
  // },
  fetchRandom: async () => {
    // const { $http } = useNuxtApp()
    const { data } = await useFetch(`/api/random`)
    return data.value
  }
}
