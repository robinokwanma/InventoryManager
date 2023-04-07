import React from 'react';
import { render } from '@testing-library/react-native';
import {describe, expect, it} from '@jest/globals';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from '../src/components/AuthContext';
import ItemsList from '../src/screens/ItemsList';

// Snap Shot Test STARTS Here

describe('ItemsList screen', () => {
  it('renders correctly', () => {
    const { toJSON } = render(
      <NavigationContainer>
        <AuthProvider>
          <ItemsList />
        </AuthProvider>
      </NavigationContainer>
    )
    expect(toJSON()).toMatchSnapshot();
  });
});
// Snap Shot Test ENDS Here