import { connect } from 'inferno-redux';
import { addTodo } from './redux/actions/addTodo';
import html from '../../infernoHyperscript';
//import { IState } from '../../app';

/**
* Is better to use connect instead to simply call this.context.store.dispatch(Action)
* the reason is due to the optimization and subscribtion to the store changes
* that connection do on connected components. connect work on functional
* component too (the lifecycle use is doing on wrapper component).
*/
const mapDispatchToProps = (dispatch: any) => ({
  /*
  ref: {
    onComponentDidMount: mounted
  },
  */
  /**
  * create an handle function that can use dispatch to submit new action
  * to the store
  */
  onAddTodoClick: (e: Event, input1: HTMLInputElement) => {
    e.preventDefault();
    if (!input1.value.trim()) { return }
    dispatch(addTodo({ text: input1.value }));
    input1.value = '';
  }
});
/**
* Interface to the prop generated by connect function
*/
export interface IAddTodoParams {
  onAddTodoClick(e: Event, input1: HTMLInputElement): void;
};

/*
function updated(lastProps:any, nextProps:any) {
  console.log('updated');
  input1.focus();
}
function mounted(element: any) {
  if ( element.type === 'text') {
    input1 = element;
  }
  //console.log(element);
  console.log('mounted');
  console.log(element.tagName);
}
*/
const AddTodoPreBind = (props: IAddTodoParams) => { 
  /**
  * use to handle dom object to set focus
  */
  let input1: HTMLInputElement;
  return html.div('.w3-container',[
    html.form(
      { className: 'w3-container',
        onSubmit: (e: Event) => {
          props.onAddTodoClick(e, input1);
        }
      }, [
        html.label('.w3-text-indigo .w3-opacity', [html.b('new Todo')]),
        html.input({
          className: 'w3-input',
          type: 'text',
          /**
          * **ref** is a special functionality that allows to bind dom node
          * at creation time to a our field. I will use to submit new todo.
          */
          ref: (node: HTMLInputElement) => { input1 = node; }
        }),
        html.button( { className: 'w3-btn w3-round-large w3-indigo w3-opacity' , type: 'submit' }, 'Add Todo' )
      ]
    )
  ]);
};
/**
* I'm connecting AddTodoPreBind to have **this.props.onAddTodoClick** in the
* AddTodo component's props
*/
export const AddTodo = connect(null, mapDispatchToProps)(AddTodoPreBind);
