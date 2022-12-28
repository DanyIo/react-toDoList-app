import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      toDoList: [],
      toDOText: "",
    };
  }
  addTask = () => {
    this.setState((prevState) => {
      const task = {
        text: this.state.toDOText,
        isDone: false,
      };
      const newToDoList = prevState.toDoList.slice();
      newToDoList.push(task);
      return {
        ...prevState,
        toDoList: newToDoList,
        toDOText: "",
      };
    });
  };
  removeTask = (index) => {
    this.setState((prevState) => {
      const copyToDoList = [...prevState.toDoList];
      copyToDoList.splice(index, 1);
      return {
        ...prevState,
        toDoList: copyToDoList,
      };
    });
  };

  addCheckedClassName = (event) => {
    if (event.target.type !== "button" && event.target.type !== undefined) {
      const newStatus = !this.state.toDoList[event.target.id].isDone;
      this.setState((prevState) => {  
        const copyToDoList = [...prevState.toDoList];
        copyToDoList[event.target.id].isDone = newStatus;
        return {
          ...prevState,
          toDoList: copyToDoList,
        };
      });
    }
  };
  addToDOText = (event) => {
    if(event.target.value.length !== 32){
      this.setState({ toDOText: event.target.value });
    }
  };
  render() {
    return (
      <div>
        <TextFieldStyled
          id="standard-basic"
          label="Your task"
          variant="standard"
          onChange={this.addToDOText}
          value={this.state.toDOText}
        />
        <FabStyled
          variant="extended"
          className="addButton"
          onClick={this.addTask}
          disabled={this.state.toDOText === "" ? true : false}
        >
          Add
        </FabStyled>
        <ul>
          {this.state.toDoList.map((el, index) => {
            return (
              <li
                id={index}
                key={`${el.text}_${index}`}
                className={el.isDone ? "checked" : "unchecked"}
                onClick={this.addCheckedClassName}
              >
                {el.text}
                <IconButtonStyled
                  aria-label="delete"
                  id={index}
                  onClick={(event) => this.removeTask(index)}
                >
                  <DeleteIconStyled id={index}></DeleteIconStyled>
                </IconButtonStyled>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
const FabStyled = styled(Fab)(() => ({
  margin: 8,
  top: 30,
}));

const TextFieldStyled = styled(TextField)(() => ({
  margin: 8,
  backgroundColor: "rgba(0, 0, 0, 0)",
  top: 30,
  marginBottom: 55,
}));
const IconButtonStyled = styled(IconButton)(() => ({
  float: "right",
  bottom: 9,
}));
const DeleteIconStyled = styled(DeleteIcon)(() => ({
  float: "right",
  color: "black",
}));
