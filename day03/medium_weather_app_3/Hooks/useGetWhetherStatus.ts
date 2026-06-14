


import { instanceApi } from "@/axios/instance"
import { useQuery } from "@tanstack/react-query"


type Tpyload = {
  longitude: number | undefined,
  latitude: number | undefined
  current_weather? : boolean
  hourly? : string
  daily? : string
  forecast_days? : number
}

async function getWhetherData({latitude, longitude , current_weather = false, hourly, daily, forecast_days} : Tpyload)  {
  try{

      const res =  await instanceApi.get("/forecast", {
        baseURL: "https://api.open-meteo.com/v1",
        params: {
          current_weather,
          latitude,
          longitude,
          hourly,
          daily,
          forecast_days,

        }
      })
      return res.data || []
  }catch(err){
    throw new Error("not address found")
  }
}




const useGetWhetherCity = ({latitude, longitude, current_weather, hourly, daily, forecast_days}: Tpyload) => {
  return useQuery({
    queryKey: ["city", latitude, longitude, current_weather, hourly, daily, forecast_days],
    queryFn: () => getWhetherData({latitude, longitude, current_weather, hourly, daily, forecast_days}),
    enabled: !!latitude && !!longitude
  })
}


export default useGetWhetherCity