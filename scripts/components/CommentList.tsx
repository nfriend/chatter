/// <reference path="Comment" />

module Chatter {

	export interface CommentListProps {
		author?: string;
		data: Array<{
			author: string;
			text: string;
		}>;
	}

	export class CommentList extends React.Component<CommentListProps, any> {
		constructor(props: CommentListProps) {
			super(props);
		}

		render() {
			var commentNodes = this.props.data.map(comment => {
				return (
					<Comment author={comment.author}>{comment.text}</Comment>
				);
			});
			
			return (
				<div className="commentList">
					{commentNodes}
				</div>
			)
		}
	}
}