import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import blogApi from "../../Utils/blogApi";
import { Input, TextArea, FormBtn } from "../../Components/Form";
import Button from '../../Components/Button';
const dateformat = require("dateformat");


class PanelEdit extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    };
  }




  render(){
    return (
      <div>
        <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
          click
        </Button>

        {/* <div className="panel panel-default">
          <div className="panel-heading">
            <h4 className="panel-title">
            <span blogContext={blog} >
              <Button 
                key={blog._id}
                data-toggle="collapse"
                // data-target="#('collapsable' + '_' + blog._id)"
                // href="#('collapsable' + '_' + blog._id)"
                data-target="#collapsable"
                href="#collapsable"
                collapsableId={'collapsable'+'_'+blog._id}
                className="collapsed btn btn-secondary btn-sm" 
                btntext="Edit blog" />
            </span>
            </h4>
          </div> */}


        
        <div className="panel-collapse collapse" id="collapsable" 
            expanded={this.state.open} 
            header='I fire the onSelect handler when clicked' 
            // 
        >
        <div class="panel-body">
          <form>
            <Input
              value={this.state.topic}
              onChange={this.handleInputChange}
              name="topic"
            />
            <TextArea
              value={this.state.content}
              onChange={this.handleInputChange}
              name="content"
            />
            <Input      
              value={this.state.imageSrc}
              onChange={this.handleInputChange}
              name="imageSrc"
            />         
            <FormBtn className="btn btn-success mr-1"
              disabled={!(this.state.topic && this.state.content)}
              onClick={this.handleCancel}
            >
              Cancel
            </FormBtn>
            <FormBtn className="btn btn-success mr-1"
              disabled={!(this.state.topic && this.state.content)}
              onClick={this.handleFormSubmit}
            >
              Save
            </FormBtn>
          </form>
      </div>
      </div> 
        </div>
    );
  }
}

export default PanelEdit;