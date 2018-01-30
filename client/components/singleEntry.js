import React from 'react';
<<<<<<< HEAD
import {connect} from 'react-redux';
import {getEntryDb} from '../store';
import {withRouter} from 'react-router';
import Paper from 'material-ui/Paper';

const style = {
  height: 500,
  width: 100,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block'
}

export class SingleEntry extends React.Component {

  componentDidMount(){
    if (!this.props.singleEntry){
      this.props.getOneEntry(+this.props.match.params.entryId)
    }
  }
=======
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

export default class CardExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
    };
  }

  handleExpandChange = (expanded) => {
    this.setState({expanded: expanded});
  };

  handleToggle = (event, toggle) => {
    this.setState({expanded: toggle});
  };

  handleExpand = () => {
    this.setState({expanded: true});
  };

  handleReduce = () => {
    this.setState({expanded: false});
  };
>>>>>>> e5717dfdc05123c984120b5e42641342781484c0

  render() {
    let entry = this.props.singleEntry
    return (
<<<<<<< HEAD
      <div>
        {entry.submitted ?
          <div>
            <Paper style={style} zDepth={1} rounded={false}>
              <h1>Title: {entry.title}</h1>
              <h2>Saved At: {entry.savedAt}</h2>
              <p>{entry.content}</p>
            </Paper>
          </div>
        :
        <h1>This entry is still in progress</h1>
        }
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    singleEntry: state.singleEntry
  }
}

const mapDispatch = (dispatch) => {
  return {
    getOneEntry: (entryId) => {
      dispatch(getEntryDb(entryId))
    }
=======
      <Card expanded={this.state.expanded} onExpandChange={this.handleExpandChange}>
        <CardHeader
          title="URL Avatar"
          subtitle="Subtitle"
          //avatar="images/ok-128.jpg"
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText>
          <Toggle
            toggled={this.state.expanded}
            onToggle={this.handleToggle}
            labelPosition="right"
            label="This toggle controls the expanded state of the component."
          />
        </CardText>
        <CardMedia
          expandable={true}
          overlay={<CardTitle title="Overlay title" subtitle="Overlay subtitle" />}
        >
          <img src="images/nature-600-337.jpg" alt="" />
        </CardMedia>
        <CardTitle title="Card title" subtitle="Card subtitle" expandable={true} />
        <CardText expandable={true}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions>
          <FlatButton label="Expand" onClick={this.handleExpand} />
          <FlatButton label="Reduce" onClick={this.handleReduce} />
        </CardActions>
      </Card>
    );
>>>>>>> e5717dfdc05123c984120b5e42641342781484c0
  }
}

export default connect(mapState, mapDispatch)(withRouter(SingleEntry))
