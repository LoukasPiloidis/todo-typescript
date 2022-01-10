import { Signup } from '../components/signup';
import { Welcome } from '../components/Welcome';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing Welcome.tsx', () => {
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<Welcome />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children).toEqual([
      <Signup />,
      <p className="login-prompt">Already a user? Login <a href="/login">here</a></p>
    ]);
  });
});
