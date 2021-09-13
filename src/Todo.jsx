import React, { useState, useEffect } from 'react'
import List from './Itemslist'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined';

const App = () => {
    //getting from local storge
    let list = JSON.parse(localStorage.getItem("todo_list"))

    const setitem = () => {
        if (list) {
            return list;
        }
        else
            return [];
    }

    const [items, setitems] = useState(setitem())
    const [curr_item, set_curr_item] = useState('')
    const [edit_item, set_edit_item] = useState()
    const [edit_item_btn, set_edit_item_btn] = useState(false)


    const edit = (id) => {
        set_edit_item_btn(true)
        let to_edit = items.find((ele) => {
            return id === ele.id
        })
        set_curr_item(to_edit.name)
        set_edit_item(to_edit)
    }

    const done_item = (id) => {
        setitems(items.map((ele) => {
            if (ele.id === id) {
                if (ele.done_state)
                    return { ...ele, done_state: false }
                else
                    return { ...ele, done_state: true }
            }
            return ele;
        }))
    }

    const delete_item = (id) => {
        const newitems = items.filter((ele) => {
            return ele.id !== id
        })
        setitems(newitems);
    }

    const add_item = () => {
        const item_obj = { name: curr_item, id: new Date().getTime().toString(), done_state: false } //it is necessary bcoz we acn set item to edit
        // on input tag but to bring it back to its own position id ie req.. but we can send only name to it if we don't use this
        //(we can but it req another use state , so i is easier one)
        if (curr_item === "") {
            //do nothing
        }
        else if (curr_item && edit_item_btn) {
            setitems(items.map((ele) => {
                if (ele.id === edit_item.id) {
                    return { ...ele, name: curr_item }
                }
                return ele;
            }))
            set_curr_item("")
            set_edit_item('')
            set_edit_item_btn(false)

        }
        else {
            setitems((preval) => {
                return [item_obj, ...preval];
            })
            set_curr_item("");
        }
    }

    //this will get automatically call when page is refershed ,and when any thing changed in "items"
    useEffect(() => {
        localStorage.setItem("todo_list", JSON.stringify(items))
    }, [items])


    return (
        <>
            <div className="main_body">
                <div className="container">
                    <h1>ToDo List</h1>
                    <div className="input_sec">
                        <input value={curr_item} onChange={(e) => { set_curr_item(e.target.value) }} placeholder="Enter Task" type="text" />
                        <Button onClick={add_item} style={{ minWidth: "auto", padding: 0, color: "aqua" }} color="secondary">
                            {edit_item_btn ? < EditOutlinedIcon style={{ width: "35px", height: "35px" }} /> :
                                < AddCircleIcon style={{ width: "35px", height: "35px" }} />}
                        </Button>
                    </div>

                    <div className="items">
                        {items.map((element) => {
                            let completed
                            element.done_state ? completed = "line-through" : completed = "none"
                            return (
                                <>
                                    <div className="my_item">
                                        <List style={completed} item={element.name} key={element.id} index={element.id} />
                                        <Button className="edit" onClick={() => edit(element.id)} style={{ minWidth: "auto", padding: 0, color: "black" }} color="secondary">
                                            <EditOutlinedIcon style={{ width: "25px", height: "25px" }} />
                                        </Button>
                                        <Button className="done" onClick={() => done_item(element.id)} style={{ minWidth: "auto", padding: 0, color: "green" }} color="secondary">
                                            <AssignmentTurnedInOutlinedIcon style={{ width: "25px", height: "25px" }} />
                                        </Button>
                                        <Button className="delete" onClick={() => delete_item(element.id)} style={{ minWidth: "auto", padding: 0 }} color="secondary">
                                            <DeleteIcon style={{ width: "25px", height: "25px" }} />
                                        </Button>
                                    </div>
                                </>
                            )
                        })}
                    </div>
                </div>
            </div>

        </>
    )
}

export default App
