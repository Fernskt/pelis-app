import React from 'react';
import { Input, Button, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
}

const styles = {
  wrapper: {
    maxWidth: 480,
    margin: '32px auto 28px auto',
    width: '100%',
    minWidth: 200,
    padding: 0,
  } as React.CSSProperties,
  input: {
    background: '#222',
    color: '#fff',
    borderRadius: 14,
    fontSize: 16,
    border: 'none',
    outline: 'none',
  } as React.CSSProperties,
  button: {
    background: '#ffb300',
    color: '#181818',
    fontWeight: 700,
    fontSize: 15,
    transition: 'background 0.15s',
    cursor: 'pointer',
  } as React.CSSProperties,
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar película...',
  value = '',
}) => {
  const [input, setInput] = React.useState(value);

  const handleInput = (val: string) => {
    setInput(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form style={styles.wrapper} onSubmit={handleSubmit}>
      <InputGroup>
        <Input
          style={styles.input}
          value={input}
          placeholder={placeholder}
          onChange={handleInput}
          autoComplete="off"
        />
        <InputGroup.Button>
          <Button
            style={styles.button}
            type="submit"
            appearance="primary"
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </InputGroup.Button>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
