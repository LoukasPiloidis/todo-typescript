import { Login } from '../components/Login';
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

describe('testing Login.tsx', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Login />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });
});