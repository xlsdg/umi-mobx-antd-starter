import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { Button } from 'antd';

import Todo from '@/components/Todo';

@observer
class TodoList extends React.Component {
  @observable newTodoTitle = '';

  handleChange = e => {
    const that = this;
    that.newTodoTitle = e.target.value;
  };

  handleNewTodoClick = e => {
    const that = this;
    e.stopPropagation();
    that.props.todoStore.addTodo(that.newTodoTitle);
    that.newTodoTitle = '';
  };

  render() {
    const that = this;
    const { todoStore } = that.props;

    return (
      <div>
        <input value={that.newTodoTitle} onChange={that.handleChange} />
        <Button onClick={that.handleNewTodoClick}>Add</Button>
        <ul>
          {todoStore.todos.map(todo => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
        Tasks left: {todoStore.unfinishedTodoCount}
      </div>
    );
  }
}

export default TodoList;
