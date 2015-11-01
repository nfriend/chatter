/// <reference path="../typings/react" />
var Hello = React.createClass({
    render: function () {
        return React.createElement("div", null, "Hello ", this.props.name);
    }
});
ReactDOM.render(React.createElement(Hello, {"name": "World"}), document.getElementById('container'));
//# sourceMappingURL=chatter.js.map