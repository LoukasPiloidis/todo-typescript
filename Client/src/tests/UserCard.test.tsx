import * as ShallowRenderer from 'react-test-renderer/shallow';
import { UserCard } from '../components/UserCard';

describe('testing ItemList.tsx', () => {
  const getUser = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<UserCard getUser={getUser} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(4);
  });
});