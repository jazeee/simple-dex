import { Button, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Credentials } from './types';

interface AccountFormProps {
  setCredentials: (credentials: Credentials) => void;
}

export function AccountForm(props: AccountFormProps) {
  const { setCredentials } = props;
  const [accountName, setAccountName] = useState('');
  const [password, setPassword] = useState('');
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setCredentials({ accountName, password });
      }}
    >
      <Stack marginY={1} spacing={1}>
        <Typography variant="h1">Dex Auth</Typography>
        <TextField
          type="text"
          label="Account User Name"
          value={accountName}
          onChange={(event) => {
            setAccountName(event.target.value);
          }}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Stack>
    </form>
  );
}
