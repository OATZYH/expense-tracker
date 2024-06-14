'use client'
import { useEffect } from 'react';
import { Button } from '@nextui-org/react';

export default function error({ error, reset }) {
  useEffect(() => {
		console.error(error);
	}, [error]);
  return (
    <div className="text-center">
    <h2>Something went wrong!</h2>
    <Button
      onPress={() => reset()}
      color="primary"
    >
      Try again
    </Button>
  </div>
  )
}
