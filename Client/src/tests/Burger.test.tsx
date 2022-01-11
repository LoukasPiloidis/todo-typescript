import Burger from '../components/Burger';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing Burger.tsx', () => {
  const user = null;
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Burger user={user}/>);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(2);
  });
});