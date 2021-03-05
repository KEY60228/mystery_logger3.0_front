import * as React from 'react'
import { screen, render } from '@testing-library/react'

import { VerifyFailedTemplate } from '../../../disposable/VerifyFailed/layout'

describe('VerifyFailedTemplate', () => {
    it('Should render', () => {
        render(<VerifyFailedTemplate />)
        expect(screen.getByTestId('failed')).toBeTruthy();
    })
})