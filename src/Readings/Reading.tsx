import { Container, Skeleton, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { AccountForm } from '../Account/Form';
import { Credentials } from '../Account/types';
import { useAuth } from './useAuth';
import { useReading } from './useReading';

export function Reading() {
  const [credentials, setCredentials] = useState<Credentials>();
  const { authToken, isAuthSuccess, isAuthError } = useAuth(credentials);
  const { lastReading, isReadingSuccess, isReadingError } =
    useReading(authToken);
  return (
    <Container maxWidth="md">
      <Stack spacing={2}>
        <AccountForm
          setCredentials={(credentials) => {
            setCredentials(credentials);
          }}
        />
        {credentials ? (
          <Stack spacing={2}>
            <Typography variant="h1">Results</Typography>
            <Typography variant="h2" component="p" color="primary">
              {lastReading ? (
                <>
                  Reading Value: <b>{lastReading.Value} mg/dL</b>
                  <br />
                  Trend: <b>{lastReading.Trend}</b>
                </>
              ) : (
                <>
                  <Skeleton />
                  <Skeleton />
                </>
              )}
            </Typography>
            <Typography variant="h2">Debug</Typography>
            <Typography variant="caption">
              AuthState: {JSON.stringify({ isAuthSuccess, isAuthError })}
            </Typography>
            <Typography variant="caption">
              ReadingState:{' '}
              {JSON.stringify({ isReadingSuccess, isReadingError })}
            </Typography>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}
