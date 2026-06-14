import { instanceApi } from "@/axios/instance"
import { useQuery } from "@tanstack/react-query"


type Tpyload = {
  city: string | null
}

async function getSuggestList(city: string | null)  {
  try{


      const res =  await instanceApi.get("/search", {
        params: {
          name :city,
          count: 5
        }
      })
      return res.data?.results || []
  }catch(err){
    throw new Error("not address found")
  }
}




const useGetSuggestionCitys = ({city}: Tpyload) => {
  return useQuery({
    queryKey: ["city", city],
    queryFn: () =>getSuggestList(city),
    enabled: !!city && city.trim().length > 0,
  })
}


export default useGetSuggestionCitys