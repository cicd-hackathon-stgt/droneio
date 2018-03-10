import { getHelloText } from './hello';

describe('Hello', function () {
  it('should get the hello text', function () {
    const text = getHelloText();
    expect(text).toEqual('hello');

  });
});
