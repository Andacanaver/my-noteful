import React, {Component} from 'react';
import './AddFolder.css';
import ValidationError from '../ValidationError';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
export default class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {
                value: '',
                touched: false
            }
        }
    }
    updateTitle(title) {
        this.setState({title: {value: title, touched: true}})
    }
    handleSubmit(event) {
        event.preventDefault();
        const {title} = this.state;
        console.log('Title is ', title);
    }
    validateTitle() {
        const title = this.state.title.value.trim();
        if(title.length === 0) {
            return 'Title is required';
        }
    }
    render() {
        const titleError = this.validateTitle();
        return(
            <>
                <form className='Add__Folder' onSubmit={e => this.handleSubmit(e)}>
                    <h2>Add Folder</h2>
                    <div className='form-group'>
                        <label htmlFor='title'>Title</label>
                        <input type='text' className='title__field' name='title' id='title' onChange={e => this.updateTitle(e.target.value)}/>
                        {this.state.title.touched && (<ValidationError message={titleError}/>)}
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