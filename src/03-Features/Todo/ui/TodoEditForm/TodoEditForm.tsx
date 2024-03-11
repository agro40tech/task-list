import { useEffect, useState } from "react";
import type { ChangeEvent, Dispatch, FC, MouseEvent, ReactElement, SetStateAction } from "react";

import { useAppDispatch } from "00-App/store";
import validator from "05-Shared/utils/validator";
import { ETypeInput, Input } from "05-Shared/ui/Input";
import { Button, ETypeButton, ETypeButtonStyle, ETypeSizeButtom } from "05-Shared/ui/Button";

import TodoModel from "../../models/TodoModel";
import type { TTodo } from "../../models/type";
import { updateTodo } from "../../models/TodoSlice";

import "./_style.scss";

interface IProps {
  todoModel: TodoModel;
  setIsActiveEdit: Dispatch<SetStateAction<boolean>>;
  placeholderTask: string;
}

const TodoEditForm: FC<IProps> = ({
  todoModel,
  setIsActiveEdit,
  placeholderTask,
}): ReactElement => {
  const [changedTask, setChangedTask] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const dispath = useAppDispatch();

  useEffect(() => {
    setChangedTask(placeholderTask);
  }, [placeholderTask]);

  // Валидируем поле chgangeTask
  useEffect((): void => {
    validator({ data: changedTask, setError: setError });
  }, [changedTask]);

  const handleSumbit = (): void => {
    const updatedTodo: TTodo = todoModel.changeTask(changedTask).getTodo;

    dispath(updateTodo(updatedTodo));
    setIsActiveEdit(false);
  };

  return (
    <form className="todo__form-edit-todo">
      <Input
        className="form-edit-todo__input"
        name="changeTask"
        value={changedTask}
        type={ETypeInput.text}
        onChange={(e: ChangeEvent<HTMLInputElement>): void => setChangedTask(e.target.value)}
      />

      <Button
        text="Применить"
        typeSize={ETypeSizeButtom.medium}
        typeStyle={ETypeButtonStyle.primary}
        type={ETypeButton.submit}
        onClick={(e: MouseEvent<HTMLButtonElement>): void => {
          e.preventDefault();
          handleSumbit();
        }}
        disabled={error}
      />
    </form>
  );
};

export default TodoEditForm;
