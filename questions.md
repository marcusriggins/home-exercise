<h3>1.	What is the difference between Component and PureComponent? give an example where it might break my app.</h3>

Answer: 
The major difference between React.PureComponent and React.Component is PureComponent does a shallow prop and state comparison. It means that when comparing scalar values it compares their values, but when comparing objects it compares only references. It helps to improve the performance of the app.

Example (Where it might break my app):
class App extends React.PureComponent {
  render() {
    console.log('re-render') 
    return <div>{this.props.children}</div>
  }
}
const render = () => {
  ReactDOM.render(
    <App>
      <div />
    </App>,
    document.getElementById('app')
  )
  setTimeout(render, 1000)
}
render()

On every rerender of <App />, a new React Element was created by React.createElement(div, null), thus this.props.children will be different from nextProps.children though they look the same in JSX.
the real problem is that the reference(otherwise value if is primitive type) of props.children changes every time the parent re-renders and React.PureComponent compares props by reference embracing immutability.

2.	Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Answer: 
Context is used to communicate with deeply contained components. For example, a root component defines a theme, and any component in the component tree might (or might not) be interested in this information. 
shouldComponentUpdate (SCU) on the other hand short circuits the re-rendering of a part of the component tree (including children), for example if the props or state of a component are not modified in a meaningful way. As far as the component can tell. But this might accidentally block context propagation.

3.	Describe 3 ways to pass information from a component to its PARENT.

Answer:
1) First way
- Pass a function as a prop to the Child component.
- Call the function in the Child component and pass the data as arguments.
- Access the data in the function in the Parent.
2) second way
pass a callback function to child as a prop, call the function inside child with data, and access the data within function from parent component.
For example : 
import { useState } from 'react'
const Child = ({ callback }) => {
    const state = {
        example: ‘hello’
    }

    const handleCallback = () => callback(state)

    return (
        <button onClick={handleCallback}>Pass data to parent</button>
    )
}
export default function Parent() {
    const [state, setState] = useState({})
    const callback = payload => {
        setState(payload)
        console.log(state)
    }

    return (
        <div>
            <h1>Hello from Parent</h1>
            <Child callback={callback} />
        </div>
    )
}
First, we created an empty state inside the parent component using the useState hook. Then we called the Child component with a callback prop, passing it a function that we defined inside our parent.
Notice that we use setState to set the state to the payload of the function. This function will be called from within our Child component, and it will be responsible for passing the correct data.

3) Use the provider concept. General examples are Context or Redux.

4.	Give 2 ways to prevent components from re-rendering.

Answer: 
1)	Instead of useState  if we use the useRef() Hook, we can track the state changes without causing component re-renderings.
2)	React.memo/React.useCallback reduce re-renderings by caching and returning the same result if the inputs are the same without any computations. When the inputs change, the cache gets invalidated and the new component state gets rendered.
		
5.	What is a fragment and why do we need it? Give an example where it might break my app.

Answer:
What is fragment : 
Fragment is a common pattern in React for a component to return multiple elements.
We can group a list of children without extra nodes.

Why we need it :
As we know, React uses a Tree-like structure in which each node represents a React element/component, so when we use a div to wrap a group of elements, it adds an extra node and eventually increases the depth of the DOM Tree.
Consider that we have 5 depths tree and each react element have only 2 children.
Traditionally we use 2^d -1 nodes, that is 31 nodes.
In older versions of React, we have to use 2^d -1 + (2^(d-1) -2 ) = 45 nodes
Thus, we are saving extra 45 - 31 = 14 nodes. This may seem not much, but as the depth of the tree increases, the added benefit of saving extra nodes also increases.  
This carries excellent performance benefits in a highly complex application needing many DOM nodes.

6.	Give 3 examples of the HOC pattern.

Answer:
1) This one is simple example that have simple functions which can take component as props
import React, {Component} from ‘react’;
class App extends Components{
	render(){
		return (
			<div>
				<h1> Hight Order Component></h1>
				<Hoc cmp={Simple} />
			</div>
		);
	}
}
function Hoc(props)
{
	const Cmp = props.cmp
	return <h1><Cmp hocData={20} /><h1>
}
function simple(P)
{
	return <h1>{10+P.hocData}<h1>
}
export default App;

