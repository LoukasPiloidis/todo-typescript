import { RadioDaily } from '../components/RadioDaily';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing RadioDaily.tsx', () => {
  const item: Item = {title: 'test', complete: false, id: '1', };
  const items = [item];
  const toggleCompleteDaily = () => {};
  const addDailyItem = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<RadioDaily item={item} toggleCompleteDaily={toggleCompleteDaily} addDailyItem={addDailyItem} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(3);
  });
});