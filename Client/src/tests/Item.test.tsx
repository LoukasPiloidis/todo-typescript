import { Item } from '../components/Item';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing Item.tsx', () => {
  const item: Item = {title: 'test', complete: false, id: '1', };
  const toggleComplete = () => {};
  const toggleEdit = () => {};
  const toggleRemove = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Item item={item} toggleComplete={toggleComplete} toggleEdit={toggleEdit} toggleRemove={toggleRemove} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('li');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(3);
  });
});