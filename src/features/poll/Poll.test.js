import { render } from '@testing-library/react';
import Poll from './Poll';

describe('<Poll />', () => {
  it('renders w/o issue', () => {
    const tree = render(<Poll poll={{ author: 'xyz', timestamp: 0 }} />);
    expect(tree).toMatchSnapshot();
  });
});