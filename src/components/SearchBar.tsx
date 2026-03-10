import React from 'react';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import { useBreakpoint } from '../utils/useBreakpoint';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  value?: string;
  width?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Buscar película...',
  value = '',
  width,
}) => {
  const { isXS, isSM } = useBreakpoint();
  const isMobile = isXS || isSM;
  const [input, setInput] = React.useState(value);

  const handleInput = (val: string) => {
    setInput(val);
  };

  const doSearch = () => onSearch(input.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      doSearch();
    }
  };

  const styles = {
    wrapper: {
      maxWidth: width ?? 480,
      padding: 0,
      margin: isMobile ? '0 auto' : '0',
      display: 'flex',
      justifyContent: isMobile ? 'center' : 'flex-start',
      alignItems: isMobile ? 'center' : 'flex-start',
    } as React.CSSProperties,
    input: {
      fontSize: 14,
      border: 'none',
      outline: 'none',
    } as React.CSSProperties,
    button: {
      background: 'var(--color-secundario)',
      color: '#181818',
      fontWeight: 700,
      fontSize: 15,
      transition: 'background 0.15s',
      cursor: 'pointer',
    } as React.CSSProperties,
  };

  return (
    <form style={styles.wrapper} onSubmit={handleSubmit}>
      <InputGroup style={{ height: 36, width: width ?? (isMobile ? '90%' : 480), marginBottom: isMobile ? 16 : 0 }}>
        <Input
          style={styles.input}
          value={input}
          placeholder={placeholder}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          autoComplete="on"
        />
        <InputGroup.Button
          style={styles.button}
          type="submit"
          appearance="primary"
          onClick={(e: React.MouseEvent) => { e.preventDefault(); doSearch(); }}
        >
          <SearchIcon />
        </InputGroup.Button>
      </InputGroup>
    </form>
  );
};

export default SearchBar;
