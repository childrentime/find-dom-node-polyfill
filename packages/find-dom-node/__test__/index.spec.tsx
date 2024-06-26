/**
 * @vitest-environment jsdom
 */

import { expect, describe, it } from 'vitest'
import { findDOMNode } from '../src';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { captureConsoleErrors } from './helper';

/**
 * @description copy from findDOMNodeFB.test.js
 */
describe('findDOMNode', () => {
  it('findDOMNode should return null if passed null', () => {
    expect(findDOMNode(null)).toBe(null);
  });

  it('findDOMNode should find dom element', () => {
    class MyNode extends React.Component {
      render() {
        return (
          <div>
            <span>Noise</span>
          </div>
        );
      }
    }

    const container = document.createElement('div');
    const myNode = ReactDOM.render(<MyNode />, container);
    const myDiv = ReactDOM.findDOMNode(myNode);
    const mySameDiv = ReactDOM.findDOMNode(myDiv);
    expect(myDiv.tagName).toBe('DIV');
    expect(mySameDiv).toBe(myDiv);
  });

  it('findDOMNode should find dom element after an update from null', () => {
    function Bar({flag}) {
      if (flag) {
        return <span>A</span>;
      }
      return null;
    }
    class MyNode extends React.Component<{flag?: boolean}> {
      render() {
        return <Bar flag={this.props.flag} />;
      }
    }

    const container = document.createElement('div');

    const myNodeA = ReactDOM.render(<MyNode />, container);
    const a = ReactDOM.findDOMNode(myNodeA);
    expect(a).toBe(null);

    const myNodeB = ReactDOM.render(<MyNode flag={true} />, container);
    expect(myNodeA === myNodeB).toBe(true);

    const b = ReactDOM.findDOMNode(myNodeB);
    expect(b.tagName).toBe('SPAN');
  });

  it('findDOMNode should reject random objects', () => {
    expect(function () {
      ReactDOM.findDOMNode({foo: 'bar'});
    }).toThrowError('Argument appears to not be a ReactComponent. Keys: foo');
  });

  it('findDOMNode should reject unmounted objects with render func', () => {
    class Foo extends React.Component {
      render() {
        return <div />;
      }
    }

    const container = document.createElement('div');
    const inst = ReactDOM.render(<Foo />, container);
    ReactDOM.unmountComponentAtNode(container);

    expect(() => ReactDOM.findDOMNode(inst)).toThrowError(
      'Unable to find node on an unmounted component.',
    );
  });

  it('findDOMNode should not throw an error when called within a component that is not mounted', () => {
    class Bar extends React.Component {
      UNSAFE_componentWillMount() {
        expect(ReactDOM.findDOMNode(this)).toBeNull();
      }

      render() {
        return <div />;
      }
    }
    expect(() => {
      const container = document.createElement('div');
      ReactDOM.render(<Bar />, container);
    }).not.toThrow();
  });

  it('findDOMNode should warn if used to find a host component inside StrictMode', () => {
    let parent = undefined;
    let child = undefined;

    class ContainsStrictModeChild extends React.Component {
      render() {
        return (
          <StrictMode>
            <div ref={n => (child = n)} />
          </StrictMode>
        );
      }
    }

    const container = document.createElement('div');
    ReactDOM.render(
      <ContainsStrictModeChild ref={n => (parent = n)} />,
      container,
    );

    const errors = captureConsoleErrors();
    let match = ReactDOM.findDOMNode(parent);
    expect(errors.getErrors()).toMatchSnapshot();
    expect(match).toBe(child);
  });

  it('findDOMNode should warn if passed a component that is inside StrictMode', () => {
    let parent = undefined;
    let child = undefined;

    class IsInStrictMode extends React.Component {
      render() {
        return <div ref={n => (child = n)} />;
      }
    }

    const container = document.createElement('div');

    ReactDOM.render(
      <StrictMode>
        <IsInStrictMode ref={n => (parent = n)} />
      </StrictMode>,
      container,
    );

    const errors = captureConsoleErrors();
    let match = ReactDOM.findDOMNode(parent);
    expect(errors.getErrors()).toMatchSnapshot();
    expect(match).toBe(child);
  });
})