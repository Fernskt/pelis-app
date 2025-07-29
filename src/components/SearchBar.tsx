import React from 'react';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useBreakpoint } from '../utils/useBreakpoint';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar película...',
  value = '',
}) => {
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;
  const [input, setInput] = React.useState(value);

  const handleInput = (val: string) => {
    setInput(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  const styles = {
    wrapper: {
      maxWidth: 480,
      padding: 0,
      margin: isMobile ? '0 auto' : '0',
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-start',
      alignItems: isMobile ? 'center' : 'flex-start',
    } as React.CSSProperties,
    input: {
      background: '#222',
      color: '#fff',
      fontSize: 14,
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

  return (
    <form style={styles.wrapper} onSubmit={handleSubmit}>
      <InputGroup style={{ height: 36, width: isMobile ? '90%' : 480, marginBottom: isMobile ? 16 : 0 }}>
        <Input
          style={styles.input}
          value={input}
          placeholder={placeholder}
          onChange={handleInput}
          autoComplete="on"
        />
        <InputGroup.Button style={styles.button}
          type="submit"
          appearance="primary">
          <SearchIcon />

        </InputGroup.Button>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
