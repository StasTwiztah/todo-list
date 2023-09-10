import { FC, PropsWithChildren } from "react";
import css from "./index.module.scss";
import { Flex } from "@semcore/ui/flex-box";

export const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      direction="column"
      hMin="100vh"
      hMax="100vh"
      px="10%"
      py={12}
      boxSizing="border-box"
      className={css.root}
    >
      {children}
    </Flex>
  );
};
