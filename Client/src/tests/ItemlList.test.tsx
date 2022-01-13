import { ItemList } from '../components/ItemList';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing ItemList.tsx', () => {
  const item: Item = {title: 'test', complete: false, id: '1', };
  const items = [item];
  const toggleComplete = () => {};
  const toggleRemove = () => {};
  const addListItem = () => {};
  const addFinanceItem = () => {};
  const addDailyItem = () => {};
  const toggleCompleteDaily = () => {};
  const toggleCompleteList = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<ItemList items={items} toggleComplete={toggleComplete} toggleRemove={toggleRemove} addListItem={addListItem} addFinanceItem={addFinanceItem} addDailyItem={addDailyItem} toggleCompleteDaily={toggleCompleteDaily} toggleCompleteList={toggleCompleteList} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(2);
  });
});