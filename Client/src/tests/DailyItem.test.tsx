import { DailyItem } from '../components/DailyItem';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing BurgerItem.tsx', () => {
  const item: Item = {title: 'test', complete: false, id: '1', };
  const parentItem = '';
  const toggleCompleteDaily = () => {};
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<DailyItem item={item} parentItem={parentItem} toggleCompleteDaily={toggleCompleteDaily} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('li');
  });
});