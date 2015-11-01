/// <reference path="../typings/react" />

interface HelloWorldProps {
  name: string;
}

var Hello = React.createClass<HelloWorldProps, any>({
    render: function() {
        return <div>Hello {this.props.name}</div>;
    }
});
 
ReactDOM.render(
	<Hello name="World" />,
    document.getElementById('container')
);