import { COLORS } from '@/constant/color'
import { sharedStyles } from '@/constant/sharedStyle'
import React, { PureComponent } from 'react'
import { Text, View } from 'react-native'

export default  function Second()  {

    return (
      <View style={{...sharedStyles.screenContainer}}>
            <Text style={{color: COLORS.white}}>Week screen.</Text>
          </View>
    )

}
