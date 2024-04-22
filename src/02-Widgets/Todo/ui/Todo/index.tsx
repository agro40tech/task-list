import { FC } from 'react'

import { useAppDispatch } from '00-App/store'
import { TodoList } from '03-Features/TodoList'
import { TodoNewForm } from '03-Features/TodoNewForm'
import TodoModel from '02-Widgets/Todo/models/TodoModel'

import './_style.scss'

const Todo: FC = () => {
	const dispatch = useAppDispatch()

	/*
	 * Хендлеры для работы с моделью задачи
	 */

	// Хендлер создания новой задачи
	const createNewTodo = (task: string) => {
		new TodoModel({ task: task, dispatch: dispatch })
	}

	// Хендлер  создания существующей задачи
	const createPresentTodo = (data: {
		task: string
		important: boolean
		uuid: string
	}) => {
		return new TodoModel({
			task: data.task,
			important: data.important,
			uuid: data.uuid,
			dispatch: dispatch,
		})
	}

	return (
		<>
			<header className='header'>
				<TodoNewForm createNewTodo={createNewTodo} />
			</header>
			<section className='section__todo-list'>
				<TodoList createPresentTodo={createPresentTodo} />
			</section>
		</>
	)
}

export default Todo
