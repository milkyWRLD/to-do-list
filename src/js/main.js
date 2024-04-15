document.addEventListener('DOMContentLoaded', () => {
	// Функция для отображения формы входа
	function showLoginForm() {
		document.getElementById('login-in').classList.remove('none')
		document.getElementById('login-in').classList.add('block')
		document.getElementById('login-up').classList.remove('block')
		document.getElementById('login-up').classList.add('none')
	}

	// Функция для отображения формы регистрации
	function showRegisterForm() {
		document.getElementById('login-up').classList.remove('none')
		document.getElementById('login-up').classList.add('block')
		document.getElementById('login-in').classList.remove('block')
		document.getElementById('login-in').classList.add('none')
	}

	// Обработчик события для кнопки "Зарегистрироваться"
	document.getElementById('sign-up').addEventListener('click', event => {
		event.preventDefault()
		showRegisterForm()
	})

	// Обработчик события для кнопки "Войти"
	document.getElementById('sign-in').addEventListener('click', event => {
		event.preventDefault()
		showLoginForm()
	})

	// Функция для отправки уведомления в консоль
	function sendNotification(message, type) {
		console.log(`${type.toUpperCase()}: ${message}`)
	}

	// Функция для регистрации нового пользователя
	function register(username, password) {
		// Проверяем, существует ли уже пользователь с таким именем
		if (localStorage.getItem(username)) {
			sendNotification('Пользователь с таким именем уже существует', 'error')
			return
		}

		// Сохраняем пароль пользователя
		localStorage.setItem(username, password)

		// Отправляем уведомление о успешной регистрации
		sendNotification('Регистрация прошла успешно', 'success')

		// Показываем форму входа
		showLoginForm()
	}

	// Функция для входа пользователя
	function login(username, password) {
		// Проверяем, существует ли пользователь с таким именем и паролем
		if (localStorage.getItem(username) === password) {
			// Отправляем уведомление о успешном входе
			sendNotification('Вход выполнен успешно', 'success')
			return true
		} else {
			// Отправляем уведомление об ошибке
			sendNotification('Неверное имя пользователя или пароль', 'error')
			return false
		}
	}

	// Обработчик события для формы регистрации
	document.getElementById('login-up').addEventListener('submit', event => {
		event.preventDefault()

		// Получаем введенное имя пользователя и пароль
		const username = document.getElementById('register-username').value
		const password = document.getElementById('register-password').value

		// Регистрируем пользователя
		register(username, password)
	})

	// Обработчик события для формы входа
	document.getElementById('login-in').addEventListener('submit', event => {
		event.preventDefault()

		// Получаем введенное имя пользователя и пароль
		const username = document.getElementById('login-username').value
		const password = document.getElementById('login-password').value

		// Входим под пользователем
		if (login(username, password)) {
			// Перенаправляем на страницу планировщика задач
			window.location.href = 'task-planner.html'
		}
	})

	// Добавляем обработчики для вкладок категорий
	const tabs = document.querySelectorAll('.tab')
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// Очищаем активный класс у всех вкладок
			tabs.forEach(tab => {
				tab.classList.remove('active')
			})

			// Добавляем активный класс только текущей вкладке
			tab.classList.add('active')
		})
	})

	// Добавляем обработчик для добавления задачи в выбранную категорию
	const taskForm = document.getElementById('task-form')
	taskForm.addEventListener('submit', event => {
		event.preventDefault()

		// Получаем выбранную категорию
		const activeTab = document.querySelector('.tab.active')
		const category = activeTab.getAttribute('data-category')

		// Получаем введенную задачу
		const newTaskInput = document.getElementById('new-task')
		const newTask = newTaskInput.value.trim()

		if (newTask !== '') {
			// Создаем элемент задачи и добавляем его в соответствующий контейнер
			const taskItem = document.createElement('div')
			taskItem.classList.add('task')
			taskItem.textContent = newTask

			const tasksContainer = document.querySelector(
				`.task-planner__tasks[data-category="${category}"]`
			)
			tasksContainer.appendChild(taskItem)

			// Очищаем поле ввода
			newTaskInput.value = ''

			// Выводим уведомление о добавлении задачи
			const taskNotification = document.getElementById('task-notification')
			taskNotification.textContent = 'Задача успешно добавлена'
			setTimeout(() => {
				taskNotification.textContent = ''
			}, 2000)
		}
	})
})
