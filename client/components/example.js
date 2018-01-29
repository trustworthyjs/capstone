class AComponent extends React.Component {
  handleClick () {
    this.setState((prevState) => {
      return { visible: !prevState.visible }
    })
  }

  render () {
    return (
      <div
        onClick={this.handleClick}
        className={this.state.visible ? 'visible' : ''
      >
        <span id="my-thing">
          Hello
        </span>
      </div>
    )
  }
}