we have hoc component that will accept an component and return new component which is Simple function there’s some enhancements.
It just a way that how we can create hoc.

2) Piece of component that is supposed to add some additional functionality to my components.
const Wrapper = Component =>
  function Comp(props) {
    React.useEffect(() => {
      console.log("useEffect");
    }, []);
    return <Component {...props} />;
};

3) Simple example about the flow that take component as an argument and return a new enhanced component.
                
import React from 'react';
const nameHoC = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: ""
            };
        }
        componentDidMount() {
           this.setState({name: "Michael"});
        }
        render() {
            const {name} = this.state;
            return(
                <div>
                    <WrappedComponent{...this.props} name={name}/>
                </div>
            )
        }
    }
};
class WishMe extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { name } = this.props;
        return(
            <div>
                <h1>Hello {name}! Good morning</h1>
            </div>
        )
    }
}
export default nameHoC(WishMe);

Here nameHoC is a function which is taking WrappedComponent as an argument and returning a brand new component by adding some new features to WrappedComponent. We are passing name as a props to WrappedComponent.
In WishMe we are using data from props to get the name of the person to wish. 
We can get output like this.
“Hellow Michael! Good morning”

7. what's the difference in handling exceptions in promises, callbacks and async...await. 
Answer:
The promise is an object that allows us to handle asynchronous requests. We can associate handlers for success or failure of async result.
async and await are keywords that is used to control asynchronouse calls.
By adding async in front of function definition, it will make the function asynchronouse.
await lets you wait for the result of asynchronous call and run the next commands after it returned.
There're two ways to handle exceptions with promise, async/await.
1. using catch() method of Promise object
2. using try { ... } catch { ... }

The callback function is a function passed into another function as an argument which is invoked inside the function after a certain kind of action.
This callback can be a handler for success or failure or any other action inside the function.

8.	How many arguments does setState take and why is it async.
Answer:
- 2 arguments.
First argument is an object or callback that is used to update the state.
Second one is that callback function that executed after the state has been updated.
- why is it async
it can result in an expensive operation. Making it synchronous might leave the browser unresponsive. Asynchronous setState calls are batched to provide a better user experience and performance.

9.	List the steps needed to migrate a Class to Function Component.
Answer:
1)	Change the class to function
2)	Convert all methods to functions
3)	Remove the render method
4)	Remove references to this
5)	Remove constructor
6)	Remove event handler bindings
7)	Replace this.setState
8)	useEffect for state update side effects
9)	Replace lifecycle methods with hooks

10.	List a few ways styles can be used with components.
Answer:
1)	Add the Global Styles to “index.html” file
2)	Create a Style for Each Individual Component
3)	Adding Inline Style to React Component Elements
4)	Attach JavaScript Style Object and bind it to components – example : style={stylingObject.searchBar} etc

11.	How to render an HTML string coming from the server.
Answer: two ways
- Using dangerouslySetInnerHTML attributes 
For example : 
const marked = "This sentense has <b>a bold text</b> and <b>another one</b>.";
return <div dangerouslySetInnerHTML={{ __html: marked }} />;

- Using RegExp and Split
Make component that split the string and re-markup it and display.
Example:
const BoldableText = ({ text }) => {
  const re1 = /<b>(.+?)<\/b>/g;
  const re2 = /<b>(.+)<\/b>/;

  const matched = text
    .match(re1)
    .map(s => s.match(re2)[1]);

  const texts = text.split(re1); 

  const markedJsx = texts.map((s, index) => {
    if (index === 0 || index === texts.length - 1) { 
      return s;
    }

    if (matched.includes(s)) {
      return <b key={s}>{s}</b>; 
    }

    return s;
  });

  return markedJsx;
};

// use case

const marked = "This sentense has <b>a bold text</b> and <b>another one</b>.";
return <BoldableText text={marked} />;
