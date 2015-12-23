const React = require('react');
const Tnode  = require('./Tnode');

class Travel extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      nodes:[],
      title:'',
      author:'',
      time:'',
      id:'',
      newnode:[]
    }
  }

  handleNewNode(event){
    this.setState({newnode:event.target.value});
  }

  handleKeyDown(event){
    // Move the Map trigger to the spot//
  }

  render(){
    const {nodes}=this.state;
    return {
      <div>
        <section className="Tbook_app">

        </section>
      </div>
    }
  }
