import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";
import css from "./index.module.scss";
import { Flex, FlexProps } from "@semcore/ui/flex-box";
import Input from "@semcore/ui/input";
import MathPlusM from "@semcore/icon/MathPlus/m";
import Button from "@semcore/ui/button";
import { v4 as getUuid } from "uuid";
import Card from "@semcore/ui/card";
import {
  ACTIVE_TASKS_LOCALSTORAGE_NAME,
  COMPLETED_TASKS_LOCALSTORAGE_NAME,
} from "../../shared/constants/constants";
import { TaskWithIndex } from "../../types/TaskWithIndex";
import { TodoListWidget } from "../todo-list-widget/TodoListWidget";

export const TodoWidget: FC<FlexProps & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const [taskInput, setTaskInput] = useState("");

  const [activeTasks, setActiveTasks] = useState<TaskWithIndex[]>(() => {
    const stored = localStorage.getItem(ACTIVE_TASKS_LOCALSTORAGE_NAME);

    if (stored) {
      return JSON.parse(stored) || [];
    }

    return [];
  });
  const [completedTasks, setCompletedTasks] = useState<TaskWithIndex[]>(() => {
    const stored = localStorage.getItem(COMPLETED_TASKS_LOCALSTORAGE_NAME);

    if (stored) {
      return JSON.parse(stored) || [];
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      ACTIVE_TASKS_LOCALSTORAGE_NAME,
      JSON.stringify(activeTasks)
    );
  }, [activeTasks]);

  useEffect(() => {
    localStorage.setItem(
      COMPLETED_TASKS_LOCALSTORAGE_NAME,
      JSON.stringify(completedTasks)
    );
  }, [completedTasks]);

  const addTask = useCallback(() => {
    if (!!taskInput) {
      setActiveTasks((t) => [
        ...t,
        {
          id: getUuid(),
          description: taskInput,
          isActive: true,
          index: t.length,
        },
      ]);
      setTaskInput("");
    }
  }, [taskInput]);

  const handleTaskComplete = (task: TaskWithIndex) => {
    setActiveTasks((t) => t.filter((x) => x.id !== task.id));
    setCompletedTasks((t) => [
      ...t,
      { ...task, isActive: false, index: t.length },
    ]);
  };

  const handleTaskUncomplete = (task: TaskWithIndex) => {
    setCompletedTasks((t) => t.filter((x) => x.id !== task.id));
    setActiveTasks((t) => [...t, { ...task, isActive: true, index: t.length }]);
  };

  const handleTaskDelete = (task: TaskWithIndex) => {
    if (task.isActive) {
      setActiveTasks((t) => t.filter((x) => x.id !== task.id));
    } else {
      setCompletedTasks((t) => t.filter((x) => x.id !== task.id));
    }
  };

  const handleKeyUp = (e?: { key: string }) => {
    if (e?.key === "Enter") {
      addTask();
    }

    if (e?.key === "Escape") {
      setTaskInput("");
    }
  };

  return (
    <Flex w="100%" wMax="1120px" px={4} direction="column" gap={2} {...props}>
      <Card flex={1} className={css.input}>
        <Input size="l">
          <Input.Value
            placeholder="Task"
            value={taskInput}
            onChange={setTaskInput}
            onKeyUp={(e) => handleKeyUp(e)}
          />
          <Input.Addon tag={Button} interactive={true} onClick={addTask}>
            <MathPlusM />
          </Input.Addon>
        </Input>
      </Card>
      <Flex direction="column" gap={2} className={css.content}>
        {activeTasks.length > 0 && (
          <TodoListWidget
            tasks={activeTasks}
            onTasksChange={setActiveTasks}
            onTaskComplete={handleTaskComplete}
            onTaskUncomplete={handleTaskUncomplete}
            onTaskDelete={handleTaskDelete}
          />
        )}
        {completedTasks.length > 0 && (
          <TodoListWidget
            hMin="86px"
            hMax="236px"
            tasks={completedTasks}
            onTasksChange={setCompletedTasks}
            onTaskComplete={handleTaskComplete}
            onTaskUncomplete={handleTaskUncomplete}
            onTaskDelete={handleTaskDelete}
          />
        )}
      </Flex>
    </Flex>
  );
};
