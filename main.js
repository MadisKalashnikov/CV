document.addEventListener("DOMContentLoaded", function () {
	const rootPath = window.location.origin
	const navItems = document.querySelectorAll(".primary-nav .link")
	const bodyEl = document.querySelector("body")
	

	const removeActiveState = () => {
		navItems.forEach(item => item.classList.remove("active"))
	}

	const changePageHandler = (event) => {
		event.preventDefault()

		const pageToLoad = event.target.getAttribute("href")
		bodyEl.querySelector(".main").classList.add("is-animating")
		removeActiveState()
		event.target.classList.add("active")

		window.setTimeout(() => {
			changePage(pageToLoad)
		}, 300)
	}

	const changePage = async (page) => {
		const newPageUrl = `${rootPath}/CV`+ page
		const response = await fetch(newPageUrl)
		const parser = new DOMParser()
		const newDocument = parser.parseFromString(await response.text(), 'text/html')

		const newContent = newDocument.querySelector(".main")

		bodyEl.querySelector(".main").replaceWith(newContent)
		bodyEl.querySelector(".main").classList.remove("is-animating")
		const newUrl = new URL(newPageUrl)
		window.history.pushState({}, "", newUrl)
	}

	navItems.forEach(item => item.addEventListener("click", changePageHandler))
})