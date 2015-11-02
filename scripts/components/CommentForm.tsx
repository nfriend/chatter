module Chatter {
	
	export interface CommentFormProps {
		onCommentSubmit: (comment: { author: string; text: string; }) => void;
	}
	
	export class CommentForm extends React.Component<CommentFormProps, any> {
		constructor(props:CommentFormProps) {
			super(props);
		}
		
		handleSubmit = (e) => {
			e.preventDefault();
			let author = this.refs.author.value.trim();
			let text = this.refs.text.value.trim();
			if (!text || !author) {
				return;
			}
			this.props.onCommentSubmit({ author: author, text: text });
			this.refs.author.value = '';
			this.refs.text.value = '';
			return;
		};
		
		refs: {
			[key: string]: any;
			author: HTMLInputElement;
			text: HTMLInputElement;
		}
		
		render() {
			return (
				<form className="commentForm" onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Your name" ref="author" />
					<input type="text" placeholder="Say something..." ref="text" />
					<input type="submit" value="Post" />
				</form>
			);
		}
	}
}