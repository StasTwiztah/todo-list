import { Text } from "@semcore/ui/typography";
import { Page } from "./components/page/Page";
import { TodoWidget } from "./components/todo-widget/TodoWidget";
import { Flex } from "@semcore/ui/flex-box";
import css from "./index.module.scss";

function App() {
  return (
    <Page>
      <Text tag="h1" size={800} color="#fff" textAlign="center" mb={8}>
        Todo List
      </Text>
      <Flex direction="row" justifyContent="center">
        <TodoWidget hMax="80vh" className={css.todoWidget} />
      </Flex>
    </Page>
  );
}

export default App;
