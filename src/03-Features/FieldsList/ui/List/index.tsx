import { FC, useState } from "react";

import { TField } from "05-Shared/types";
import { Modal } from "04-Entities/Modal";
import { useAppSelector } from "00-App/store";
import { addIconPlus, deleteIcon, editIcon } from "05-Shared/assets/svg";
import { Button, ETypeButtonSize, ETypeButtonStyle } from "05-Shared/ui/Button";

import Form from "../Form";

import "./_style.scss";

interface IProps {
  createNewField: (data: { name: string; uuidTodos?: string }) => TField;
  deleteField: (data: { uuid: string; uuidTodos: string }) => void;
  editFieldName: (data: { uuid: string; name: string }) => void;
  setActiveField: (uuid: string) => void;
  setFields: (fields: TField[]) => void;
}

const FieldsList: FC<IProps> = ({
  createNewField,
  deleteField,
  editFieldName,
  setActiveField,
  setFields,
}) => {
  // Состояния статуса модальных окон
  const [openConfirmDelete, setOpenConfirmDelete] = useState<boolean>(false);
  const [openEditField, setOpenEditField] = useState<boolean>(false);
  const [openNewField, setOpenNewField] = useState<boolean>(false);

  const activeField = useAppSelector((state) => state.fields.activeField);
  const fieldsStore = useAppSelector((state) => state.fields.fields);

  const fields: TField[] = Object.values(fieldsStore);

  // Инициализируем поля
  if (fields.length !== 0) {
    setFields(fields);
  }

  return (
    <>
      <aside className="fields">
        <div className="fields__buttons">
          <Button
            className="fields__button"
            image={{
              alt: "Добавить новый лист",
              imageSrc: addIconPlus,
            }}
            typeStyle={ETypeButtonStyle.icon}
            onClick={() => setOpenNewField(true)}
          />
          <Button
            className="fields__button"
            image={{
              alt: "Изменить название листа",
              imageSrc: editIcon,
            }}
            typeStyle={ETypeButtonStyle.icon}
            onClick={() => setOpenEditField(true)}
          />
          <Button
            className="fields__button"
            image={{
              alt: "Удалить лист",
              imageSrc: deleteIcon,
            }}
            typeStyle={ETypeButtonStyle.icon}
            onClick={() => setOpenConfirmDelete(true)}
          />
        </div>
        <ul className="fields__list">
          {fields.length !== 0 &&
            fields.map((field, index) => {
              return (
                <li className="fields__list-item" key={index}>
                  <Button
                    text={field.name}
                    className={
                      field.uuid === activeField ? "field__button field__active" : "field__button"
                    }
                    typeStyle={ETypeButtonStyle.primary}
                    typeSize={ETypeButtonSize.medium}
                    onClick={
                      field.uuid !== activeField
                        ? () => {
                            setActiveField(field.uuid);
                          }
                        : undefined
                    }
                  />
                </li>
              );
            })}
        </ul>
      </aside>

      {/* Модальные окна */}
      {openNewField && (
        <Modal setOpen={setOpenNewField}>
          <Form
            buttonText="Создать"
            label="Создание нового листа"
            placeHolder="Название листа"
            onSubmit={(value: string) => {
              const newField = createNewField({
                name: value,
              });

              setActiveField(newField.uuid);
              setOpenNewField(false);
            }}
          />
        </Modal>
      )}

      {openEditField && (
        <Modal setOpen={setOpenEditField}>
          <Form
            buttonText="Применить"
            label="Изминение названия листа"
            placeHolder="Название листа"
            onSubmit={(value: string) => {
              editFieldName({ uuid: activeField, name: value });
              setOpenEditField(false);
            }}
          />
        </Modal>
      )}

      {openConfirmDelete && (
        <Modal setOpen={setOpenConfirmDelete}>
          <div className="confirm-delete__wrapper">
            <span className="confirm-delete__span">Удалить текущий лист?</span>
            <Button
              animate={false}
              className="confirm-delete__button"
              text="Да"
              typeSize={ETypeButtonSize.medium}
              typeStyle={ETypeButtonStyle.primary}
              onClick={() => {
                deleteField({ uuid: activeField, uuidTodos: fieldsStore[activeField].uuidTodos });
                setOpenConfirmDelete(false);
              }}
            />
          </div>
        </Modal>
      )}
    </>
  );
};

export default FieldsList;
