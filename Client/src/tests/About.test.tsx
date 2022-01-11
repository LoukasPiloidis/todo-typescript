import { About } from '../components/About';
import * as ShallowRenderer from 'react-test-renderer/shallow';

describe('testing About.tsx', () => {
  const getUser = () => {};
  const renderer = ShallowRenderer.createRenderer();
  renderer.render(<About getUser={getUser} />);
  const result = renderer.getRenderOutput();

  test('component renders as div', () => {
    expect(result.type).toBe('div');
  });

  test('component renders correctly', () => {
    expect(result.props.children).toEqual([
      <h2 className="about-title">About this app</h2>,
      <p>This app was developed with Typescript, React, and socket.io. It is deployed on Heroku, as part of an assignment for ubiquity's screening process.</p>,
      <br />,
      <p>The sole developer is Loukas Piloidis.</p>,
      <br />,
      <p>You can find his GitHub page <a href="https://github.com/LoukasPiloidis">here</a>, his linkedIn profile <a href="https://www.linkedin.com/in/loukaspiloidis/">here</a>, and his facebook profile <a href="https://www.facebook.com/loukas.piloidis">here</a>.</p>
    ]);
  });
});
