/* eslint-disable */
// @ts-nocheck
import { act } from 'react-test-renderer';
import { renderHook } from '@testing-library/react-hooks';
import { useFileUpload } from '../lib/useFileUpload';

const file = new File(['foo'], 'foo.txt', {
  type: 'text/plain',
});

const barFile = new File(['bar'], 'bar.txt', {
  type: 'text/plain',
});

const defineProperty = (obj, key, value) => {
  Object.defineProperty(obj, key, { writable: false, value });
};

describe('useFileUpload', () => {
  it('Its initial values are correct', () => {
    const { result } = renderHook(() => useFileUpload());
    expect(result.current.files).toStrictEqual([]);
    expect(result.current.fileNames).toStrictEqual([]);
    expect(result.current.fileTypes).toStrictEqual([]);
    expect(result.current.totalSize).toBe('0 Bytes');
    expect(result.current.totalSizeInBytes).toBe(0);
  });

  /**
   * Adds new files via selection.
   */
  it('adds new files via selection', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    defineProperty(event, 'currentTarget', { files: [file] });

    act(() => {
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

    defineProperty(event, 'dataTransfer', { files: [file] });

    act(() => {
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

    defineProperty(event, 'currentTarget', { files: [file] });

    act(() => {
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(1);

    act(() => result.current.removeFile('foo.txt'));

    expect(result.current.files).toHaveLength(0);
  });

  /**
   * Remove multiple files by name concurrently.
   */
  it('removes multiple files by name concurrently', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    defineProperty(event, 'currentTarget', { files: [file, barFile] });

    act(() => {
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(2);

    act(() => {
      ['foo.txt', 'bar.txt'].forEach((fileName) => {
        result.current.removeFile(fileName);
      });
    });

    expect(result.current.files).toHaveLength(0);
  });

  /**
   * Remove multiple files by index concurrently.
   */
  it('removes multiple files by index concurrently', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    defineProperty(event, 'currentTarget', { files: [file, barFile] });

    act(() => {
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(2);

    act(() => {
      [1, 0].forEach((fileIndex) => {
        result.current.removeFile(fileIndex);
      });
    });

    expect(result.current.files).toHaveLength(0);
  });

  /**
   * Remove all files.
   */
  it('removes all files', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    defineProperty(event, 'currentTarget', { files: [file, file, file] });

    act(() => {
      result.current.setFiles(event, 'a');
    });

    expect(result.current.files).toHaveLength(3);

    act(() => result.current.clearAllFiles());

    expect(result.current.files).toHaveLength(0);
  });

  /**
   * Create FormData.
   */
  it('appends the files into a new FormData for sending purposes', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    defineProperty(event, 'currentTarget', { files: [file, file] });

    act(() => {
      result.current.setFiles(event, 'a');
    });

    const formData = result.current.createFormData();
    expect(formData instanceof FormData).toBe(true);

    let i = 0;

    for (const file of formData.values()) {
      expect(file instanceof File).toBe(true);
      i++;
    }

    expect(i).toEqual(2);
  });

  /**
   * Calculates the total size of the files.
   */
  it('Calculates the total size of the files', () => {
    const { result } = renderHook(() => useFileUpload());
    const event = new Event('');

    defineProperty(event, 'currentTarget', { files: [file, file] });

    act(() => {
      result.current.setFiles(event, 'a');
    });

    expect(result.current.totalSize).toEqual('6 Bytes');
    expect(result.current.totalSizeInBytes).toEqual(6);
  });
});
