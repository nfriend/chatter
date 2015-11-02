/// <reference path="../../typings/react/react" />
/// <reference path="../../typings/react/react-global" />
/// <reference path="../../typings/jquery/jquery" />
/// <reference path="CommentList" />
/// <reference path="CommentForm" />

module Chatter {

	export interface CommentBoxProps {
		url: string;
		pollInterval: number;
	}

	export class CommentBox extends React.Component<CommentBoxProps, any> {

		constructor(props: CommentBoxProps) {
			super(props);
			this.state = { data: [] }
		}
		
		loadCommentsFromServer = () => {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				cache: false,
				success: (data) => {
					this.setState({data: data});
				},
				error: (xhr, status, err) => {
					console.error(this.props.url, status, err.toString());
				}
			});
		}
		
		handleCommentSubmit = (comment: { author: string; text: string }) => {
			$.ajax({
				url: this.props.url,
				dataType: 'json',
				type: 'POST',
				data: comment,
				success: (data) => {
					this.setState({data: data});
				},
				error: (xhr, status, err) => {
					console.error(this.props.url, status, err.toString());	
				}
			});
		}
		
		componentDidMount = () => {
			this.loadCommentsFromServer();
			setInterval(this.loadCommentsFromServer, this.props.pollInterval);
		}

		render() {
			return (
				<div className="commentBox">
					<h1>Comments</h1>
					<CommentList data={this.state.data} />
					<CommentForm onCommentSubmit={this.handleCommentSubmit} />
				</div>
			);
		}
	}
}