import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Reading } from './Readings/Reading';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { APP_THEME } from './theme';

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={APP_THEME}>
        <CssBaseline />
        <Box marginY={2}>
          <Reading />
        </Box>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
