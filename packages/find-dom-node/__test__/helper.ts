export function captureConsoleErrors() {
  const originalError = console.error;
  const errors: string[] = [];

  console.error = function (...args: any) {
    originalError.apply(console, args); // Preserve the original behavior
    errors.push(args);
  };

  return {
    getErrors: () => errors,
    restore: () => {
      console.error = originalError;
    }
  };
}