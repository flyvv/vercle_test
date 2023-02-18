import React, { useEffect, useState, useRef } from 'react'
import './index.less'

let interval
let direction = 'right'
const size = { row: 20, col: 20 }
const red = <div className="red"></div>
const black = <div className="black"></div>
const Snake: React.FC = (props: any) => {
	const [isRunning, setIsRunning] = useState<Boolean>(false)
	const [snake, setSnake] = useState<any>([{ x: 0, y: 0 }])
	const [speed, setSpeed] = useState<number>(500)
	const [food, setFood] = useState<any>({ x: 0, y: 5 })
	const foodRef = useRef<any>()
	foodRef.current = food
	const speedRef = useRef<number>()
	speedRef.current = speed

	useEffect(() => {
		if (isRunning) {
			document.addEventListener('keydown', keyDownPress)
		}
		return () => {
			document.removeEventListener('keydown', keyDownPress)
		}
	}, [isRunning])

	// 监听键盘事件
	const keyDownPress = (e) => {
		switch (e.key) {
			case 'ArrowDown':
				direction = 'down'
				break
			case 'ArrowLeft':
				direction = 'left'
				break
			case 'ArrowUp':
				direction = 'up'
				break
			case 'ArrowRight':
				direction = 'right'
				break
			default:
				break
		}
	}

	// 开始
	const clickStart = () => {
		console.log(speedRef.current)
		interval && clearInterval(interval)
		interval = setInterval(function () {
			move()
		}, speedRef.current)
		setIsRunning(true)
	}

	// snake移动，碰撞检测、吃食物、整体移动等都是在move()函数处理
	const move = () => {
		let food = foodRef.current || { x: 0, y: 0 }
		let first = { x: snake[0].x, y: snake[0].y }
		let last = {}
		switch (direction) {
			case 'up':
				first.x -= 1
				break
			case 'down':
				first.x += 1
				break
			case 'left':
				first.y -= 1
				break
			case 'right':
				first.y += 1
				break
			default:
				break
		}

		if (
			snake.length > 1 &&
			first.x == snake[1].x &&
			first.y == snake[1].y
		) {
			// 前进方向不能逆行
			switch (direction) {
				case 'up':
					first.x += 2
					break
				case 'down':
					first.x -= 2
					break
				case 'left':
					first.y += 2
					break
				case 'right':
					first.y -= 2
					break
				default:
					break
			}
		}

		// 碰撞检测
		if (collision(first)) {
			clearInterval(interval)
			alert('Game Over!')
			return
		}

		let eat = false
		// 吃到食物
		if (first.x === food.x && first.y === food.y) {
			eat = true
			last = {
				x: snake[snake.length - 1].x,
				y: snake[snake.length - 1].y,
			}
		}

		// 蛇整体动起来
		for (let s in snake) {
			var next_first = { x: snake[s].x, y: snake[s].y }
			snake[s].x = first.x
			snake[s].y = first.y
			first = next_first
		}
		// 吃到食物之后蛇变长
		if (eat) {
			eat = false
			snake[snake.length] = last
			showNewFood()
		}

		// 这里如果直接用setSnake(snake)，react会判断数组没变，不会重新渲染
		// 前面用JSON.parse(JSON.stringify(snake))深拷贝也不行。。。
		setSnake([...snake])
	}

	// 碰撞检测
	const collision = (first) => {
		// 碰到边界
		if (
			first.x > size.row - 1 ||
			first.x < 0 ||
			first.y > size.col - 1 ||
			first.y < 0
		) {
			return true
		}
		// 碰到自己
		// for(let i = 0; i < snake.length; i++) {
		//   if(snake[i].x === first.x && snake[i].y === first.y) {
		//     return true
		//   }
		// }
		let _snake = snake.filter(
			(item) => item.x === first.x && item.y === first.y
		)
		if (_snake.length > 0) {
			return true
		}
		return false
	}

	// 用于生成下一个食物点（排除snake和当前food）
	const showNewFood = () => {
		let nextArr: any = []
		for (let r = 0; r < size.row; r++) {
			for (let c = 0; c < size.col; c++) {
				if (getStatus(r, c) === 0) {
					let n = { x: r, y: c }
					nextArr.push(n)
				}
			}
		}
		let nextIndex = Math.round(Math.random() * nextArr.length - 1)
		setFood({ x: nextArr[nextIndex].x, y: nextArr[nextIndex].y })
		// 加速后需要重启定时器
		setSpeed(speedRef.current - 20)
		clickPause()
		clickStart()
	}

	// 判断当前点是snake或者food，渲染的时候调用，生成新食物的时候也要用
	const getStatus = (r, c) => {
		for (let s in snake) {
			if (snake[s].x === r && snake[s].y === c) {
				// snake
				return 1
			}
			if (food.x === r && food.y === c) {
				// food
				return 2
			}
		}
		return 0
	}

	// 暂停
	const clickPause = () => {
		interval && clearInterval(interval)
		setIsRunning(false)
	}

	// 渲染表格，数据更新后会自动调用这个函数
	const refresh = () => {
		let trArr = []
		for (let i = 0; i < size.row; i++) {
			let tdArr = []
			for (let j = 0; j < size.col; j++) {
				let value = getStatus(i, j)
				if (value === 0) {
					tdArr.push(<td key={i * 20 + j}></td>)
				} else if (value === 1) {
					tdArr.push(<td key={i * 20 + j}>{black}</td>)
				} else if (value === 2) {
					tdArr.push(<td key={i * 20 + j}>{red}</td>)
				}
			}
			trArr.push(<tr key={i}>{tdArr}</tr>)
		}
		return <tbody>{trArr}</tbody>
	}
	return (
		<div>
			<div className="game_background">
				<table border="1">{refresh()}</table>
			</div>
			<div className="start">
				<button
					className="button"
					onClick={() => {
						clickStart()
					}}
				>
					开始
				</button>
				<button
					className="button"
					onClick={() => {
						clickPause()
					}}
				>
					暂停
				</button>
			</div>
		</div>
	)
}
export default Snake
