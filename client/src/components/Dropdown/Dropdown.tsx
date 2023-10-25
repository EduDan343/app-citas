import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

import { User } from '../../types/user.type';
import { Calendar } from '../../types/calendar.type';

interface userProps {
  usersData: User[];
  userSelectedIndex: number;
  setUserSelectedIndex: Function;
}

export default function Dropdown({ usersData, userSelectedIndex, setUserSelectedIndex }: userProps) {
  const [users, setUsers] = React.useState(usersData);

  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    console.log({ eventChange: event.target.value })
    const getUserIndex = users.findIndex(user => user.id === event.target.value)
    console.log({ getUserIndex })
    setUserSelectedIndex(getUserIndex)
    setAge(event.target.value as string);
  };

  React.useEffect(() => {
    setUsers(usersData)
  }, [usersData])

  console.log({ age })

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{users[userSelectedIndex]?.name}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label='Usuarios'
          onChange={handleChange}
        >
          {
            users.map(user => <MenuItem key={user.name} value={user.id}>{user.name}</MenuItem>)
          }
          {/* <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem> */}
        </Select>
      </FormControl>
    </Box>
  );
}