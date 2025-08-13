import React, { FC } from 'react';
import { Box, Button, DropZone, Label } from '@adminjs/design-system';
import { BasePropertyProps } from 'adminjs';

const Upload: FC<BasePropertyProps> = (props) => {
  const { property, record, onChange } = props;

  if (!record || !onChange) {
    return null;
  }

  const filesToUpload = record.params[property.name] as File[] | undefined;

  const handleDrop = (files: File[]) => {
    onChange(property.name, files);
  };

  const hasFiles = filesToUpload && filesToUpload.length > 0;
  
  return (
    <Box>
      <Label>{property.label}</Label>
      <DropZone onChange={handleDrop} />
      {hasFiles && (
        <Box mt="default">
          <Label>Selected Files</Label>
          <ul>
            {filesToUpload.map((file, index) => (
              <li key={index}>
                {file.name}
              </li>
            ))}
          </ul>
        </Box>
      )}
      {record.params[property.name] && (
        <Box mt="default">
          <Label>Existing File</Label>
          <a href={record.params[property.name]} target="_blank" rel="noopener noreferrer">
            {record.params[property.name].split('/').pop()}
          </a>
        </Box>
      )}
      <Button onClick={() => onChange(property.name, null)} mt="default" size="sm">
        Clear File
      </Button>
    </Box>
  );
};

export default Upload;