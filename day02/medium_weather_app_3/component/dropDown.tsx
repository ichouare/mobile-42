import { COLORS } from '@/constant/color';
import useGetSuggestionCitys from '@/Hooks/getSuggestionCitys';
import { useGeoState } from '@/store/store';
import { useIsFocused } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import {
  AutocompleteDropdown,
  IAutocompleteDropdownRef,
} from 'react-native-autocomplete-dropdown';
// import AutocompleteText from './AutocompleteText';

const defaultSuggestionsList = [
  { id: '1', title: 'Account Info', subtitle: 'Update account information' },
  {
    id: '2',
    title: 'Support',
    subtitle: 'Bug Report, Feature Request, Help Center',
  },
];

const CustomEmptyComponent = () => (
  <View
    style={{
      height: 100,
      backgroundColor: COLORS.white,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{ fontSize: 16, color: '#666' }}>No results found</Text>
  </View>
);

const SearchDropDown = () => {
  const [city, setSelectedCity] = useState<string | null>(null);
  const { data, isLoading, error } = useGetSuggestionCitys({ city: city });
  const dropdownController = useRef<IAutocompleteDropdownRef | null>(null);
  const setUserCity = useGeoState((state) => state.setUserCity);
  const userCity = useGeoState((state) => state.userCity);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      dropdownController?.current?.close();
    }
  }, [isFocused]);

  const handleSelectItem = (item) => {
    if (item) {
      const { name, admin1, country, latitude, longitude } = item;
      setUserCity({ name, region: admin1, country, latitude, longitude });
    } else {
      setSelectedCity(null); // user cleared the input
    }
  };

  const getSuggestions = useCallback((query) => {
    if (!query || query.length < 3) {
      return;
    }
    const lowerQuery = query.toLowerCase();
    setSelectedCity(lowerQuery);
  }, []);

  return (
    <AutocompleteDropdown
      EmptyResultComponent={
        isLoading ? <ActivityIndicator size={32} /> : <CustomEmptyComponent />
      }
      controller={(controller) => {
        dropdownController.current = controller;
      }}
      closeOnSubmit
      theme="light"
      suggestionsListContainerStyle={{
        ...styles.inputContainer,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 10,
        borderWidth: 0,
        // borderTopLeftRadius: 20,
      }}
      onSelectItem={handleSelectItem}
      dataSet={data || []}
      initialValue={userCity.name}
      onChangeText={getSuggestions}
      containerStyle={styles.inputContainer}
      inputContainerStyle={{ backgroundColor: 'transparent' }}
      showChevron={false}
      ClearIconComponent={<X size={20} />}
      suggestionsListTextStyle={{
        backgroundColor: 'white',
      }}
      emptyResultText="Please enter a valid city address"
      textInputProps={{
        placeholder: 'Search',
        style: {
          fontSize: 18,
          paddingLeft: 20,
          flex: 1,
          borderRadius: 20,
          color: COLORS.black,
          backgroundColor: 'white',
        },
      }}
      renderItem={(item: any, searchText) => {
        const { name, admin1, country } = item;
        const itemsArr = [name, admin1, country];
        return (
          <View style={{ ...styles.addressSugget }}>
            <Text numberOfLines={1} style={{ fontSize: 18, fontWeight: '500' }}>
              {itemsArr.join(',')}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default SearchDropDown;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    gap: 10,
  },
  inputContainer: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: COLORS.white,
    color: COLORS.black,
    // paddingHorizontal: 10,
    borderRadius: 20,
    // position: 'relative',
    // zIndex: 50,
    gap: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    // borderWidth:1,
  },
  btn: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    paddingHorizontal: 10,
    borderRadius: 100,
  },
  addressSugget: {
    width: '100%',
    minHeight: 40,
    backgroundColor: 'transparent',
    paddingVertical: 6,
    // borderEndWidth: 1,
  },
});
