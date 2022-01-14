import { RadioList } from '../components/RadioList';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing RadioDaily.tsx', () => {
  const item: Item = {title: 'test', complete: false, id: '1', };
  const toggleCompleteList = () => {};
  const addListItem = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<RadioList item={item} toggleCompleteList={toggleCompleteList} addListItem={addListItem} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(2);
  });
});