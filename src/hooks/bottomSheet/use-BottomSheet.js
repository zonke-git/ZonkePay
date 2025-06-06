import {useCallback, useMemo, useRef} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';

export const useBottomSheet = () => {
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const data = useMemo(
    () =>
      Array(5)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );

  const handleSheetChanges = useCallback(index => {
    console.log('Bottom Sheet Index:', index);
  }, []);

  const openSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  return {
    bottomSheetRef,
    snapPoints,
    handleSheetChanges,
    openSheet,
    closeSheet,
    data,
  };
};
