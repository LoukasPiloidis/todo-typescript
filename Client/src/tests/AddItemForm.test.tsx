import { AddItemForm } from '../components/AddItemForm';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing AddItemForm.tsx', () => {
  const addItem = () => {};
  const items: Array<Item> = [];

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<AddItemForm addItem={addItem} items={items} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('form');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(4);
  });
});
