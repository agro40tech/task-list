import type { FC, ReactElement } from "react";

import { useAppDispatch } from "00-App/store";
import { TodoList } from "03-Features/TodoList";
import { TodoNewForm } from "03-Features/TodoNewForm";
import TodoModel from "02-Widgets/Todo/models/TodoModel";

import "./_style.scss";

const Todo: FC = (): ReactElement => {
  const dispatch = useAppDispatch();

  // Функция создания новой задачи
  const createNewTodo = (task: string) => {
    new TodoModel({ task: task, dispatch: dispatch });
  };

  // Функция создания существующей задачи
  const createPresentTodo = (data: { task: string; uuid: string }) => {
    return new TodoModel({ task: data.task, uuid: data.uuid, dispatch: dispatch });
  };

  return (
    <>
      <header className="header">
        <TodoNewForm createNewTodo={createNewTodo} />
      </header>
      <section className="section__todo-list">
        <TodoList createPresentTodo={createPresentTodo} />
      </section>
    </>
  );
};

export default Todo;
