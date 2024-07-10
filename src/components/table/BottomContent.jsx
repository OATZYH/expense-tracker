import React from 'react';
import { Button, Pagination } from "@nextui-org/react";

export default function BottomContent({
  page,
  pages,
  setPage,
  onPreviousPage,
  onNextPage,
}) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <Pagination
        // isCompact
        // showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={onNextPage}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
