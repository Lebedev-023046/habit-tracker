import type { HabitStatus } from '@/entities/habit/model/types';
import type { DraggableLocation, DropResult } from '@hello-pangea/dnd';
import type { HabitKanbanBoardState, HabitKanbanItem } from './types';

function hasValidDestination(
  result: DropResult,
): result is DropResult & { destination: DraggableLocation } {
  return Boolean(result.destination);
}

export function isSameLocation(
  source: DraggableLocation,
  destination: DraggableLocation,
): boolean {
  return (
    source.droppableId === destination.droppableId &&
    source.index === destination.index
  );
}

function getColumnIds(result: DropResult) {
  const sourceColumnId = result.source.droppableId as HabitStatus;
  const destColumnId = result.destination!.droppableId as HabitStatus;

  return { sourceColumnId, destColumnId };
}

function removeItemAtIndex<T>(items: T[], index: number): [T | undefined, T[]] {
  const copy = [...items];
  const [removed] = copy.splice(index, 1);
  return [removed, copy];
}

function insertItemAtIndex<T>(items: T[], index: number, item: T): T[] {
  const copy = [...items];
  copy.splice(index, 0, item);
  return copy;
}

function reorderWithinColumn(
  prevBoard: HabitKanbanBoardState,
  columnId: HabitStatus,
  sourceIndex: number,
  destIndex: number,
): HabitKanbanBoardState {
  const columnItems = prevBoard[columnId];

  const [movedItem, withoutMoved] = removeItemAtIndex(columnItems, sourceIndex);
  if (!movedItem) return prevBoard;

  const reordered = insertItemAtIndex(withoutMoved, destIndex, movedItem);

  return {
    ...prevBoard,
    [columnId]: reordered,
  };
}

function moveBetweenColumns(
  prevBoard: HabitKanbanBoardState,
  sourceColumnId: HabitStatus,
  destColumnId: HabitStatus,
  sourceIndex: number,
  destIndex: number,
): HabitKanbanBoardState {
  const sourceItems = prevBoard[sourceColumnId];
  const destItems = prevBoard[destColumnId];

  const [movedItem, newSourceItems] = removeItemAtIndex(
    sourceItems,
    sourceIndex,
  );
  if (!movedItem) return prevBoard;

  const updatedItem: HabitKanbanItem = {
    ...movedItem,
    status: destColumnId,
  };

  const newDestItems = insertItemAtIndex(destItems, destIndex, updatedItem);

  return {
    ...prevBoard,
    [sourceColumnId]: newSourceItems,
    [destColumnId]: newDestItems,
  };
}
export function applyDragResult(
  prevBoard: HabitKanbanBoardState,
  result: DropResult,
): HabitKanbanBoardState {
  if (!hasValidDestination(result)) {
    return prevBoard;
  }

  const { source, destination } = result;

  if (isSameLocation(source, destination)) {
    return prevBoard;
  }

  const { sourceColumnId, destColumnId } = getColumnIds(result);

  if (sourceColumnId === destColumnId) {
    return reorderWithinColumn(
      prevBoard,
      sourceColumnId,
      source.index,
      destination.index,
    );
  }

  return moveBetweenColumns(
    prevBoard,
    sourceColumnId,
    destColumnId,
    source.index,
    destination.index,
  );
}
