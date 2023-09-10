import { FC, HTMLAttributes, useCallback, useEffect, useState } from "react";
import css from "./index.module.scss";
import { Flex, FlexProps } from "@semcore/ui/flex-box";
import Input from "@semcore/ui/input";
import MathPlusM from "@semcore/icon/MathPlus/m";
import { TaskCard } from "../task-card/TaskCard";
import { Task } from "../../types/Task";
import Button from "@semcore/ui/button";
import { v4 as getUuid } from "uuid";
import Card from "@semcore/ui/card";

export const TodoWidget: FC<FlexProps & HTMLAttributes<HTMLDivElement>> = (
  props
) => {
  const [taskInput, setTaskInput] = useState("");

  const [activeTasks, setActiveTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("ACTIVE_TASKS") || "") || []
  );
  const [doneTasks, setDoneTasks] = useState<Task[]>(
    JSON.parse(localStorage.getItem("DONE_TASKS") || "") || []
  );

  useEffect(() => {
    localStorage.setItem("ACTIVE_TASKS", JSON.stringify(activeTasks));
  }, [activeTasks]);

  useEffect(() => {
    localStorage.setItem("DONE_TASKS", JSON.stringify(doneTasks));
  }, [doneTasks]);

  const addTask = useCallback(() => {
    if (!!taskInput) {
      setActiveTasks((t) => [
        ...t,
        { id: getUuid(), description: taskInput, isActive: true },
      ]);
      setTaskInput("");
    }
  }, [taskInput]);

  const handleTaskDone = (task: Task) => {
    setActiveTasks((t) => t.filter((x) => x.id !== task.id));
    setDoneTasks((t) => [...t, { ...task, isActive: false }]);
  };

  const handleTaskUndone = (task: Task) => {
    setDoneTasks((t) => t.filter((x) => x.id !== task.id));
    setActiveTasks((t) => [...t, { ...task, isActive: true }]);
  };

  const handleTaskDelete = (task: Task) => {
    if (task.isActive) {
      setActiveTasks((t) => t.filter((x) => x.id !== task.id));
    } else {
      setDoneTasks((t) => t.filter((x) => x.id !== task.id));
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
          <Card flex={1} className={css.list}>
            <Flex direction="column" gap={1}>
              {activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDone={() => handleTaskDone(task)}
                  onUndone={() => handleTaskUndone(task)}
                  onDelete={() => handleTaskDelete(task)}
                />
              ))}
            </Flex>
          </Card>
        )}
        {doneTasks.length > 0 && (
          <Card hMin="86px" hMax="236px" className={css.list}>
            <Flex direction="column" gap={1}>
              {doneTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDone={() => handleTaskDone(task)}
                  onUndone={() => handleTaskUndone(task)}
                  onDelete={() => handleTaskDelete(task)}
                />
              ))}
            </Flex>
          </Card>
        )}
      </Flex>
    </Flex>
  );
};
