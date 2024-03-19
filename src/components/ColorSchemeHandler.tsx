import { useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';

function ColorSchemeHandler() {
  const { setColorScheme } = useMantineColorScheme();
  useEffect(() => {
    setColorScheme('dark');
  }, []);

  return null;
}

export default ColorSchemeHandler;
