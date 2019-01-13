import Register from '../src/components/Register'
import React from 'react'
import { shallow } from 'enzyme'

describe('Register', () => {
    test('should not explode', () => {
        const wrapper = shallow(<Register />)
    });
})