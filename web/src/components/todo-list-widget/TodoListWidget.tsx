import { Dispatch } from "react";
import { TaskWithIndex } from "../../types/TaskWithIndex";
import DragAndDrop from "@semcore/ui/drag-and-drop";
import Card from "@semcore/ui/card";
import { BoxProps, Flex } from "@semcore/ui/flex-box";
import { TaskCard } from "../task-card/TaskCard";
import css from "./index.module.scss";

type TodoListWidgetProps = {
  tasks: TaskWithIndex[];
  onTasksChange: Dispatch<React.SetStateAction<TaskWithIndex[]>>;
  onTaskComplete: (task: TaskWithIndex) => void;
  onTaskUncomplete: (task: TaskWithIndex) => void;
  onTaskDelete: (task: TaskWithIndex) => void;
} & BoxProps;

export const TodoListWidget = (props: TodoListWidgetProps) => {
  const {
    tasks,
    onTasksChange,
    onTaskComplete,
    onTaskUncomplete,
    onTaskDelete,
    ...otherProps
  } = props;

  const handleDnD = ({
    fromIndex,
    toIndex,
  }: {
    fromIndex: number;
    toIndex: number;
  }) => {
    onTasksChange((tasks) => {
      const newTasks = [...tasks];
      const swap = newTasks[fromIndex];
      newTasks[fromIndex] = newTasks[toIndex];
      newTasks[toIndex] = swap;
      return newTasks;
    });
  };

  return (
    <DragAndDrop onDnD={handleDnD}>
      <Card flex={1} className={css.list} {...otherProps}>
        <Flex direction="column" gap={1}>
          {tasks.map((task) => (
            <DragAndDrop.Draggable key={task.id}>
              <TaskCard
                task={task}
                onComplete={() => onTaskComplete(task)}
                onUncomplete={() => onTaskUncomplete(task)}
                onDelete={() => onTaskDelete(task)}
              />
            </DragAndDrop.Draggable>
          ))}
        </Flex>
      </Card>
    </DragAndDrop>
  );
};
