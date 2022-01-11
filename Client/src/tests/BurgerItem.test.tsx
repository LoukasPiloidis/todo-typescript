import { BurgerItem } from '../components/BurgerItem';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing BurgerItem.tsx', () => {
  const burgerItem: burgerItem = {name: '', url: '', };
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<BurgerItem item={burgerItem}/>);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('li');
  });
});