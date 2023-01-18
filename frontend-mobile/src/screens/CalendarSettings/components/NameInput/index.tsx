import React, { useCallback, useState } from 'react';
import { SettingsInput } from '../SettingsInput';

interface Props {
  initialValue?: string;
  onChange?: (name: string) => void;
}

export const NameInput: React.FC<Props> = ({ initialValue, onChange }) => {
  const [name, setName] = useState(initialValue);

  const handleOnChange = useCallback(
    (text: string) => {
      setName(text);

      if (!text) {
        return;
      }

      onChange?.(text);
    },
    [onChange],
  );

  return <SettingsInput placeholder="Tvoje ime" value={name} onChangeText={handleOnChange} />;
};
