import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from '../../app/store';

import DashboardPage from "./DashboardPage";


describe('<DashboardPage />', () => {
  it('can toggle the visibility of answered questions', async () => {
    const { getByTestId } = render(
      <BrowserRouter>
        <Provider store={store}>
          <DashboardPage />
        </Provider>
      </BrowserRouter>
    );
    const answeredQs = await getByTestId('toggled');
    const toggler = await getByTestId('toggler');

    expect(answeredQs).toHaveStyle({display: 'none'});
    fireEvent.click(toggler);
    expect(answeredQs).toHaveStyle({display: 'block'});
  });
});