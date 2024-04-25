import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import { checkIcon } from '05-Shared/assets/svg'
import validator from '05-Shared/utils/validator'
import { TextArea } from '05-Shared/ui/TextArea'
import { ErrorAlert } from '05-Shared/ui/ErrorAlert'
import { Button, ETypeButton, ETypeButtonStyle } from '05-Shared/ui/Button'

import style from './_style.module.scss'

interface IProps {
	placeholderTask: string
	setIsActiveEdit: (isActiveEdit: boolean) => void
	submitHandle: (changedTask: string) => void
}

/**
 * (Entities)\
 * \
 * Функциональный компонент предназначенный для отображения формы редактирования задачи.
 */
const TodoEditForm: FC<IProps> = ({
	placeholderTask,
	submitHandle,
	setIsActiveEdit,
}) => {
	const [changedTask, setChangedTask] = useState<string>(placeholderTask)
	const [error, setError] = useState<boolean>(false)
	const [errorMessage, setErrorMessage] = useState<string>('')

	const ref: React.LegacyRef<HTMLFormElement> = useRef(null)

	// Проводим валидацию поля changedTask
	useEffect(() => {
		validator({
			data: changedTask,
			setError: setError,
			setErrorMessage: setErrorMessage,
		})
	}, [changedTask])

	// Расширение функции обработчика подтверждения формы
	const handleSubmit = (): void => {
		if (!error) {
			submitHandle(changedTask)
			setIsActiveEdit(false)
		}
	}

	return (
		<form
			className={style.form}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
			ref={ref}
		>
			{errorMessage.length > 0 && <ErrorAlert errorMessage={errorMessage} />}

			<TextArea
				focus={true}
				className={style.form__textarea}
				name='changeTask'
				onChange={(e: ChangeEvent<HTMLTextAreaElement>): void =>
					setChangedTask(e.target.value)
				}
				refCallBack={() => handleSubmit()}
				value={changedTask}
			/>

			<Button
				className={style.form__button}
				disabled={error}
				type={ETypeButton.submit}
				typeStyle={ETypeButtonStyle.icon}
				image={{
					imageSrc: checkIcon,
					alt: 'Кнопка подтвердить',
				}}
			/>
		</form>
	)
}

export default TodoEditForm
