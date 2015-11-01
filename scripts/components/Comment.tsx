/// <reference path="../../typings/marked/marked" />

module Chatter {
	
	export interface CommentProps {
		author: string;
		children?: any;
	}
	
	export class Comment extends React.Component<CommentProps, any> {
		
		constructor(props:CommentProps) {
			super(props);
		}
		
		rawMarkup() {
			let rawMarkup = marked(this.props.children.toString(), {sanitize: true});
			return { __html: rawMarkup };
		}
		
		render() {
			return (
				<div className="comment">
					<h2 className="commentAuthor">
						{this.props.author}
					</h2>
					<span dangerouslySetInnerHTML={this.rawMarkup()} />
				</div>
			);
		}
	}
}