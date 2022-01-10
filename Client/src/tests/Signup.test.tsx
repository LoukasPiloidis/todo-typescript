import { Signup } from '../components/signup';
import { BrowserRouter } from 'react-router-dom';
import * as ShallowRenderer from 'react-test-renderer/shallow';

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => {
    const originalRouterDom = jest.requireActual('react-router-dom');
    return {
        __esModule: true,
        ...originalRouterDom,
        useNavigate: () => mockedNavigate
    };
});

describe('testing Signup.tsx', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Signup />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(6);
  });
});