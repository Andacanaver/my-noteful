import React, {Component} from 'react';
import './AddFolder.css';
import ValidationError from '../ValidationError';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import config from '../config';
import { withRouter } from 'react-router-dom';

class AddFolder extends Component {
    static contextType = ApiContext;
    
    handleSubmit(event) {
        event.preventDefault();
        const {name} = event.target;
        const folderName = {
            name: name.value
        }
        fetch(`${config.API__ENDPOINT}/folders`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          }
        }).then(res => {
          if (!res.ok) {
            throw new Error(res.status);
          }
          return res.json();
        }).then(data => {
            name.value = ''
            this.props.history.push('/')
            this.context.updateName(data)
        })
        .catch(error => {
        console.error({error});
        })
    }
    
    updateName(name) {
        this.setState({ folders: [...this.context.folders, { name: name}] });
    }
    render() {
        
        const {folders = []} = this.context;
        return(
            <>
                <form className='Add__Folder' onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add Folder</h2>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' className='title__field' name='title' id='title' onChange={e => this.updateName(e.target.value)}/>
                        
                        <button type='submit'>Save</button>
                    </div>
                </form>
                <CircleButton
                    tag="button"
                    role="link"
                    onClick={() => this.props.history.goBack()}
                    className="NotePageNav__back-button">
                    <FontAwesomeIcon icon="chevron-left" />
                    <br />
                    Back
                </CircleButton>
            </>
        )
    }

}

export default withRouter(AddFolder)