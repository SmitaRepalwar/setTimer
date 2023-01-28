import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    initialTime: 25 * 60,
    time: 25 * 60,
    isTimerOn: false,
    isTimerPaused: false,
  }

  onStartAndPauseButtonClick = () => {
    const {isTimerOn, time} = this.state
    if (time <= 0) {
      clearInterval(this.timerId)
      this.setState({isTimerOn: false})
    } else if (isTimerOn) {
      clearInterval(this.timerId)
      this.setState({isTimerOn: false, isTimerPaused: true})
    } else if (time > 0) {
      this.timerId = setInterval(this.setTimer, 1000)
    }
  }

  setTimer = () => {
    this.setState(prevState => ({
      time: prevState.time - 1,
      isTimerOn: true,
    }))
  }

  onIncrease = () => {
    this.setState(prevState => ({
      time: prevState.time + 60,
      initialTime: prevState.initialTime + 60,
    }))
  }

  onDecrease = () => {
    this.setState(prevState => ({
      time: prevState.time - 60,
      initialTime: prevState.initialTime - 60,
    }))
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({
      time: 25 * 60,
      initialTime: 25 * 60,
      isTimerPaused: false,
      isTimerOn: false,
    })
  }

  render() {
    const {time, isTimerOn, isTimerPaused, initialTime} = this.state

    if (time <= 0) {
      clearInterval(this.timerId)
    }

    const isButtonInable = !isTimerOn && !isTimerPaused

    const minutes = Math.floor(time / 60)
    const seconds = time % 60

    const minute = minutes <= 9 ? `0${minutes}` : minutes
    const second = seconds <= 9 ? `0${seconds}` : seconds

    return (
      <div className="bg-con">
        <div className="box-con">
          <h1>Digital Timer</h1>
          <div className="timer-con">
            <div className="timer">
              <div className="time-card">
                <h1 className="time">
                  {minute}:{second}
                </h1>
                <p className="running">{isTimerOn ? 'Running' : 'Paused'}</p>
              </div>
            </div>
            <div className="pause-reset-con">
              <div className="pause-reset">
                <div className="pause-reset">
                  <button
                    onClick={this.onStartAndPauseButtonClick}
                    type="button"
                    className="pause-reset-button pause-reset-text"
                  >
                    {isTimerOn ? (
                      <img
                        className="pause-reset-icon"
                        alt="pause icon"
                        src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      />
                    ) : (
                      <img
                        className="pause-reset-icon"
                        alt="play icon"
                        src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      />
                    )}
                    {isTimerOn ? 'Pause' : 'Start'}
                  </button>
                </div>
                <div className="pause-reset">
                  <button
                    onClick={this.onReset}
                    type="button"
                    className="pause-reset-button  pause-reset-text"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                      className="pause-reset-icon"
                      alt="reset icon"
                    />
                    Reset
                  </button>
                </div>
              </div>
              <p className="set-timer-text">Set Timer Limit</p>
              <div className="button-con">
                <button
                  onClick={isButtonInable && this.onDecrease}
                  type="button"
                  className="operator-button"
                >
                  -
                </button>
                <p type="button" className="button-25">
                  {Math.floor(initialTime / 60)}
                </p>
                <button
                  onClick={isButtonInable && this.onIncrease}
                  type="button"
                  className="operator-button"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
