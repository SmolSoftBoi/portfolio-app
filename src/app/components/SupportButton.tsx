import React from 'react';

export default function SupportButton() {
  const koFiUsername = process.env.NEXT_PUBLIC_KOFI_USERNAME;

  if (!koFiUsername) {
    return null;
  }

  return null;
}
