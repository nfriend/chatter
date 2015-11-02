/// <reference path="../../typings/marked/marked" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Chatter;
(function (Chatter) {
    var Comment = (function (_super) {
        __extends(Comment, _super);
        function Comment(props) {
            _super.call(this, props);
        }
        Comment.prototype.rawMarkup = function () {
            var rawMarkup = marked(this.props.children.toString(), { sanitize: true });
            return { __html: rawMarkup };
        };
        Comment.prototype.render = function () {
            return (React.createElement("div", {"className": "comment"}, React.createElement("h2", {"className": "commentAuthor"}, this.props.author), React.createElement("span", {"dangerouslySetInnerHTML": this.rawMarkup()})));
        };
        return Comment;
    })(React.Component);
    Chatter.Comment = Comment;
})(Chatter || (Chatter = {}));
/// <reference path="Comment" />
var Chatter;
(function (Chatter) {
    var CommentList = (function (_super) {
        __extends(CommentList, _super);
        function CommentList(props) {
            _super.call(this, props);
        }
        CommentList.prototype.render = function () {
            var commentNodes = this.props.data.map(function (comment) {
                return (React.createElement(Chatter.Comment, {"author": comment.author}, comment.text));
            });
            return (React.createElement("div", {"className": "commentList"}, commentNodes));
        };
        return CommentList;
    })(React.Component);
    Chatter.CommentList = CommentList;
})(Chatter || (Chatter = {}));
var Chatter;
(function (Chatter) {
    var CommentForm = (function (_super) {
        __extends(CommentForm, _super);
        function CommentForm(props) {
            var _this = this;
            _super.call(this, props);
            this.handleSubmit = function (e) {
                e.preventDefault();
                var author = _this.refs.author.value.trim();
                var text = _this.refs.text.value.trim();
                if (!text || !author) {
                    return;
                }
                _this.props.onCommentSubmit({ author: author, text: text });
                _this.refs.author.value = '';
                _this.refs.text.value = '';
                return;
            };
        }
        CommentForm.prototype.render = function () {
            return (React.createElement("form", {"className": "commentForm", "onSubmit": this.handleSubmit}, React.createElement("input", {"type": "text", "placeholder": "Your name", "ref": "author"}), React.createElement("input", {"type": "text", "placeholder": "Say something...", "ref": "text"}), React.createElement("input", {"type": "submit", "value": "Post"})));
        };
        return CommentForm;
    })(React.Component);
    Chatter.CommentForm = CommentForm;
})(Chatter || (Chatter = {}));
/// <reference path="../../typings/react/react" />
/// <reference path="../../typings/react/react-global" />
/// <reference path="../../typings/jquery/jquery" />
/// <reference path="CommentList" />
/// <reference path="CommentForm" />
var Chatter;
(function (Chatter) {
    var CommentBox = (function (_super) {
        __extends(CommentBox, _super);
        function CommentBox(props) {
            var _this = this;
            _super.call(this, props);
            this.loadCommentsFromServer = function () {
                $.ajax({
                    url: _this.props.url,
                    dataType: 'json',
                    cache: false,
                    success: function (data) {
                        _this.setState({ data: data });
                    },
                    error: function (xhr, status, err) {
                        console.error(_this.props.url, status, err.toString());
                    }
                });
            };
            this.handleCommentSubmit = function (comment) {
                var comments = _this.state.data;
                var newComments = comments.concat([comment]);
                _this.setState({ data: newComments });
                $.ajax({
                    url: _this.props.url,
                    dataType: 'json',
                    type: 'POST',
                    data: comment,
                    success: function (data) {
                        _this.setState({ data: data });
                    },
                    error: function (xhr, status, err) {
                        console.error(_this.props.url, status, err.toString());
                    }
                });
            };
            this.componentDidMount = function () {
                _this.loadCommentsFromServer();
                setInterval(_this.loadCommentsFromServer, _this.props.pollInterval);
            };
            this.state = { data: [] };
        }
        CommentBox.prototype.render = function () {
            return (React.createElement("div", {"className": "commentBox"}, React.createElement("h1", null, "Comments"), React.createElement(Chatter.CommentList, {"data": this.state.data}), React.createElement(Chatter.CommentForm, {"onCommentSubmit": this.handleCommentSubmit})));
        };
        return CommentBox;
    })(React.Component);
    Chatter.CommentBox = CommentBox;
})(Chatter || (Chatter = {}));
/// <reference path="../typings/react/react" />
/// <reference path="../typings/react-dom/react-dom" />
/// <reference path="../typings/jquery/jquery" />
/// <reference path="./Components/CommentBox" />
var Chatter;
(function (Chatter) {
    ReactDOM.render(React.createElement(Chatter.CommentBox, {"url": "/api/comments", "pollInterval": 2000}), document.getElementById('content'));
})(Chatter || (Chatter = {}));
//# sourceMappingURL=chatter.js.map