import { Logout } from '../components/Logout';
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

describe('testing ItemList.tsx', () => {
  const getUser = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Logout getUser={getUser} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(2);
  });
});