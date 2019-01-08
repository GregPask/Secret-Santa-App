import Participants from '../src/components/Participants'
import React from 'react'
import { shallow } from 'enzyme'

describe('Participants', () => {
    test('should match snapshot', () => {
        const wrapper = shallow(<Participants />)

        expect(wrapper.find('h2').text()).toBe("Email Responses")
    })
})