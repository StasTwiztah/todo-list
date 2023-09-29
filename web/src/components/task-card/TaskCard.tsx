import { Task } from "../../types/Task";
import { Flex } from "@semcore/ui/flex-box";
import { Text } from "@semcore/ui/typography";
import Button from "@semcore/ui/button";
import CheckM from "@semcore/icon/Check/m";
import TrashM from "@semcore/icon/Trash/m";
import CloseM from "@semcore/icon/Close/m";
import { memo } from "react";
import css from "./index.module.scss";

type TaskProps = {
  task: Task;
  onComplete: () => void;
  onUncomplete: () => void;
  onDelete: () => void;
};

export const TaskCard = memo((props: TaskProps) => {
  const {
    task: { description, isActive },
    onComplete,
    onUncomplete,
    onDelete,
  } = props;

  return (
    <Flex
      direction="row"
      gap={1}
      py={2}
      px={6}
      alignItems="center"
      className={css.root}
    >
      <Text
        size={200}
        tag={isActive ? "p" : "s"}
        className={isActive ? "" : css.completed}
        flex={1}
      >
        {description}
      </Text>
      {isActive ? (
        <Button onClick={onComplete}>
          <Button.Addon>
            <CheckM />
          </Button.Addon>
        </Button>
      ) : (
        <Button onClick={onUncomplete}>
          <Button.Addon>
            <CloseM />
          </Button.Addon>
        </Button>
      )}
      <Button onClick={onDelete}>
        <Button.Addon>
          <TrashM />
        </Button.Addon>
      </Button>
    </Flex>
  );
});
