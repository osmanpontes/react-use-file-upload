import { renderHook, act } from '@testing-library/react-hooks';
import { useFileUpload } from '../lib/useFileUpload';

/**
 * @todo
 * - figure out an easy way to mock FileList
 */
describe('useFileUpload', () => {
  it('Its initial values are correct', () => {
    const { result } = renderHook(() => useFileUpload());
    expect(result.current.files).toStrictEqual([]);
    expect(result.current.fileNames).toStrictEqual([]);
    expect(result.current.fileTypes).toStrictEqual([]);
    expect(result.current.totalSize).toBe('');
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
});
