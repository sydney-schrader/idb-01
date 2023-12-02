// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// jest.setup.ts
global.beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation((message?: string) => {
      if (message && message.includes("Failed prop type: The prop `textToHighlight` is marked as required in `Highlighter`, but its value is `undefined`.")) {
        return;
      }
      console.error(message);
    });
  });
  
  global.afterAll(() => {
    (console.error as jest.Mock).mockRestore();
  });
  