import React from 'react'
// TODO - add proptypes

const LoginStatus = props => {
	if (props.user) {
		return (
			<div className="LoginStatus">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	} else {
		return (
			<div className="LoginStatus">
				<p>Current User:</p>
				<code>
					{JSON.stringify(props)}
				</code>
			</div>
		)
	}
}

export default LoginStatus