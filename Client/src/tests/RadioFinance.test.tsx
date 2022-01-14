import { RadioFinance } from '../components/RadioFinance';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing RadioFinance.tsx', () => {
  const item: Item = {title: 'test', complete: false, id: '1', };
  const items = [item];
  const addFinanceItem = () => {};

  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<RadioFinance item={item} addFinanceItem={addFinanceItem} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children.length).toEqual(3);
  });
});