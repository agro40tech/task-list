import { FC } from "react";

import { ITodoModel } from "05-Shared/types";
import { useAppSelector } from "00-App/store";
import { TodoCard } from "04-Entities/TodoCard";

import "./_style.scss";

interface IProps {
  createPresentTodo: (data: { task: string; uuid: string }) => ITodoModel;
}

const TodoList: FC<IProps> = ({ createPresentTodo }) => {
  const todos = useAppSelector((state) => state.todos.todos);

  const uuidActiveEditTodo = useAppSelector((state) => state.todos.activeEdit);

  if (Object.keys(todos).length === 0) {
    return <p>Список задач пуст</p>;
  }

  return (
    <ul className="todo__list">
      {Object.values(todos).map((todo, indexMain) => {
        // Создаем модель
        const todoModel = createPresentTodo({ task: todo.task, uuid: todo.uuid });

        return (
          <li className="todo__list-item" key={indexMain}>
            <TodoCard
              handleClearActiveEdit={() => todoModel.setActiveEdit("")}
              handleCreateSubTodo={() => todoModel.createSubTodo({ task: "" })}
              handleDelete={() => todoModel.deleteTodo()}
              handleSetActiveEdit={() => todoModel.setActiveEdit(todo.uuid)}
              handleSubmit={(changeTask: string) =>
                todoModel.editTodo({ task: changeTask, uuid: todoModel.uuid })
              }
              task={todo.task}
              uuidActiveEditTodo={uuidActiveEditTodo}
            />

            {Object.values(todo.subTodos).length > 0 && (
              <ul className="list-item__list-subtodos">
                {Object.values(todo.subTodos).map((subTodo, indexSub) => {
                  // Создаем и получаем объект подзадачи
                  const subTodoObj = todoModel.createSubTodo({
                    uuid: subTodo.uuid,
                    task: subTodo.task,
                  });

                  return (
                    <li className="list-subtodos__item" key={indexSub}>
                      <TodoCard
                        handleClearActiveEdit={() => todoModel.setActiveEdit("")}
                        handleSetActiveEdit={() => todoModel.setActiveEdit(subTodoObj.uuid)}
                        isSubTodo
                        task={subTodoObj.task}
                        uuidActiveEditTodo={uuidActiveEditTodo}
                        handleDelete={() =>
                          todoModel.deleteSubTodo({
                            uuidPinTodo: todoModel.uuid,
                            uuidSubTodo: subTodoObj.uuid,
                          })
                        }
                        handleSubmit={(changeTask: string) => {
                          todoModel.setActiveEdit("");
                          todoModel.editSubTodo({ task: changeTask, uuid: subTodoObj.uuid });
                        }}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
