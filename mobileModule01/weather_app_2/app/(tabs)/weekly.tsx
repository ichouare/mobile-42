import { COLORS } from '@/constant/color'
import { sharedStyles } from '@/constant/sharedStyle'
import { useGeoState } from '@/store/store'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

export default  function Second()  {
      const userGeolation = useGeoState(state => state.userGeolation)

    return (
      <View style={{...sharedStyles.screenContainer}}>
            <Text style={{color: COLORS.white}}>Week screen.</Text>
      <Text lineBreakMode="tail"  numberOfLines={2}  style={{color:COLORS.white, fontSize: 32, maxWidth: "80%", textAlign: "center"}}>{userGeolation}</Text>

          </View>
    )

}
