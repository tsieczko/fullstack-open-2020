import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = () => {
	return (
		<div>
			<h1>give feedback</h1>
		</div>
	)
}

const Button = ({name, handler}) => {
	return (
		<button onClick={handler}>{name}</button>
	)
}

const Statistics = ({good, neutral, bad}) => {
	const average = () => {
		const result = (good*1 + neutral*0 + bad*-1) / (good + neutral + bad)
		return result ? result : 0
	}

	const positive = () => {
		const result = good / (good + neutral + bad)
		return result ? result : 0
	}

	if (good + neutral + bad) {
		return (
			<div>
				<h2>statistics</h2>
				<p>good {good}</p>
				<p>neutral {neutral}</p>
				<p>bad {bad}</p>
				<p>all {good + neutral + bad}</p>
				<p>average {average()}</p>
				<p>positive {positive()} %</p>
			</div>
		)
	}
	else {
		return(
			<div>
				<p>No feedback given</p>
			</div>
		)
	}
}

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	return (
		<div>
			<Header />
			<Button name='good' handler={() => setGood(good + 1)} />
			<Button name='neutral' handler={() => setNeutral(neutral + 1)} />
			<Button name='bad' handler={() => setBad(bad + 1)} />
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))