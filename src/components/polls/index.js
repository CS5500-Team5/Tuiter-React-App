import React, {useState} from "react";

import './polls-css.css'

/**
 * The Poll generator. To create a poll, user needs to specify the choices and the question.
 * The Polls have following features:
 * 1. Question is required (deprecated)
 * 2. Must have at least one choice
 * 3. Do not allow empty choice
 * 4. Do not allow duplicated choices
 * 5. Maximum Choices are @MAX_CHOICES
 *
 * To interact with the UI, entering choices in Add/Remove Choices field. Then press + or - to
 * add or delete choices.
 *
 * Click Clear to clear all the fields.
 * Click Save to generate the JSON format data which will be shown in the console.
 *
 * @return {JSX.Element} A Poll generator
 */

const MAX_CHOICES = 3; //Max Number of Choices

const Polls = ({setPolls, setSavedNotice}) => {
    const [choices, setChoices] = useState([]);
    const [editChoice, setEditChoice] = useState( "");
    const [overWarning, setWarning] = useState("hidden");

    /**
     * generate a random ID
     * @return {string} random id
     */
    const randomID = () =>
        (new Date()).getTime() + "";

    /**
     * Clear/Reset all states
     */
    const handleClear = () => {
        setChoices([]);
        setEditChoice("");
        setWarning("hidden");
        setSavedNotice('Please save the Poll before Tuit')
    }

    /**
     * Submit the form and post it to the API
     */
    const save = async (e) => {
        if (choices.length < 1) {
            alert("Must have at least one choice");
            return;
        }

        let form = {
            choices: choices
        }

        form = JSON.stringify(form);
        setPolls(form)
        console.log(form);
        setSavedNotice('Saved')
    }

    /**
     * Add a new Choice
     */
    const addNewChoice = () => {
        //String cannot be empty
        if (editChoice.match(/^\s*$/) !== null) {
            alert("choice cannot be empty");
            return;
        }
        for (const c of choices) {
            if (c.Choice === editChoice) {
                alert("duplicate choice");
                return;
            }
        }
        if (choices.length >= MAX_CHOICES) {
            setWarning('visible');
            return;
        } else {
            setWarning('hidden');
        }
        const choice = {
            Choice: editChoice, _id: randomID()
        }
        setChoices([...choices, choice]);
        // Not choices.push() because setState()
        // afterwards may replace the mutation. Also, mutate state directly is never a good idea
        // since it may cause some abnormal, break React's idea and slow down the project.
        setEditChoice('');
        setSavedNotice('Please save the Poll before Tuit')
    }

    /**
     * Remove a choice from Choice list
     */
    const remove = () => {
        if (editChoice.match(/^\s*$/) !== null) {
            alert("choice cannot be empty");
            return;
        }
        const originLength = choices.length;
        const new_choices = choices.filter(c => c.Choice !== editChoice); //filter does not mutate
        if (originLength === new_choices.length) {
            alert("Choice did not find");
            return;
        }
        alert("Choice " + editChoice +" deleted");
        if (choices.length <= MAX_CHOICES) {
            setWarning("hidden");
        }
        setChoices(new_choices);
        setEditChoice('');
        setSavedNotice('Please save the Poll before Tuit')
    }

    return(
            <form className={'trr-polls-form'}>
                <div className="polls-form-control">
                    <label>Choices </label>
                    <select>
                        {
                            choices.map( choice => {
                                return (<option key={choice._id}>{choice.Choice}</option>)
                            })
                        }
                    </select>
                </div>
                <div className="polls-form-control">
                    <label>Add/Remove Choices</label>
                    <span>
                        <input type="text"
                               onChange={(e) =>
                                   setEditChoice(e.target.value)}
                               value={editChoice}/>
                        <span className={'choice-btn'}
                              onClick={addNewChoice}>+</span>
                        <span className={'choice-btn'}
                              onClick={remove}>-</span>
                    </span>
                </div>
                <div className="polls-form-control">
                    <div/>
                    <span className={'over-max-choice'}
                          style={{visibility: overWarning}}>Over Max {MAX_CHOICES} Choices!</span>
                </div>
                <div className="polls-form-control">
                    <button className={'btn'} type={'button'}
                            onClick={() => handleClear()}>
                        Clear
                    </button>
                    <button className={'btn'} type={'button'}
                            onClick={() => save()}>
                        Save
                    </button>
                </div>
            </form>
    )
};
export default Polls;