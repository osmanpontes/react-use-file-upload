import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { useFileUpload } from '../lib/useFileUpload';

describe('useFileUpload', () => {
  it('Its initial values are correct', () => {
    const { result } = renderHook(() => useFileUpload());
    expect(result.current.files).toStrictEqual([]);
    expect(result.current.fileNames).toStrictEqual([]);
    expect(result.current.fileTypes).toStrictEqual([]);
    expect(result.current.totalSize).toBe('0 Bytes');
    expect(result.current.totalSizeInBytes).toBe(0);
  });

  it('exports five functions', () => {
    const { result } = renderHook(() => useFileUpload());
    expect(typeof result.current.clearAllFiles).toBe('function');
    expect(typeof result.current.createFormData).toBe('function');
    expect(typeof result.current.handleDragDropEvent).toBe('function');
    expect(typeof result.current.removeFile).toBe('function');
    expect(typeof result.current.setFiles).toBe('function');
  });

  it('appends the files into a new FormData for sending purposes', () => {
    const { result } = renderHook(() => useFileUpload());
    const formData = result.current.createFormData();
    expect(formData instanceof FormData).toBe(true);
  });

  /**
   * Adds new files via selection
   */
  it('adds new files via selection', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });

    Object.defineProperty(event, 'currentTarget', { writable: false, value: { files: [file] } });

    act(() => {
      // @ts-ignore
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(1);
  });

  /**
   * Add files via drag and drop.
   */
  it('adds new files via drag and drop', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new InputEvent('');

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });

    Object.defineProperty(event, 'dataTransfer', { writable: false, value: { files: [file] } });

    act(() => {
      // @ts-ignore
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(1);
  });

  /**
   * Remove a specific file.
   */
  it('removes a specific file', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });

    Object.defineProperty(event, 'currentTarget', { writable: false, value: { files: [file] } });

    act(() => {
      // @ts-ignore
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(1);

    act(() => result.current.removeFile('foo.txt'));
    expect(result.current.files).toHaveLength(0);
  });

  /**
   * Remove all files.
   */
  it('removes all files', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    const file = new File(['foo'], 'foo.txt', {
      type: 'text/plain',
    });

    Object.defineProperty(event, 'currentTarget', { writable: false, value: { files: [file, file, file] } });

    act(() => {
      // @ts-ignore
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(3);

    act(() => result.current.clearAllFiles());
    expect(result.current.files).toHaveLength(0);
  });
});
