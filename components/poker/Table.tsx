import React from "react";
import User from "../user/User";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";

interface TableProps {
  message: string;
  users: string[];
}

const Table: React.FC<TableProps> = ({ message, users }) => {
  const gridSize = 3;
  const totalCells = gridSize * gridSize;

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-4 w-full h-full">
      {Array.from({ length: totalCells }).map((_, index) => {
        if (index === Math.floor(totalCells / 2)) {
          return (
            <div
              key={index}
              className="flex items-center justify-center col-span-1 row-span-1"
            >
              <ResizablePanelGroup direction="horizontal">
                <ResizablePanel>
                  <div className="flex items-center justify-center bg-blue-200 rounded-[10%] h-full">
                    <div className="text-xl font-bold text-center">
                      {message}
                    </div>
                  </div>
                </ResizablePanel>
                <ResizableHandle />
              </ResizablePanelGroup>
            </div>
          );
        } else {
          const userIndex =
            index < Math.floor(totalCells / 2) ? index : index - 1;
          if (users[userIndex] !== undefined) {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center h-full space-y-2"
              >
                <User name={users[userIndex]} />
              </div>
            );
          } else {
            return <div key={index}></div>;
          }
        }
      })}
    </div>
  );
};

export default Table;
