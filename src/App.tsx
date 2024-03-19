import '@mantine/code-highlight/styles.css';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import './App.css';
import ColorSchemeHandler from './components/ColorSchemeHandler';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <ColorSchemeScript forceColorScheme="dark" defaultColorScheme="dark" />
      <ColorSchemeHandler />
      <Router />
    </MantineProvider>
  );
}
